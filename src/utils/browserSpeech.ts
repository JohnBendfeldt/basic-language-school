/**
 * Browser Speech Synthesis for Russian language with audio file fallback
 */

// Audio file mapping
interface AudioFileMap {
  [key: string]: string;
}

// Cache for audio lookups
let audioFilesCache: AudioFileMap | null = null;
let audioFilesFetched = false;

// Cache for successful voice lookups
const voiceCache: {
  russian?: SpeechSynthesisVoice | null;
  lastCheck: number;
} = {
  lastCheck: 0
};

/**
 * Get available Russian voices from the browser
 */
/**
 * Prioritized high-quality native voice selection by language code
 */
// Exclude novelty/joke/creepy voices from browser speech synthesis
const NOVELTY_VOICE_NAMES = [
  'whisper', 'bad news', 'bahh', 'bells', 'boing', 'bubbles', 'cellos',
  'deranged', 'good news', 'hysterical', 'pipe organ', 'trinoids',
  'wobble', 'zarvox', 'ralph', 'albert', 'fred', 'jester', 'organ', 'superstar'
];

const isNoveltyVoice = (voice: SpeechSynthesisVoice): boolean => {
  const lowerName = voice.name.toLowerCase();
  return NOVELTY_VOICE_NAMES.some(novelty => lowerName.includes(novelty));
};

export const getBestVoiceForLang = (lang: string): SpeechSynthesisVoice | null => {
  if (!window.speechSynthesis) return null;
  const allVoices = window.speechSynthesis.getVoices();
  if (allVoices.length === 0) return null;

  const targetLang = (lang || 'en').toLowerCase().trim();
  const prefix = targetLang.split('-')[0];

  // Specific high quality native voice names (macOS / Windows / Chrome / Edge)
  const priorityVoiceNames: Record<string, string[]> = {
    fr: ['Thomas', 'Amélie', 'Audrey', 'Aurelie', 'Marie', 'Céline', 'Henri', 'Denise', 'Paul', 'Google français'],
    es: ['Mónica', 'Paulina', 'Jorge', 'Diego', 'Alvaro', 'Elvira', 'Lucia', 'Carlos', 'Google español'],
    ru: ['Milena', 'Yelena', 'Tatyana', 'Dmitry', 'Svetlana', 'Pavel', 'Google русский'],
    en: ['Samantha', 'Daniel', 'Karen', 'Victoria', 'Jenny', 'Guy', 'Alex', 'Google US English'],
    ja: ['Kyoko', 'Otoya', 'Keita', 'Nanami', 'Naoki', 'Ayumi', 'Haruka', 'Ichiro', 'Google 日本語'],
    ko: ['Yuna', 'Minsu', 'InJoon', 'SunHi', 'BongJin', 'Heami', 'Sora', 'Google 한국어'],
    de: ['Conrad', 'Katja', 'Marlene', 'Hans', 'Google Deutsch'],
    pt: ['Luciana', 'Antonio', 'Felipe', 'Google português do Brasil'],
    id: ['Gadis', 'Ardi', 'Indah', 'Google Bahasa Indonesia'],
    tr: ['Ahmet', 'Filiz', 'Yelda', 'Google Türkçe'],
  };

  // 1. Check for known high-quality native voice names matching target prefix
  const preferredNames = priorityVoiceNames[prefix] || [];
  for (const name of preferredNames) {
    const found = allVoices.find(v => 
      v.name.toLowerCase().includes(name.toLowerCase()) && 
      v.lang.toLowerCase().replace('_', '-').startsWith(prefix)
    );
    if (found) return found;
  }

  // 2. Exact language match (e.g., 'fr-FR', 'es-ES') with natural/online/premium/enhanced tag
  const premiumExact = allVoices.find(v => 
    v.lang.toLowerCase().replace('_', '-') === targetLang &&
    (v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('premium') || v.name.toLowerCase().includes('enhanced'))
  );
  if (premiumExact) return premiumExact;

  // 3. Exact language match without english in voice name
  const exact = allVoices.find(v => 
    v.lang.toLowerCase().replace('_', '-') === targetLang && 
    !v.name.toLowerCase().includes('english') && !isNoveltyVoice(v)
  );
  if (exact) return exact;

  // 4. Any voice matching language prefix (fr, es, ru) strictly avoiding cross-language english voices
  const matchingPrefix = allVoices.find(v => 
    v.lang.toLowerCase().replace('_', '-').startsWith(prefix) && 
    !v.name.toLowerCase().includes('english') && !isNoveltyVoice(v)
  );
  if (matchingPrefix) return matchingPrefix;

  // 5. Any clean voice matching language prefix (strictly avoiding novelty / whisper voices)
  const cleanVoice = allVoices.find(v => 
    v.lang.toLowerCase().replace('_', '-').startsWith(prefix) && 
    !isNoveltyVoice(v)
  );
  if (cleanVoice) return cleanVoice;

  // 6. Last resort fallback
  const anyPrefix = allVoices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith(prefix));
  return anyPrefix || null;
};

