// Extends Vitest's expect with jest-dom matchers
// e.g. expect(element).toBeInTheDocument()
import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, vi } from 'vitest';

// Mock window.scrollTo for jsdom environment
window.scrollTo = vi.fn();

// jsdom does not implement media playback. Stub it once here so every suite gets quiet,
// predictable audio instead of "Not implemented: HTMLMediaElement.prototype.play/pause" noise.
window.HTMLMediaElement.prototype.play = vi.fn().mockImplementation(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = vi.fn();
window.HTMLMediaElement.prototype.load = vi.fn();

beforeEach(() => {
  // Learner settings (language pair, quiz goal, speed) live in localStorage and must not leak between tests.
  localStorage.clear();
});

afterEach(() => {
  // Undo vi.spyOn(...) such as a pinned Math.random so one test cannot change the next one.
  vi.restoreAllMocks();
});
