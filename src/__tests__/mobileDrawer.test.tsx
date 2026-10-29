import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider } from '../contexts/LanguageContext';
import MobileDrawer from '../components/MobileDrawer';
import App from '../App';

describe('MobileDrawer Component', () => {
  it('does not render when isOpen is false', () => {
    const { container } = render(
      <LanguageProvider>
        <MobileDrawer isOpen={false} onClose={vi.fn()} onNavigate={vi.fn()} />
      </LanguageProvider>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders all sections and options when open', () => {
    const handleClose = vi.fn();
    const handleNavigate = vi.fn();

    render(
      <LanguageProvider>
        <MobileDrawer
          isOpen={true}
          onClose={handleClose}
          onNavigate={handleNavigate}
        />
      </LanguageProvider>
    );

    // Header & identity
    expect(screen.getByText('Personal Study Dashboard')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument();

    // Section 1: Learning pair
    expect(screen.getByText('Learning Pair')).toBeInTheDocument();
    expect(screen.getByLabelText('Swap language pair')).toBeInTheDocument();

    // Section 2: Audio playback speed
    expect(screen.getByText('Audio Playback Speed')).toBeInTheDocument();
    expect(screen.getByText('0.50×')).toBeInTheDocument();
    expect(screen.getByText('1.0×')).toBeInTheDocument();

    // Section 3: Progress & stats
    expect(screen.getByText('My Learning Progress')).toBeInTheDocument();

    // Section 4: Account & sync
    expect(screen.getByText('Account & Cloud Sync')).toBeInTheDocument();

    // Section 5: Legal links
    expect(screen.getByRole('button', { name: /privacy policy/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /terms of service/i })).toBeInTheDocument();
  });

  it('calls onClose when clicking close button or pressing Escape', () => {
    const handleClose = vi.fn();
    render(
      <LanguageProvider>
        <MobileDrawer isOpen={true} onClose={handleClose} onNavigate={vi.fn()} />
      </LanguageProvider>
    );

    const closeBtn = screen.getByRole('button', { name: 'Close menu' });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(2);
  });

  it('navigates to Privacy Policy when clicked in drawer', () => {
    const handleNavigate = vi.fn();
    const handleClose = vi.fn();

    render(
      <LanguageProvider>
        <MobileDrawer isOpen={true} onClose={handleClose} onNavigate={handleNavigate} />
      </LanguageProvider>
    );

    const privacyBtn = screen.getByRole('button', { name: /privacy policy/i });
    fireEvent.click(privacyBtn);

    expect(handleNavigate).toHaveBeenCalledWith('privacy');
    expect(handleClose).toHaveBeenCalled();
  });

  it('opens MobileDrawer when clicking the hamburger button in App', () => {
    render(<App />);

    const hamburgerBtn = screen.getByRole('button', { name: /open settings and menu/i });
    expect(hamburgerBtn).toBeInTheDocument();

    fireEvent.click(hamburgerBtn);

    expect(screen.getByRole('dialog', { name: /settings and options menu/i })).toBeInTheDocument();
    expect(screen.getByText('Personal Study Dashboard')).toBeInTheDocument();
  });

  it('triggers AuthModal and dismisses drawer when clicking Sign In & Sync', () => {
    const handleClose = vi.fn();
    render(
      <LanguageProvider>
        <MobileDrawer isOpen={true} onClose={handleClose} onNavigate={vi.fn()} />
      </LanguageProvider>
    );

    const signInBtn = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(signInBtn);

    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('heading', { name: /sync your learning progress/i })).toBeInTheDocument();
  });

  it('triggers ProgressModal and dismisses drawer when clicking My Learning Progress', () => {
    const handleClose = vi.fn();
    render(
      <LanguageProvider>
        <MobileDrawer isOpen={true} onClose={handleClose} onNavigate={vi.fn()} />
      </LanguageProvider>
    );

    const progressCard = screen.getByText('My Learning Progress').closest('[role="button"]')!;
    fireEvent.click(progressCard);

    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('heading', { name: /your learning progress/i })).toBeInTheDocument();
  });
});