export const getRussianVoices = (): SpeechSynthesisVoice[] => {
  if (!window.speechSynthesis) return [];
  
  const allVoices = window.speechSynthesis.getVoices();
  return allVoices.filter(voice => 
    voice.lang.toLowerCase().includes('ru') || 
    voice.name.toLowerCase().includes('russian')
  );
};

/**
 * Get the best Russian voice available
 */
export const getBestRussianVoice = (): SpeechSynthesisVoice | null => {
  // Use cached voice if available and less than 10 minutes old
  const now = Date.now();
  if (voiceCache.russian !== undefined && now - voiceCache.lastCheck < 600000) {
    return voiceCache.russian;
  }
  
  // Get all Russian voices
  const russianVoices = getRussianVoices();
  
  if (russianVoices.length === 0) {
    voiceCache.russian = null;
    voiceCache.lastCheck = now;
    return null;
  }
  
  // Prefer female voices for Russian (typically clearer)
  const femaleVoice = russianVoices.find(voice => 
    voice.name.includes('Female') || 
    voice.name.includes('Tatyana') || 
    voice.name.includes('Milena') ||
    voice.name.includes('Yelena')
  );
  
  if (femaleVoice) {
    voiceCache.russian = femaleVoice;
    voiceCache.lastCheck = now;
    return femaleVoice;
  }
  
  // Fall back to any Russian voice
  voiceCache.russian = russianVoices[0];
  voiceCache.lastCheck = now;
  return russianVoices[0];
};

/**
 * Check if at least one Russian voice is available
 */
export const isRussianVoiceAvailable = (): boolean => {
  return getBestRussianVoice() !== null;
};

/**
 * Try to load audio file for the text
 * @returns URL to audio file if found, null otherwise
 */
const getAudioFileForText = async (text: string): Promise<string | null> => {
  if (!audioFilesFetched) {
    try {
      // Try to fetch the audio index
      const response = await fetch('/audio/index.json');
      if (response.ok) {
        const data = await response.json();
        
        // Build a map of text -> audio file path
        audioFilesCache = {};
        
        // Map alphabet letters
        if (data.files.alphabet) {
          data.files.alphabet.forEach((file: any) => {
            const letter = file.filename.replace('.mp3', '');
            // Fix non-null assertion warning by checking if audioFilesCache exists
            if (audioFilesCache) {
              audioFilesCache[letter] = file.path;
            }
          });
        }
        
        // Map examples, phrases, numbers and words
        ['examples', 'phrases', 'numbers', 'words'].forEach(category => {
          if (data.files[category]) {
            data.files[category].forEach((file: any) => {
              const word = file.filename.replace('.mp3', '').replace(/_/g, ' ');
              // Fix non-null assertion warning by checking if audioFilesCache exists
              if (audioFilesCache) {
                audioFilesCache[word] = file.path;
              }
            });
          }
        });
      }
    } catch (e) {
      // Could not load audio index, falling back to browser TTS
    } finally {
      audioFilesFetched = true;
    }
  }
  
  // If we have a cache, try to find the text
  if (audioFilesCache) {
    const normalizedText = text.toLowerCase().trim();
    
    // Exact match
    if (audioFilesCache[normalizedText]) {
      return audioFilesCache[normalizedText];
    }
    
    // Search for closest match
    for (const [word, path] of Object.entries(audioFilesCache)) {
      if (normalizedText.includes(word) || word.includes(normalizedText)) {
        return path;
      }
    }
  }
  
  return null;
};

/**
 * Speaks the text using browser speech synthesis
 * Falls back to local audio files only if no Russian voice is available
 */
