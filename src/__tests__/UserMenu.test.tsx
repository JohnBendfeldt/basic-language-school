import { settle } from './testUtils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LanguageProvider } from '../contexts/LanguageContext';
import UserMenu from '../components/UserMenu';

const mocks = vi.hoisted(() => ({
  signOutUser: vi.fn(),
  signInWithGoogle: vi.fn(),
  signInWithGithub: vi.fn(),
  signInWithEntra: vi.fn(),
  isSupabaseConfigured: vi.fn(() => false),
}));

// supabase: null → the component skips session lookups and uses only the `initialUser` prop
vi.mock('../services/supabaseClient', async () => {
  const actual = await vi.importActual<typeof import('../services/supabaseClient')>('../services/supabaseClient');
  return { ...actual, ...mocks, supabase: null };
});

const renderMenu = (props: Record<string, unknown> = {}, baseLang = 'en') => {
  localStorage.setItem('basic_language_base_lang', baseLang);
  localStorage.setItem('basic_language_target_lang', baseLang === 'en' ? 'es' : 'en');
  return render(
    <LanguageProvider>
      <UserMenu {...props} />
    </LanguageProvider>
  );
};

const user = (extra: Record<string, unknown> = {}) => ({
  email: 'maria.lopez@example.com',
  user_metadata: { full_name: 'Maria Lopez' },
  ...extra,
});

describe('UserMenu - guest', () => {
  beforeEach(() => {
    mocks.signOutUser.mockReset().mockResolvedValue(undefined);
  });

  it('shows stats and sign-in buttons', () => {
    renderMenu();
    expect(screen.getByLabelText('View learning stats')).toBeInTheDocument();
    expect(screen.getByLabelText('Sign in to sync progress')).toBeInTheDocument();
  });

  it('opens the sign-in dialog', () => {
    renderMenu();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Sign in to sync progress'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('localizes the guest buttons', () => {
    renderMenu({}, 'ru');
    expect(screen.getByLabelText('View learning stats')).toHaveTextContent('Статистика');
  });
});

describe('UserMenu - signed in', () => {
  beforeEach(() => {
    mocks.signOutUser.mockReset().mockResolvedValue(undefined);
  });

  it('shows the display name from the profile and falls back to the email prefix, then "User"', () => {
    const { unmount } = renderMenu({ initialUser: user() });
    expect(screen.getByLabelText('User menu for Maria Lopez')).toBeInTheDocument();
    unmount();

    const second = renderMenu({ initialUser: { email: 'jo.smith@example.com' } });
    expect(screen.getByLabelText('User menu for jo.smith')).toBeInTheDocument();
    second.unmount();

    renderMenu({ initialUser: {} });
    expect(screen.getByLabelText('User menu for User')).toBeInTheDocument();
  });

  it('renders the avatar image with no-referrer when HTTPS and blocks unsafe avatar URLs', () => {
    const { unmount } = renderMenu({ initialUser: user({ user_metadata: { full_name: 'Maria', avatar_url: 'https://img.test/a.png' } }) });
    const img = screen.getByAltText('Maria');
    expect(img).toHaveAttribute('src', 'https://img.test/a.png');
    expect(img).toHaveAttribute('referrerpolicy', 'no-referrer');
    unmount();

    renderMenu({ initialUser: user({ user_metadata: { full_name: 'Maria', avatar_url: 'javascript:alert(1)' } }) });
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('toggles the dropdown and reports expanded state', () => {
    renderMenu({ initialUser: user() });
    const trigger = screen.getByLabelText('User menu for Maria Lopez');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('maria.lopez@example.com')).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes the dropdown when clicking elsewhere on the page', () => {
    renderMenu({ initialUser: user() });
    fireEvent.click(screen.getByLabelText('User menu for Maria Lopez'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('signs out, clears the session and returns to the guest buttons', async () => {
    renderMenu({ initialUser: user() });
    fireEvent.click(screen.getByLabelText('User menu for Maria Lopez'));
    fireEvent.click(screen.getByText('Sign Out'));

    await waitFor(() => expect(screen.getByLabelText('Sign in to sync progress')).toBeInTheDocument());
    expect(mocks.signOutUser).toHaveBeenCalledTimes(1);
    expect(screen.queryByLabelText('User menu for Maria Lopez')).not.toBeInTheDocument();
  });

  it('opens the progress dialog from the menu', async () => {
    renderMenu({ initialUser: user() });
    fireEvent.click(screen.getByLabelText('User menu for Maria Lopez'));
    fireEvent.click(screen.getByText('My Learning Progress'));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    // The dialog loads progress data asynchronously; let it finish inside act
    await settle();
  });

  it('localizes the menu items instead of leaving English labels', () => {
    renderMenu({ initialUser: user() }, 'ru');
    fireEvent.click(screen.getByLabelText('User menu for Maria Lopez'));
    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument();
    expect(screen.queryByText('My Progress & Stats')).not.toBeInTheDocument();
  });

  describe('legal navigation', () => {
    it.each([
      ['about', 'About & Contact'],
      ['privacy', 'Privacy Policy'],
      ['terms', 'Terms of Service'],
    ])('navigates to %s and closes the menu', (section, label) => {
      const onNavigate = vi.fn();
      renderMenu({ initialUser: user(), onNavigate });
      fireEvent.click(screen.getByLabelText('User menu for Maria Lopez'));
      fireEvent.click(screen.getByText(label));
      expect(onNavigate).toHaveBeenCalledWith(section);
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('hides the legal links when no navigation handler is provided', () => {
      renderMenu({ initialUser: user() });
      fireEvent.click(screen.getByLabelText('User menu for Maria Lopez'));
      expect(screen.queryByText('Privacy Policy')).not.toBeInTheDocument();
    });
  });

  describe('sign-in provider badge', () => {
    const badge = (u: Record<string, unknown>) => {
      renderMenu({ initialUser: user(u) });
      fireEvent.click(screen.getByLabelText('User menu for Maria Lopez'));
      return document.querySelector('.provider-badge')?.textContent?.trim();
    };

    it('uses the most recently used identity when several accounts are linked', () => {
      expect(
        badge({
          identities: [
            { provider: 'google', last_sign_in_at: '2024-01-01T00:00:00Z' },
            { provider: 'github', last_sign_in_at: '2025-06-01T00:00:00Z' },
          ],
        })
      ).toContain('GitHub');
    });

    it('recognises Microsoft/Azure identities', () => {
      expect(badge({ identities: [{ provider: 'azure', last_sign_in_at: '2025-01-01' }] })).toContain('Microsoft Entra ID');
    });

    it('falls back to app_metadata.provider', () => {
      expect(badge({ app_metadata: { provider: 'google' } })).toContain('Google');
    });

    it('falls back to the app_metadata.providers list', () => {
      expect(badge({ app_metadata: { providers: ['github'] } })).toContain('GitHub');
    });

    it('shows a generic Account badge for unknown or email providers', () => {
      expect(badge({ app_metadata: { provider: 'email' } })).toContain('Account');
    });
  });
});

