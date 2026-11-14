import React, { useState, useEffect, useRef } from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import { speak, initVoices } from '../utils/speech';
import { containsCyrillic } from '../utils/transliteration';
import { useLanguage } from '../contexts/LanguageContext';
import { warmUpAudioContext } from '../utils/audioWarmup';
import {
  getSyncCachedBlobUrl,
  resolveCachedAudioBlobUrl,
  warmCachedBlobUrls,
} from '../services/offlineAudioService';

interface PronunciationButtonProps {
  text: string;
  lang?: string;
  label?: string;
  className?: string;
  useLocalAudio?: boolean;
  isAlphabet?: boolean;
  audioCategory?: 'alphabet' | 'words' | 'phrases' | 'numbers' | 'examples' | 'basicPhrases' | 'commonWords' | 'time' | 'grammar';
}

export const getCandidateAudioPathsForText = (
  text: string,
  effectiveLangId: string,
  audioCategory?: PronunciationButtonProps['audioCategory']
): string[] => {
  if (!text) return [];
  
  const rawLower = effectiveLangId === 'tr'
    ? text.replace(/İ/g, 'i').replace(/I/g, 'ı').replace(/\u0307/g, '').toLowerCase()
    : text.toLowerCase();
  const normalizedText = rawLower.trim();
  
  // Check if text is a formatted number like "1 (Un)", "15 (Quince)", or "1,000 (One Thousand)"
  const numParenMatch = normalizedText.match(/^[\d,.\s]+\(([^)]+)\)$/);
  const effectiveRawText = numParenMatch ? numParenMatch[1].trim() : normalizedText;

  const cleanText = effectiveRawText
    .normalize('NFC')
    .split('/')[0]
    .replace(/\s*\([^)]*\)\s*/g, '')
    .replace(/[?.,!¡¿'’"«»:؟،？。、！\\]/g, '')
    .replace(/\.\.+/g, '')
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
    new Set([primaryCategory, 'grammar', 'words', 'phrases', 'examples', 'numbers', 'time'])
  );

  const fileNames = [fileName];
  // If text has an article or pronoun prefix (e.g. "der tisch" -> "tisch", "он знает" -> "знает", "el libro" -> "libro", "siz gidiyorsunuz" -> "gidiyorsunuz")
  const strippedPrefix = cleanText.replace(
    /^(der|die|das|el|la|los|las|un|una|le|l'|les|une|o|a|os|as|um|uma|the|a|an|он|она|оно|они|я|ты|мы|вы|ich|du|er|sie|es|wir|ihr|je|tu|il|elle|nous|vous|ils|elles|yo|tú|él|ella|nosotros|vosotros|ellos|eu|você|ele|ela|nós|eles|ben|sen|o|biz|siz|onlar|أنا|أنت|هو|هي|نحن|هم|मैं|तू|तुम|आप|वह|हम|वे|আমি|তুমি|আপনি|সে|তিনি|আমরা|তোমরা|তারা|میں|تو|تم|آپ|وہ|ہم)\s+/i,
    ''
  );
  if (strippedPrefix && strippedPrefix !== cleanText) {
    fileNames.push(strippedPrefix.replace(/\s+/g, '_'));
  }

  const paths: string[] = [];
  for (const fn of fileNames) {
    for (const folder of folders) {
      const p = `/audio/${effectiveLangId}/${folder}/${encodeURIComponent(fn)}.mp3`;
      if (!paths.includes(p)) {
        paths.push(p);
      }
    }
  }

  return paths;
};

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
          : (lang && lang.toLowerCase().startsWith('pt'))
            ? 'pt'
            : (lang && lang.toLowerCase().startsWith('de'))
              ? 'de'
              : (lang && lang.toLowerCase().startsWith('id'))
                ? 'id'
                : (lang && lang.toLowerCase().startsWith('tr'))
                  ? 'tr'
                  : (lang && lang.toLowerCase().startsWith('ja'))
                    ? 'ja'
                    : (lang && lang.toLowerCase().startsWith('ko'))
                      ? 'ko'
                      : (lang && (lang.toLowerCase().startsWith('zh') || lang.toLowerCase().startsWith('cn')))
                        ? 'zh'
                        : (lang && lang.toLowerCase().startsWith('hi'))
                          ? 'hi'
                          : (lang && lang.toLowerCase().startsWith('ar'))
                            ? 'ar'
                            : (lang && lang.toLowerCase().startsWith('bn'))
                              ? 'bn'
                              : (lang && lang.toLowerCase().startsWith('ur'))
                                ? 'ur'
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
    setIsPlaying(prev => (prev ? false : prev));
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

  const getCandidateAudioPaths = (): string[] =>
    getCandidateAudioPathsForText(text, effectiveLangId, audioCategory);

  const handlePointerEnter = () => {
    warmUpAudioContext();

    // Pre-buffer audio file on hover/touch; only query Cache Storage directly when offline
    // (when online, the Service Worker's CacheFirst route serves cached MP3s with zero JS IPC)
    if (text && text.trim()) {
      const candidatePaths = getCandidateAudioPaths();
      const isOffline = typeof navigator !== 'undefined' && navigator.onLine === false;
      if (isOffline) {
        warmCachedBlobUrls(candidatePaths);
      }
      if (!audioRef.current && candidatePaths.length > 0) {
        try {
          const initialSrc = isOffline
            ? getSyncCachedBlobUrl(candidatePaths)
            : candidatePaths[0];
          if (initialSrc) {
            const pre = new Audio(initialSrc);
            pre.preload = 'auto';
            audioRef.current = pre;
            audioPathRef.current = initialSrc;
          }
        } catch {
          // Ignore pre-buffering errors
        }
      }
    }
  };

  const handleSpeak = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    
    // Warm up audio subsystem on click (unlocks Web Audio & AudioContext immediately)
    warmUpAudioContext();

    // If already playing local audio file, allow instant replay on repeat clicks
    if (isPlaying && audioRef.current && audioRef.current.src) {
      try {
        audioRef.current.currentTime = 0;
        audioRef.current.playbackRate = speechSpeed;
        audioRef.current.play().catch(() => {});
        return;
      } catch {
        // Fall through to regular playback logic
      }
    }
    if (isPlaying) return;

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

      const playAudioSource = (srcUrl: string, onFail: () => void) => {
        if (!isMounted.current) return;
        let audio = audioRef.current;
        if (!audio || audioPathRef.current !== srcUrl) {
          if (audio) {
            audio.onended = null;
            audio.onerror = null;
            audio.pause();
            audio.src = '';
          }
          audio = new Audio(srcUrl);
          audio.preload = 'auto';
          audioRef.current = audio;
          audioPathRef.current = srcUrl;
        }

        let failed = false;
        const triggerFail = () => {
          if (failed || !isMounted.current) return;
          failed = true;
          onFail();
        };

        audio.onended = () => {
          if (isMounted.current) {
            setIsPlaying(false);
          }
        };
        audio.onerror = triggerFail;
        audio.playbackRate = speechSpeed;
        audio.play().catch(triggerFail);
      };

      const triggerFinalFallback = () => {
        if (!isMounted.current || fallbackAttemptedRef.current) return;
        fallbackAttemptedRef.current = true;
        resolveCachedAudioBlobUrl(candidatePaths)
          .then((cachedBlobUrl) => {
            if (!isMounted.current) return;
            if (cachedBlobUrl) {
              playAudioSource(cachedBlobUrl, () => playSpeechSynthesis());
            } else {
              playSpeechSynthesis();
            }
          })
          .catch(() => {
            if (isMounted.current) playSpeechSynthesis();
          });
      };

      const tryPlayCandidate = (index: number) => {
        if (!isMounted.current) return;
        if (index >= candidatePaths.length) {
          triggerFinalFallback();
          return;
        }
        playAudioSource(candidatePaths[index], () => tryPlayCandidate(index + 1));
      };

      const isOffline = typeof navigator !== 'undefined' && navigator.onLine === false;
      if (isOffline) {
        const syncOfflineBlob = getSyncCachedBlobUrl(candidatePaths);
        if (syncOfflineBlob) {
          playAudioSource(syncOfflineBlob, () => tryPlayCandidate(0));
          return;
        }
        resolveCachedAudioBlobUrl(candidatePaths)
          .then((cachedBlobUrl) => {
            if (!isMounted.current) return;
            if (cachedBlobUrl) {
              playAudioSource(cachedBlobUrl, () => tryPlayCandidate(0));
            } else {
              tryPlayCandidate(0);
            }
          })
          .catch(() => {
            if (isMounted.current) tryPlayCandidate(0);
          });
        return;
      }

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
      pt: 'pt-BR',
      de: 'de-DE',
      id: 'id-ID',
      tr: 'tr-TR',
      ja: 'ja-JP',
      ko: 'ko-KR',
      zh: 'zh-CN',
      hi: 'hi-IN',
      ar: 'ar-SA',
      bn: 'bn-IN',
      ur: 'ur-PK',
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
      id={buttonId.current}
      type="button"
      className={`pronunciation-button ${isPlaying ? 'playing' : ''} ${className || ''}`}
      onClick={handleSpeak}
      onPointerEnter={handlePointerEnter}
      onFocus={handlePointerEnter}
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

export default React.memo(PronunciationButton);