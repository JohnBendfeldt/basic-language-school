import React, { useState, useEffect, useRef } from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import { speak, initVoices } from '../utils/speech';
import { containsCyrillic } from '../utils/transliteration';
import { useLanguage } from '../contexts/LanguageContext';
import { warmUpAudioContext } from '../utils/audioWarmup';

interface PronunciationButtonProps {
  text: string;
  lang?: string;
  label?: string;
  className?: string;
  useLocalAudio?: boolean;
  isAlphabet?: boolean;
  audioCategory?: 'alphabet' | 'words' | 'phrases' | 'numbers' | 'examples' | 'basicPhrases' | 'commonWords' | 'time';
}

const PronunciationButton: React.FC<PronunciationButtonProps> = ({ 
  text, 
  lang,
  label,
  className,
  audioCategory
}) => {
  const { currentLanguage, speechSpeed } = useLanguage();
  const effectiveLangId = (lang && lang.toLowerCase().startsWith('en'))
    ? 'en'
    : (lang && lang.toLowerCase().startsWith('es'))
      ? 'es'
      : (lang && lang.toLowerCase().startsWith('fr'))
        ? 'fr'
        : (lang && lang.toLowerCase().startsWith('ru'))
          ? 'ru'
          : currentLanguage;

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioPathRef = useRef<string>('');
  const fallbackAttemptedRef = useRef<boolean>(false);
  
  // Create a unique ID for each button instance
  const buttonId = useRef(`btn-${Math.random().toString(36).substring(2, 9)}`);
  
  // Track mounting state to avoid state updates after unmount
  const isMounted = useRef(true);

  // Track mount lifecycle and cleanup audio resources on unmount
  useEffect(() => {
    isMounted.current = true;
    
    // Enhanced cleanup function
    return () => {
      isMounted.current = false;
      
      // Properly cleanup audio resources
      if (audioRef.current) {
        try {
          // Remove all event listeners
          audioRef.current.onended = null;
          audioRef.current.onerror = null;
          audioRef.current.oncanplay = null;
          audioRef.current.onloadedmetadata = null;
          
          // Pause and reset the audio
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          
          // Clear the source
          audioRef.current.src = '';
          
          // Force the browser to release resources
          audioRef.current.load();
          audioRef.current = null;
        } catch (error) {
          console.warn('Error during audio cleanup:', error);
        }
      }
      
      // Clear audio path reference
      audioPathRef.current = '';
    };
  }, []);

  // Also cleanup audio when text or category changes (happens when React reuses
  // the same component instance across tabs)
  useEffect(() => {
    // Reset playing state immediately when text/category changes so the button
    // doesn't stay stuck in the "playing" / disabled state on the new page
    setIsPlaying(false);
    fallbackAttemptedRef.current = false;

    return () => {
      if (audioRef.current && audioRef.current.src) {
        try {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        } catch (error) {
          console.warn('Error pausing audio on text/category change:', error);
        }
      }
    };
  }, [text, audioCategory]);

  const getCandidateAudioPaths = (): string[] => {
    if (!text) return [];
    
    const normalizedText = text.toLowerCase().trim();
    
    // Check if text is a formatted number like "1 (Un)", "15 (Quince)", or "1,000 (One Thousand)"
    const numParenMatch = normalizedText.match(/^[\d,.\s]+\(([^)]+)\)$/);
    const effectiveRawText = numParenMatch ? numParenMatch[1].trim() : normalizedText;

    const cleanText = effectiveRawText
      .normalize('NFC')
      .split('/')[0]
      .replace(/\s*\([^)]*\)\s*/g, '')
      .replace(/[?.,!¡¿'’"«»:]/g, '')
      .trim();
    const fileName = cleanText.replace(/\s+/g, '_');
    if (!fileName) return [];

    // Use provided audioCategory if available, otherwise infer from cleaned primary variant
    let primaryCategory = audioCategory;
    if (!primaryCategory) {
      if (numParenMatch || ['one hundred', 'one thousand'].includes(cleanText)) {
        primaryCategory = 'numbers';
      } else if (cleanText.length === 1) {
        primaryCategory = 'alphabet';
      } else if (/\s/.test(cleanText)) {
        primaryCategory = 'phrases';
      } else if (/^\d+$/.test(cleanText) || ['one', 'two', 'three', 'один', 'два', 'три', 'un', 'deux', 'trois', 'uno', 'dos', 'tres', 'cien', 'mil', 'cent', 'mille', 'сто', 'тысяча'].includes(cleanText)) {
        primaryCategory = 'numbers';
      } else {
        primaryCategory = 'words';
      }
    }
    
    if (primaryCategory === 'basicPhrases') primaryCategory = 'phrases';
    if (primaryCategory === 'commonWords') primaryCategory = 'words';

    const folders = Array.from(
      new Set([primaryCategory, 'words', 'phrases', 'examples', 'numbers', 'time'])
    );

    return folders.map(
      folder => `/audio/${effectiveLangId}/${folder}/${encodeURIComponent(fileName)}.mp3`
    );
  };

  const handleSpeak = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isPlaying) return;
    
    // Warm up audio subsystem on click (unlocks Web Audio & AudioContext immediately)
    warmUpAudioContext();

    // Safety guard: In Russian mode, ensure text is Cyrillic or digits
    if (effectiveLangId === 'ru' && !containsCyrillic(text) && !/^\d+$/.test(text.trim())) {
      console.warn('PronunciationButton: Skipped playing non-Russian text in Russian mode:', text);
      return;
    }
    
    if (!text || !text.trim()) {
      return;
    }
    
    fallbackAttemptedRef.current = false;
    const candidatePaths = getCandidateAudioPaths();
    
    if (candidatePaths.length > 0) {
      setIsPlaying(true);

      const tryPlayCandidate = (index: number) => {
        if (!isMounted.current) return;
        if (index >= candidatePaths.length) {
          if (!fallbackAttemptedRef.current) {
            fallbackAttemptedRef.current = true;
            playSpeechSynthesis();
          }
          return;
        }

        const audioPath = candidatePaths[index];
        if (audioRef.current) {
          audioRef.current.onended = null;
          audioRef.current.onerror = null;
          audioRef.current.pause();
          audioRef.current.src = '';
        }

        const audio = new Audio(audioPath);
        audio.preload = 'auto';
        audioRef.current = audio;
        audioPathRef.current = audioPath;

        let advanced = false;
        const advanceToNext = () => {
          if (advanced || !isMounted.current) return;
          advanced = true;
          tryPlayCandidate(index + 1);
        };

        audio.onended = () => {
          if (isMounted.current) {
            setIsPlaying(false);
          }
        };

        audio.onerror = advanceToNext;

        audio.playbackRate = speechSpeed;
        audio.play().catch(advanceToNext);
      };

      tryPlayCandidate(0);
      return;
    }
    
    setIsPlaying(true);
    playSpeechSynthesis();
  };
  
  // Speech synthesis fallback
  const playSpeechSynthesis = () => {
    initVoices().catch(() => {});
    const langCodeMap: Record<string, string> = {
      en: 'en-US',
      es: 'es-ES',
      fr: 'fr-FR',
      ru: 'ru-RU',
    };
    const speechLang = lang || langCodeMap[effectiveLangId] || 'en-US';
    speak(
      text, 
      speechLang,
      buttonId.current,
      // onEnd callback
      () => {
        if (isMounted.current) {
          setIsPlaying(false);
        }
      },
      // onError callback
      (error: unknown) => {
        console.error(`Pronunciation error for ${buttonId.current}:`, error);
        if (isMounted.current) {
          setIsPlaying(false);
          
          // Show a user-friendly message for voice errors
          if (error instanceof Error && !fallbackAttemptedRef.current) {
            console.warn(`Speech synthesis error: ${error.message}`);
          }
        }
      },
      speechSpeed
    );
  };

  return (
    <button
      type="button"
      className={`pronunciation-button ${isPlaying ? 'playing' : ''} ${className || ''}`}
      onClick={handleSpeak}
      disabled={isPlaying}
      title={isPlaying ? "Speaking..." : (label || "Pronounce")}
      aria-label={isPlaying ? "Speaking..." : (label || "Pronounce")}
      data-button-id={buttonId.current}
    >
      {isPlaying ? (
        <FaVolumeUp className="pulse-animation" aria-hidden="true" />
      ) : (
        <FaVolumeUp aria-hidden="true" />
      )}
    </button>
  );
};

export default PronunciationButton;