import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider } from '../contexts/LanguageContext';
import VoiceSpeedControl from '../components/VoiceSpeedControl';
import Navigation from '../components/Navigation';
import { getRelaxedAndBriskSpeedLabels } from '../utils/pageDictionary';
import { SupportedLanguageId } from '../data/languages/types';

const ALL: SupportedLanguageId[] = ['en', 'es', 'fr', 'ru', 'pt', 'de', 'id', 'tr', 'zh', 'ja', 'ko', 'hi', 'ar', 'bn', 'ur'];

const withLang = (ui: React.ReactElement, base = 'en', target = 'es') => {
  localStorage.setItem('basic_language_base_lang', base);
  localStorage.setItem('basic_language_target_lang', target);
  return render(<LanguageProvider>{ui}</LanguageProvider>);
};

describe('VoiceSpeedControl', () => {
  it('shows the current speed and starts closed', () => {
    withLang(<VoiceSpeedControl />);
    expect(screen.getByRole('button', { name: /Voice speed: 1x/ })).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('lists all six speeds and marks the active one', () => {
    withLang(<VoiceSpeedControl />);
    fireEvent.click(screen.getByRole('button', { name: /Voice speed/ }));
    const items = screen.getAllByRole('menuitem');
    expect(items.map((i) => i.querySelector('.speed-val')?.textContent)).toEqual(['0.50×', '0.75×', '0.90×', '1.0×', '1.10×', '1.25×']);
    expect(items.filter((i) => i.className.includes('active'))).toHaveLength(1);
    expect(items[3].className).toContain('active');
  });

  it('applies the chosen speed, closes, and remembers it', () => {
    const { unmount } = withLang(<VoiceSpeedControl />);
    fireEvent.click(screen.getByRole('button', { name: /Voice speed/ }));
    fireEvent.click(screen.getByText('0.75×'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Voice speed: 0.75x/ })).toBeInTheDocument();
    unmount();

    withLang(<VoiceSpeedControl />);
    expect(screen.getByRole('button', { name: /Voice speed: 0.75x/ })).toBeInTheDocument();
  });

  it('closes with Escape, the X button, and the backdrop, but not from clicks inside', () => {
    withLang(<VoiceSpeedControl />);
    const open = () => fireEvent.click(screen.getByRole('button', { name: /Voice speed/ }));

    open();
    fireEvent.click(screen.getByRole('dialog'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    open();
    fireEvent.click(screen.getByLabelText('Close speed menu'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    open();
    fireEvent.click(document.querySelector('.voice-speed-backdrop')!);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes when the page is clicked elsewhere', () => {
    withLang(
      <div>
        <button>outside</button>
        <VoiceSpeedControl />
      </div>
    );
    fireEvent.click(screen.getByRole('button', { name: /Voice speed/ }));
    fireEvent.mouseDown(screen.getByText('outside'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it.each(ALL)('%s: every speed has a description in the learner\'s language', (base) => {
    withLang(<VoiceSpeedControl />, base, base === 'es' ? 'en' : 'es');
    fireEvent.click(screen.getByRole('button', { name: /Voice speed/ }));
    for (const item of screen.getAllByRole('menuitem')) {
      expect(item.querySelector('.speed-desc')?.textContent?.trim().length).toBeGreaterThan(0);
    }
  });

  it.each(['ru', 'ja', 'ko', 'zh', 'hi', 'ar', 'bn', 'ur'] as const)('%s: the relaxed and brisk speeds are not left in English', (base) => {
    withLang(<VoiceSpeedControl />, base);
    fireEvent.click(screen.getByRole('button', { name: /Voice speed/ }));
    const text = screen.getByRole('dialog').textContent ?? '';
    expect(text).not.toContain('Relaxed');
    expect(text).not.toContain('Brisk natural cadence');
  });
});

describe('getRelaxedAndBriskSpeedLabels', () => {
  it.each(ALL)('%s has both labels', (lang) => {
    const labels = getRelaxedAndBriskSpeedLabels(lang);
    expect(labels.relaxed.trim()).not.toBe('');
    expect(labels.brisk.trim()).not.toBe('');
  });

  it('falls back to English for an unknown language', () => {
    expect(getRelaxedAndBriskSpeedLabels('xx' as SupportedLanguageId).relaxed).toBe('Relaxed');
  });
});

describe('Navigation', () => {
  let setActive: ReturnType<typeof vi.fn<(section: string) => void>>;
  beforeEach(() => {
    setActive = vi.fn<(section: string) => void>();
  });

  const renderNav = (active: string, base = 'en') =>
    withLang(<Navigation activeSection={active} setActiveSection={setActive} isOpen={false} />, base);

  it('lists the five sections in order', () => {
    renderNav('alphabet');
    expect(screen.getAllByRole('listitem').map((li) => li.textContent)).toHaveLength(5);
  });

  it('tells the page which section was chosen', () => {
    renderNav('alphabet');
    const items = screen.getAllByRole('listitem');
    ['alphabet', 'phrases', 'words', 'numbers', 'quiz'].forEach((id, i) => {
      fireEvent.click(items[i]);
      expect(setActive).toHaveBeenLastCalledWith(id);
    });
  });

  it('highlights the active section', () => {
    renderNav('words');
    const active = screen.getAllByRole('listitem').filter((li) => li.className.includes('active'));
    expect(active).toHaveLength(1);
    expect(active[0]).toBe(screen.getAllByRole('listitem')[2]);
  });

  it('keeps Numbers highlighted while the Time tab is open', () => {
    renderNav('time');
    expect(screen.getAllByRole('listitem')[3].className).toContain('active');
  });

  it('adds the open class when the menu is open', () => {
    withLang(<Navigation activeSection="quiz" setActiveSection={setActive} isOpen />);
    expect(document.querySelector('nav')).toHaveClass('open');
  });

  it.each(['ru', 'ja', 'ar', 'bn'])('%s: labels are localized', (base) => {
    renderNav('alphabet', base);
    expect(screen.getAllByRole('listitem')[4].textContent).not.toBe('Quiz');
  });
});