export const speakText = async (
  text: string, 
  lang = 'ru-RU',
  onEnd?: () => void,
  onError?: (error: Error) => void,
  rate = 1.0
): Promise<void> => {
  try {
    // Check if a Russian voice is available in the browser
    const hasRussianVoice = isRussianVoiceAvailable();
    
    if (hasRussianVoice) {
      // If Russian voice is available, use browser's speech synthesis
      playWithBrowserTTS(text, lang, onEnd, onError, rate);
      return;
    }
    
    // If no Russian voice is available, try to use a local audio file
    const audioFilePath = await getAudioFileForText(text);
    
    if (audioFilePath) {
      // Use audio element with local file
      const audio = new Audio(audioFilePath);
      
      audio.onended = () => {
        if (onEnd) onEnd();
      };
      
      audio.onerror = () => {
        // If local audio fails, fall back to browser TTS as last resort
        playWithBrowserTTS(text, lang, onEnd, onError, rate);
      };
      
      await audio.play();
      return;
    }
    
    // If no audio file available either, use browser TTS as last resort
    playWithBrowserTTS(text, lang, onEnd, onError, rate);
  } catch (error) {
    console.error('Speech error:', error);
    if (onError) {
      if (error instanceof Error) {
        onError(error);
      } else {
        onError(new Error('Unknown speech error'));
      }
    }
  }
};

/**
 * Uses browser's built-in speech synthesis
 * Renamed from useBrowserTTS to playWithBrowserTTS to avoid ESLint react-hooks warning
 */
const playWithBrowserTTS = (
  text: string,
  lang: string,
  onEnd?: () => void,
  onError?: (error: Error) => void,
  rate = 1.0
): void => {
  if (!window.speechSynthesis) {
    if (onError) onError(new Error('Speech synthesis not supported in this browser'));
    return;
  }
  
  // Create a new utterance
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set language and playback rate
  utterance.lang = lang;
  utterance.rate = rate;
  
  // Find best native voice for the selected language
  const bestVoice = getBestVoiceForLang(lang);
  if (bestVoice) {
    utterance.voice = bestVoice;
  } else if (lang.toLowerCase().startsWith('ru')) {
    const voice = getBestRussianVoice();
    if (voice) utterance.voice = voice;
  }
  
  // Set event handlers
  utterance.onend = () => {
    if (onEnd) onEnd();
  };
  
  utterance.onerror = (event) => {
    console.error('Speech synthesis error:', event);
    if (onError) onError(new Error(`Speech synthesis error: ${event.error}`));
  };
  
  // Speak the text
  window.speechSynthesis.speak(utterance);
};

/**
 * Checks if speech synthesis is supported in this browser
 */
export const isSpeechSupported = (): boolean => {
  return typeof window !== 'undefined' && (
    'speechSynthesis' in window || audioFilesFetched
  );
};

/**
 * Wait for voices to be loaded (workaround for Chrome)
 */
export const initVoices = async (): Promise<void> => {
  const synth = window.speechSynthesis;
  if (!synth) {
    return;
  }
  
  // If voices are already loaded
  if (synth.getVoices().length > 0) {
    return;
  }
  
  // Resolve as soon as voices load OR after a short fallback timeout
  await new Promise<void>(resolve => {
    const onVoicesChanged = () => {
      synth.removeEventListener('voiceschanged', onVoicesChanged);
      clearTimeout(fallbackTimer);
      resolve();
    };
    
    synth.addEventListener('voiceschanged', onVoicesChanged);
    
    // Fallback timeout in case the event doesn't fire
    const fallbackTimer = setTimeout(() => {
      synth.removeEventListener('voiceschanged', onVoicesChanged);
      resolve();
    }, 300);
  });
};

/**
 * Get installation instructions for Russian voices
 */
export const getRussianVoiceInstallInstructions = (): string => {
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (userAgent.includes('windows')) {
    return 'To add Russian voices in Windows, go to Settings → Time & Language → Language & Region → Add a language → Russian → Install the language pack.';
  }
  
  if (userAgent.includes('mac os') || userAgent.includes('macintosh')) {
    return 'To add Russian voices on macOS, go to System Preferences → Accessibility → Spoken Content → System Voice → Customize → Russian → Download the voice.';
  }
  
  if (userAgent.includes('android')) {
    return 'For Android, go to Settings → Language & Input → Text-to-speech output → Preferred engine settings → Install voice data → Russian.';
  }
  
  if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
    return 'For iOS, go to Settings → Accessibility → Spoken Content → Voices → Russian → Download the voice.';
  }
  
  return 'To add Russian voices, check your device settings for language and speech options, then download a Russian voice pack.';
};

// Default export
const browserSpeech = {
  getRussianVoices,
  getBestRussianVoice,
  isRussianVoiceAvailable,
  speakText,
  isSpeechSupported,
  initVoices,
  getRussianVoiceInstallInstructions
};

export default browserSpeech;
