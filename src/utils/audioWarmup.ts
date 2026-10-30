/**
 * Audio pipeline warm-up utility (matching basicenglish.school architecture)
 *
 * Browsers (especially Chromium on Windows and WebKit on macOS/iOS) put audio
 * sub-systems into a suspended state until the first user interaction.
 * When the first sound is triggered, waking the hardware AudioContext and
 * spinning up the decoder pipeline causes a 1-2 second hang.
 *
 * This utility:
 * 1. Warms up the AudioContext on the very first user click/tap anywhere.
 * 2. Unlocks iOS audioSession for playback.
 * 3. Provides shared audio playback with immediate zero-latency execution.
 */

let isAudioWarmedUp = false;

export const warmUpAudioContext = (): void => {
  if (typeof window === 'undefined' || isAudioWarmedUp) return;

  try {
    // 1. AudioSession for mobile Safari/WebKit
    if ('audioSession' in navigator && (navigator as any).audioSession) {
      (navigator as any).audioSession.type = 'playback';
    }

    // 2. Resume suspended AudioContext with a 1-sample silent buffer
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtx) {
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      try {
        const buffer = ctx.createBuffer(1, 1, 22050);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
      } catch {
        // Silent catch for autoplay restrictions
      }
    }

    // 3. Primes the HTML5 Audio (HTMLMediaElement) pipeline
    // Chromium and WebKit browsers maintain separate audio graphs for WebAudio and HTMLMediaElement.
    // Playing a tiny silent 1-sample WAV primes the hardware media sink and decoder thread
    // so the very first user click on an <audio> element plays with zero startup lag.
    if (typeof navigator === 'undefined' || !navigator.userAgent.includes('jsdom')) {
      try {
        const silentAudio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA');
        silentAudio.volume = 0.01;
        const playPromise = silentAudio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      } catch {
        // Ignore autoplay restrictions
      }
    }

    isAudioWarmedUp = true;
  } catch {
    // Ignore environments without Web Audio support
  }
};

// Global single-shot listeners so the first movement, tap, or touch instantly unfreezes the audio hardware
if (typeof window !== 'undefined') {
  const handleFirstInteraction = () => {
    warmUpAudioContext();
    window.removeEventListener('pointerdown', handleFirstInteraction, true);
    window.removeEventListener('pointermove', handleFirstInteraction, true);
    window.removeEventListener('touchstart', handleFirstInteraction, true);
    window.removeEventListener('keydown', handleFirstInteraction, true);
  };

  window.addEventListener('pointerdown', handleFirstInteraction, { capture: true, once: true });
  window.addEventListener('pointermove', handleFirstInteraction, { capture: true, once: true });
  window.addEventListener('touchstart', handleFirstInteraction, { capture: true, once: true });
  window.addEventListener('keydown', handleFirstInteraction, { capture: true, once: true });
}
