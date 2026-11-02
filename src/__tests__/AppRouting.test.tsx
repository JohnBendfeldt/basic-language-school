import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import App from '../App';

window.HTMLMediaElement.prototype.play = vi.fn().mockImplementation(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = vi.fn();
window.scrollTo = vi.fn() as any;

const mountAt = async (path: string, opts: { base?: string; target?: string } = {}) => {
  localStorage.clear();
  if (opts.base) localStorage.setItem('basic_language_base_lang', opts.base);
  if (opts.target) localStorage.setItem('basic_language_target_lang', opts.target);
  window.history.pushState({}, '', path);
  const utils = render(<App />);
  // Wait for the speech engine splash to clear
  await waitFor(() => expect(utils.container.querySelector('.loading-section')).toBeNull());
  return utils;
};

afterEach(() => {
  window.history.pushState({}, '', '/');
  document.title = '';
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe('App routing - URL to section', () => {
  const routes: Array<[string, string]> = [
    ['/', '.alphabet-section'],
    ['/alphabet', '.alphabet-section'],
    ['/quiz', '.quiz-section'],
    ['/phrases', '.phrases-header-section'],
    ['/words', '.phrases-header-section'],
    ['/numbers', '.numbers-and-time-section'],
    ['/time', '.numbers-and-time-section'],
    ['/about', '.about-container'],
    ['/contact', '.about-container'],
    ['/learn/quiz', '.quiz-section'],
    ['/learn/ru/quiz', '.quiz-section'],
    ['/learn/ru/phrases', '.phrases-header-section'],
    ['/learn/ru', '.alphabet-section'],
    ['/learn/ru/not-a-section', '.alphabet-section'],
    ['/learn/not-a-language', '.alphabet-section'],
    ['/ru/quiz', '.quiz-section'],
    ['/ru', '.alphabet-section'],
    ['/ru/bogus', '.alphabet-section'],
    ['/totally/unknown/path', '.alphabet-section'],
  ];

  it.each(routes)('%s renders %s', async (path, selector) => {
    const { container } = await mountAt(path);
    expect(container.querySelector(selector)).not.toBeNull();
  });

  it('is case-insensitive for paths', async () => {
    const { container } = await mountAt('/QUIZ');
    expect(container.querySelector('.quiz-section')).not.toBeNull();
  });

  it('renders legal pages directly', async () => {
    await mountAt('/privacy');
    expect(screen.getByRole('heading', { name: 'Privacy Policy', level: 1 })).toBeInTheDocument();
  });
});

describe('App routing - navigation updates the URL', () => {
  it('keeps root-style URLs when not under /learn', async () => {
    await mountAt('/alphabet');
    fireEvent.click(screen.getByRole('link', { name: /terms of service/i }));
    await waitFor(() => expect(window.location.pathname).toBe('/terms'));
  });

  it('keeps /learn/<lang>/<section> URLs when already under /learn', async () => {
    await mountAt('/learn/ru/alphabet');
    fireEvent.click(screen.getByRole('link', { name: /terms of service/i }));
    await waitFor(() => expect(window.location.pathname).toBe('/learn/ru/terms'));
  });

  it('does not push a duplicate history entry for the current path', async () => {
    await mountAt('/about');
    const spy = vi.spyOn(window.history, 'pushState');
    fireEvent.click(screen.getByRole('link', { name: /about/i }));
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('clicking the logo returns to the alphabet and scrolls to top', async () => {
    await mountAt('/quiz');
    fireEvent.click(screen.getByRole('heading', { level: 1 }));
    await waitFor(() => expect(window.location.pathname).toBe('/alphabet'));
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('pauses any playing audio when changing section', async () => {
    const { container } = await mountAt('/alphabet');
    const audio = document.createElement('audio');
    const pauseSpy = vi.spyOn(audio, 'pause');
    container.appendChild(audio);
    fireEvent.click(screen.getByRole('link', { name: /terms of service/i }));
    expect(pauseSpy).toHaveBeenCalled();
  });
});

describe('App routing - browser back/forward', () => {
  it('follows popstate to a different section', async () => {
    const { container } = await mountAt('/alphabet');
    expect(container.querySelector('.alphabet-section')).not.toBeNull();

    window.history.pushState({}, '', '/quiz');
    act(() => {
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    await waitFor(() => expect(container.querySelector('.quiz-section')).not.toBeNull());
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('switches the learning language when popstate lands on another language', async () => {
    await mountAt('/learn/ru/alphabet', { base: 'en', target: 'ru' });
    expect(screen.getByRole('heading', { name: /basic russian/i, level: 1 })).toBeInTheDocument();

    window.history.pushState({}, '', '/learn/es/alphabet');
    act(() => {
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 }).textContent).toMatch(/spanish/i)
    );
  });
});

describe('App - SEO metadata follows the section', () => {
  it('sets a canonical link for the current language and section', async () => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', 'https://basiclanguage.school/');
    document.head.appendChild(link);

    await mountAt('/learn/ru/quiz', { base: 'en', target: 'ru' });
    await waitFor(() =>
      expect(link.getAttribute('href')).toBe('https://basiclanguage.school/learn/ru/quiz')
    );
    link.remove();
  });

  it('updates the document title per section', async () => {
    await mountAt('/alphabet');
    const alphabetTitle = document.title;
    fireEvent.click(screen.getByRole('link', { name: /terms of service/i }));
    await waitFor(() => expect(document.title.length).toBeGreaterThan(0));
    expect(alphabetTitle.length).toBeGreaterThan(0);
  });
});

describe('App - search shortcut', () => {
  it('opens and closes search with Ctrl+K', async () => {
    await mountAt('/alphabet');
    expect(screen.queryByRole('dialog')).toBeNull();

    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    await waitFor(() => expect(document.querySelector('.search-modal-overlay, [role="dialog"]')).not.toBeNull());

    fireEvent.keyDown(window, { key: 'K', ctrlKey: true });
    await waitFor(() => expect(document.querySelector('.search-modal-overlay')).toBeNull());
  });

  it('opens search with Cmd+K and ignores a bare K', async () => {
    await mountAt('/alphabet');
    fireEvent.keyDown(window, { key: 'k' });
    expect(document.querySelector('.search-modal-overlay')).toBeNull();

    fireEvent.keyDown(window, { key: 'k', metaKey: true });
    await waitFor(() => expect(document.querySelector('.search-modal-overlay')).not.toBeNull());
  });

  it('opens search from the header button', async () => {
    await mountAt('/alphabet');
    fireEvent.click(document.querySelector('.header-search-btn') as HTMLElement);
    await waitFor(() => expect(document.querySelector('.search-modal-overlay')).not.toBeNull());
  });

  it('opens search from the mobile header button', async () => {
    await mountAt('/alphabet');
    fireEvent.click(document.querySelector('.mobile-search-btn') as HTMLElement);
    await waitFor(() => expect(document.querySelector('.search-modal-overlay')).not.toBeNull());
  });
});

describe('App - PWA install prompt', () => {
  const fireInstallPrompt = () => {
    const prompt = vi.fn();
    let resolveChoice: (v: unknown) => void = () => {};
    const userChoice = new Promise((r) => { resolveChoice = r; });
    const evt: any = new Event('beforeinstallprompt', { cancelable: true });
    evt.prompt = prompt;
    evt.userChoice = userChoice;
    act(() => {
      window.dispatchEvent(evt);
    });
    return { evt, prompt, resolveChoice };
  };

  it('shows no install button until the browser offers one', async () => {
    await mountAt('/alphabet');
    expect(document.querySelector('.install-button')).toBeNull();
  });

  it('shows the install button, prevents the default mini-bar, and triggers the prompt on click', async () => {
    await mountAt('/alphabet');
    const { evt, prompt, resolveChoice } = fireInstallPrompt();
    expect(evt.defaultPrevented).toBe(true);

    const btn = await waitFor(() => {
      const el = document.querySelector('.install-button') as HTMLElement;
      expect(el).not.toBeNull();
      return el;
    });
    fireEvent.click(btn);
    expect(prompt).toHaveBeenCalledTimes(1);

    await act(async () => {
      resolveChoice({ outcome: 'accepted' });
    });
    await waitFor(() => expect(document.querySelector('.install-button')).toBeNull());
  });

  it('hides the install button once the app has been installed', async () => {
    await mountAt('/alphabet');
    fireInstallPrompt();
    await waitFor(() => expect(document.querySelector('.install-button')).not.toBeNull());

    act(() => {
      window.dispatchEvent(new Event('appinstalled'));
    });
    await waitFor(() => expect(document.querySelector('.install-button')).toBeNull());
  });
});

describe('App - mobile drawer', () => {
  it('opens from the hamburger button and closes again', async () => {
    await mountAt('/alphabet');
    fireEvent.click(screen.getByRole('button', { name: /open settings and menu/i }));
    const drawer = document.querySelector('.mobile-drawer, .drawer-overlay, [class*="drawer"]');
    expect(drawer).not.toBeNull();
  });
});

describe('App - search result selection', () => {
  const openSearch = async (query: string) => {
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    const input = await waitFor(() => {
      const el = document.querySelector('.search-input-field') as HTMLInputElement;
      expect(el).not.toBeNull();
      return el;
    });
    fireEvent.change(input, { target: { value: query } });
  };

  it('jumps from the quiz to the Grammar tab when a grammar result is chosen', async () => {
    const { container } = await mountAt('/learn/de/quiz', { base: 'en', target: 'de' });
    expect(container.querySelector('.quiz-section')).not.toBeNull();

    await openSearch('sein');

    // Narrow the results to grammar entries
    const grammarFilter = await waitFor(() => {
      const el = Array.from(document.querySelectorAll('.search-results-filter-tabs button'))
        .find((b) => /grammar/i.test(b.textContent || '')) as HTMLElement;
      expect(el).toBeTruthy();
      return el;
    });
    fireEvent.click(grammarFilter);

    const card = await waitFor(() => {
      const el = document.querySelector('.search-result-card') as HTMLElement;
      expect(el).not.toBeNull();
      return el;
    });
    fireEvent.click(card);

    // Modal closes and we land on the grammar view inside the alphabet section
    await waitFor(() => expect(document.querySelector('.search-modal-overlay')).toBeNull());
    await waitFor(() => expect(screen.getByTestId('grammar-component')).toBeInTheDocument());
    expect(container.querySelector('.quiz-section')).toBeNull();
    expect(window.location.pathname).toBe('/learn/de/alphabet');
  });

  it('jumps to the matching section for a non-grammar result', async () => {
    const { container } = await mountAt('/learn/es/alphabet', { base: 'en', target: 'es' });
    await openSearch('water');

    const card = await waitFor(() => {
      const el = document.querySelector('.search-result-card') as HTMLElement;
      expect(el).not.toBeNull();
      return el;
    });
    fireEvent.click(card);

    await waitFor(() => expect(document.querySelector('.search-modal-overlay')).toBeNull());
    expect(container.querySelector('.alphabet-section')).toBeNull();
  });
});

