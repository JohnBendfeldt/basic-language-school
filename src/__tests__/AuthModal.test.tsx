import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LanguageProvider } from '../contexts/LanguageContext';
import AuthModal from '../components/AuthModal';

const mocks = vi.hoisted(() => ({
  signInWithGoogle: vi.fn(),
  signInWithGithub: vi.fn(),
  signInWithEntra: vi.fn(),
  isSupabaseConfigured: vi.fn(() => false),
}));

vi.mock('../services/supabaseClient', () => mocks);

const renderModal = (isOpen = true, onClose = vi.fn(), baseLang = 'en') => {
  localStorage.setItem('basic_language_base_lang', baseLang);
  localStorage.setItem('basic_language_target_lang', baseLang === 'en' ? 'es' : 'en');
  render(
    <LanguageProvider>
      <AuthModal isOpen={isOpen} onClose={onClose} />
    </LanguageProvider>
  );
  return onClose;
};

describe('AuthModal', () => {
  beforeEach(() => {
    mocks.signInWithGoogle.mockReset().mockResolvedValue({ error: null });
    mocks.signInWithGithub.mockReset().mockResolvedValue({ error: null });
    mocks.signInWithEntra.mockReset().mockResolvedValue({ error: null });
    mocks.isSupabaseConfigured.mockReset().mockReturnValue(false);
  });

  it('renders nothing while closed', () => {
    renderModal(false);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('offers all three providers', () => {
    renderModal();
    expect(screen.getByLabelText('Sign in with Google')).toBeInTheDocument();
    expect(screen.getByLabelText('Sign in with GitHub')).toBeInTheDocument();
    expect(screen.getByLabelText('Sign in with Microsoft Entra ID')).toBeInTheDocument();
  });

  it('explains guest mode when cloud sync is not configured, and hides it when it is', () => {
    renderModal();
    expect(screen.getByText(/Running in Guest Mode/i)).toBeInTheDocument();
  });

  it('hides the guest-mode notice when Supabase is configured', () => {
    mocks.isSupabaseConfigured.mockReturnValue(true);
    renderModal();
    expect(screen.queryByText(/Running in Guest Mode/i)).not.toBeInTheDocument();
  });

  it.each([
    ['ru', 'Синхронизация прогресса'],
    ['es', 'Sincroniza tu Progreso de Aprendizaje'],
    ['fr', 'Synchronisez Votre Progression'],
    ['en', 'Sync Your Learning Progress'],
  ])('shows the %s title', (lang, title) => {
    renderModal(true, vi.fn(), lang);
    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
  });

  it('starts Google sign-in, shows a connecting notice, and disables every provider meanwhile', async () => {
    let resolve!: (v: { error: null }) => void;
    mocks.signInWithGoogle.mockReturnValue(new Promise((r) => (resolve = r)));
    renderModal();

    fireEvent.click(screen.getByLabelText('Sign in with Google'));
    expect(await screen.findByText(/Connecting to Google/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Sign in with GitHub')).toBeDisabled();
    expect(screen.getByLabelText('Sign in with Microsoft Entra ID')).toBeDisabled();

    resolve({ error: null });
    await waitFor(() => expect(screen.queryByText(/Connecting to/i)).not.toBeInTheDocument());
    expect(screen.getByLabelText('Sign in with GitHub')).toBeEnabled();
  });

  it.each([
    ['Sign in with GitHub', 'signInWithGithub', 'GitHub'],
    ['Sign in with Microsoft Entra ID', 'signInWithEntra', 'Microsoft'],
  ] as const)('%s calls the matching provider and names it while connecting', async (label, fn, name) => {
    mocks[fn].mockReturnValue(new Promise(() => {}));
    renderModal();
    fireEvent.click(screen.getByLabelText(label));
    expect(await screen.findByText(new RegExp(`Connecting to ${name}`, 'i'))).toBeInTheDocument();
    expect(mocks[fn]).toHaveBeenCalledTimes(1);
  });

  it('shows the provider error message and re-enables the buttons', async () => {
    mocks.signInWithGoogle.mockResolvedValue({ error: { message: 'OAuth popup was blocked' } });
    renderModal();
    fireEvent.click(screen.getByLabelText('Sign in with Google'));
    expect(await screen.findByText('OAuth popup was blocked')).toBeInTheDocument();
    expect(screen.getByLabelText('Sign in with Google')).toBeEnabled();
  });

  it('falls back to a readable message when the provider throws', async () => {
    mocks.signInWithGithub.mockRejectedValue(new Error(''));
    renderModal();
    fireEvent.click(screen.getByLabelText('Sign in with GitHub'));
    expect(await screen.findByText('Failed to initialize GitHub login')).toBeInTheDocument();
  });

  it('clears a previous error when the learner tries again', async () => {
    mocks.signInWithGoogle.mockResolvedValueOnce({ error: { message: 'First failure' } });
    renderModal();
    fireEvent.click(screen.getByLabelText('Sign in with Google'));
    expect(await screen.findByText('First failure')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Sign in with Google'));
    await waitFor(() => expect(screen.queryByText('First failure')).not.toBeInTheDocument());
  });

  it('closes from the X button and the backdrop, but not when clicking inside the card', () => {
    const onClose = renderModal();
    fireEvent.click(screen.getByRole('heading', { name: /Sync Your Learning Progress/i }));
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});

