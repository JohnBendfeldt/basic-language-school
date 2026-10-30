import { describe, it, expect, vi } from 'vitest';
import { warmUpAudioContext } from '../utils/audioWarmup';

describe('warmUpAudioContext', () => {
  it('resumes a suspended AudioContext and plays a silent buffer once', () => {
    const start = vi.fn();
    const resume = vi.fn(() => Promise.resolve());
    const created: unknown[] = [];
    class FakeAudioContext {
      state = 'suspended';
      destination = {};
      constructor() { created.push(this); }
      resume = resume;
      createBuffer = vi.fn(() => ({}));
      createBufferSource = vi.fn(() => ({ connect: vi.fn(), start, buffer: null }));
    }
    Object.defineProperty(window, 'AudioContext', { value: FakeAudioContext, configurable: true });

    warmUpAudioContext();
    expect(resume).toHaveBeenCalled();
    expect(start).toHaveBeenCalledWith(0);

    // Second call is a no-op once warmed up
    warmUpAudioContext();
    expect(created).toHaveLength(1);
  });
});
