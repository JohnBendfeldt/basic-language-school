import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../utils/browserSpeech', () => ({
  speakText: vi.fn(),
  isSpeechSupported: vi.fn(() => false),
  initVoices: vi.fn(() => Promise.resolve()),
}));

import { speakText, initVoices as initBrowserVoices } from '../utils/browserSpeech';
import speechUtils, { speak, cancelAllSpeech, initVoices, isSpeechSupported } from '../utils/speech';

const mockedSpeak = vi.mocked(speakText);

describe('speech queue utilities', () => {
  beforeEach(() => {
    cancelAllSpeech();
    mockedSpeak.mockReset();
  });

  it('speaks immediately and passes language and rate', () => {
    speak('привет', 'ru-RU', 'btn1', undefined, undefined, 0.8);
    expect(mockedSpeak).toHaveBeenCalledTimes(1);
    expect(mockedSpeak.mock.calls[0][0]).toBe('привет');
    expect(mockedSpeak.mock.calls[0][1]).toBe('ru-RU');
    expect(mockedSpeak.mock.calls[0][4]).toBe(0.8);
  });

  it('queues a second request on the same button until the first ends', () => {
    const onEnd1 = vi.fn();
    speak('один', 'ru-RU', 'btn2', onEnd1);
    speak('два', 'ru-RU', 'btn2');
    expect(mockedSpeak).toHaveBeenCalledTimes(1);

    const onDone = mockedSpeak.mock.calls[0][2] as () => void;
    onDone();
    expect(onEnd1).toHaveBeenCalled();
    expect(mockedSpeak).toHaveBeenCalledTimes(2);
    expect(mockedSpeak.mock.calls[1][0]).toBe('два');
  });

  it('runs different buttons independently', () => {
    speak('a', 'en-US', 'btnA');
    speak('b', 'en-US', 'btnB');
    expect(mockedSpeak).toHaveBeenCalledTimes(2);
  });

  it('reports errors from the synthesizer and continues the queue', () => {
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const onError = vi.fn();
    speak('x', 'en-US', 'btn3', undefined, onError);
    speak('y', 'en-US', 'btn3');
    const onErr = mockedSpeak.mock.calls[0][3] as (e: Error) => void;
    onErr(new Error('boom'));
    expect(onError).toHaveBeenCalled();
    expect(mockedSpeak).toHaveBeenCalledTimes(2);
    errSpy.mockRestore();
  });

  it('handles synchronous throws from the synthesizer', () => {
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockedSpeak.mockImplementationOnce(() => { throw new Error('sync'); });
    const onError = vi.fn();
    speak('z', 'en-US', 'btn4', undefined, onError);
    expect(onError).toHaveBeenCalled();
    errSpy.mockRestore();
  });

  it('cancelAllSpeech cancels window.speechSynthesis and clears queues', () => {
    const cancel = vi.fn();
    Object.defineProperty(window, 'speechSynthesis', { value: { cancel }, configurable: true });
    speak('one', 'en-US', 'btn5');
    speak('two', 'en-US', 'btn5');
    cancelAllSpeech();
    expect(cancel).toHaveBeenCalled();
    speak('three', 'en-US', 'btn5');
    expect(mockedSpeak.mock.calls.at(-1)?.[0]).toBe('three');
  });

  it('initVoices initializes once and marks speech as supported', async () => {
    await initVoices();
    await initVoices();
    expect(vi.mocked(initBrowserVoices)).toHaveBeenCalledTimes(1);
    expect(isSpeechSupported()).toBe(true);
    expect(speechUtils.speak).toBe(speak);
  });
});
