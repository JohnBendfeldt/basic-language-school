import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaSignOutAlt, FaChartLine, FaSignInAlt, FaGoogle, FaMicrosoft, FaGithub, FaShieldAlt, FaFileContract, FaInfoCircle } from 'react-icons/fa';
import { supabase, signOutUser, isSafeHttpsUrl, consumeGoogleIdTokenFromHash } from '../services/supabaseClient';
import { ProgressService } from '../services/progressService';
import { useLanguage } from '../contexts/LanguageContext';
import AuthModal from './AuthModal';
import ProgressModal from './ProgressModal';
import { getComponentChrome } from '../utils/pageDictionary';

interface UserMenuProps {
  onNavigate?: (section: string) => void;
  initialUser?: any;
}

export const UserMenu: React.FC<UserMenuProps> = ({ onNavigate, initialUser = null }) => {
  const { currentLanguage, baseLanguage } = useLanguage();
  const chrome = getComponentChrome(baseLanguage);
  const [currentUser, setCurrentUser] = useState<any>(initialUser);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [progressModalOpen, setProgressModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!supabase) return;

    // Exchange any direct Google OIDC ID token in the URL hash before checking the session
    (typeof consumeGoogleIdTokenFromHash === 'function'
      ? consumeGoogleIdTokenFromHash()
      : Promise.resolve()
    ).finally(() => {
      supabase!.auth.getUser().then(({ data: { user } }) => {
        setCurrentUser(user);
        if (user) {
          ProgressService.syncGuestDataToCloud(currentLanguage);
        }
      });
    });

    // Subscribe to auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const user = session?.user ?? null;
      setCurrentUser(user);
      if (user && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION')) {
        ProgressService.syncGuestDataToCloud(currentLanguage);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [currentLanguage]);

  // Close dropdown on click outside or Escape, and move initial focus when opened
  useEffect(() => {
    if (!menuOpen) return;

    const firstItem = menuContainerRef.current?.querySelector<HTMLButtonElement>('[role="menuitem"]');
    firstItem?.focus({ preventScroll: true });

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMenuOpen(false);
        triggerRef.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="menuitem"]'));
    if (!items.length) return;
    const currentIdx = items.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[(currentIdx + 1) % items.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      items[(currentIdx - 1 + items.length) % items.length]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      items[items.length - 1]?.focus();
    }
  };

  const handleSignOut = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    await signOutUser();
    setCurrentUser(null);
  };

  const resolveActiveProvider = (user: any): 'azure' | 'github' | 'google' | 'email' | 'account' => {
    if (!user) return 'account';

    // 1. If identities array is present (multi-provider account linking), find the identity with the latest sign-in
    if (Array.isArray(user.identities) && user.identities.length > 0) {
      const sorted = [...user.identities].sort((a, b) => {
        const timeA = new Date(a.last_sign_in_at || a.updated_at || a.created_at || 0).getTime();
        const timeB = new Date(b.last_sign_in_at || b.updated_at || b.created_at || 0).getTime();
        return timeB - timeA;
      });
      const latest = (sorted[0]?.provider || '').toLowerCase();
      if (latest === 'azure' || latest === 'microsoft') return 'azure';
      if (latest === 'github') return 'github';
      if (latest === 'google') return 'google';
      if (latest === 'email') return 'email';
    }

    // 2. Check app_metadata.provider
    const metaProvider = (user.app_metadata?.provider || '').toLowerCase();
    if (metaProvider === 'azure' || metaProvider === 'microsoft') return 'azure';
    if (metaProvider === 'github') return 'github';
    if (metaProvider === 'google') return 'google';
    if (metaProvider === 'email') return 'email';

    // 3. Check app_metadata.providers list
    const providersList = user.app_metadata?.providers || [];
    if (providersList.includes('azure') || providersList.includes('microsoft')) return 'azure';
    if (providersList.includes('github')) return 'github';
    if (providersList.includes('google')) return 'google';

    return 'account';
  };

  const provider = resolveActiveProvider(currentUser);
  const displayName = currentUser?.user_metadata?.full_name || currentUser?.email?.split('@')[0] || 'User';
  const avatarUrl = isSafeHttpsUrl(currentUser?.user_metadata?.avatar_url)
    ? currentUser.user_metadata.avatar_url
    : null;

  return (
    <div className="user-menu-wrapper" ref={dropdownRef}>
      {currentUser ? (
        // Logged-in state: trigger and dropdown are siblings, preventing bubbling bugs
        <>
          <button 
            ref={triggerRef}
            type="button"
            className="user-profile-trigger" 
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            aria-label={`User menu for ${displayName}`}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="user-avatar-img"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            ) : (
              <div className="user-avatar-placeholder" aria-hidden="true">
                <FaUser aria-hidden="true" />
              </div>
            )}
            <span className="user-display-name">{displayName}</span>
          </button>

          {menuOpen && (
            <div 
              className="user-dropdown-menu" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="user-dropdown-header">
                <p className="dropdown-name">{displayName}</p>
                <p className="dropdown-email">{currentUser.email}</p>
                <span className="provider-badge">
                  {provider === 'azure' ? (
                    <>
                      <FaMicrosoft aria-hidden="true" /> Microsoft Entra ID
                    </>
                  ) : provider === 'github' ? (
                    <>
                      <FaGithub aria-hidden="true" /> GitHub
                    </>
                  ) : provider === 'google' ? (
                    <>
                      <FaGoogle aria-hidden="true" /> Google
                    </>
                  ) : (
                    <>
                      <FaUser aria-hidden="true" /> Account
                    </>
                  )}
                </span>
              </div>

              <div className="dropdown-divider" role="presentation"></div>

              <div
                ref={menuContainerRef}
                className="user-dropdown-items"
                role="menu"
                aria-label={`User menu for ${displayName}`}
                onKeyDown={handleMenuKeyDown}
              >
                <button
                  type="button"
                  role="menuitem"
                  className="dropdown-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                    setProgressModalOpen(true);
                  }}
                >
                  <FaChartLine aria-hidden="true" />
                  <span>{chrome.myLearningProgress}</span>
                </button>

                {onNavigate && (
                  <>
                    <div className="dropdown-divider" role="separator"></div>
                    <button
                      type="button"
                      role="menuitem"
                      className="dropdown-item legal-dropdown-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(false);
                        onNavigate('about');
                      }}
                    >
                      <FaInfoCircle aria-hidden="true" />
                      <span>{chrome.aboutContact}</span>
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      className="dropdown-item legal-dropdown-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(false);
                        onNavigate('privacy');
                      }}
                    >
                      <FaShieldAlt aria-hidden="true" />
                      <span>{chrome.privacyPolicy}</span>
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      className="dropdown-item legal-dropdown-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(false);
                        onNavigate('terms');
                      }}
                    >
                      <FaFileContract aria-hidden="true" />
                      <span>{chrome.termsOfService}</span>
                    </button>
                  </>
                )}

                <div className="dropdown-divider" role="separator"></div>

                <button type="button" role="menuitem" className="dropdown-item signout-btn" onClick={handleSignOut}>
                  <FaSignOutAlt aria-hidden="true" />
                  <span>{chrome.signOut}</span>
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        // Guest state
        <div className="guest-action-buttons">
          <button
            type="button"
            className="header-action-btn progress-btn"
            onClick={() => setProgressModalOpen(true)}
            title="View learning stats"
            aria-label={`${chrome.myStats} — View learning stats`}
          >
            <FaChartLine aria-hidden="true" />
            <span className="btn-text">{chrome.myStats}</span>
          </button>

          <button
            type="button"
            className="header-action-btn signin-btn"
            onClick={() => setAuthModalOpen(true)}
            title="Sign in to sync progress"
            aria-label={`${chrome.signIn} — Sign in to sync progress`}
          >
            <FaSignInAlt aria-hidden="true" />
            <span className="btn-text">{chrome.signIn}</span>
          </button>
        </div>
      )}

      {/* Modals */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <ProgressModal
        isOpen={progressModalOpen}
        onClose={() => setProgressModalOpen(false)}
        userEmail={currentUser?.email}
        languageId={currentLanguage}
      />
    </div>
  );
};

export default UserMenu;
