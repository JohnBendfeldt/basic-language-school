import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaSignOutAlt, FaChartLine, FaSignInAlt, FaGoogle, FaMicrosoft, FaGithub, FaShieldAlt, FaFileContract } from 'react-icons/fa';
import { supabase, signOutUser } from '../services/supabaseClient';
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

  useEffect(() => {
    if (!supabase) return;

    // Check existing session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setCurrentUser(user);
      if (user) {
        ProgressService.syncGuestDataToCloud(currentLanguage);
      }
    });

    // Subscribe to auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      setCurrentUser(user);
      if (user) {
        ProgressService.syncGuestDataToCloud(currentLanguage);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [currentLanguage]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  return (
    <div className="user-menu-wrapper" ref={dropdownRef}>
      {currentUser ? (
        // Logged-in state: trigger and dropdown are siblings, preventing bubbling bugs
        <>
          <button 
            type="button"
            className="user-profile-trigger" 
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-haspopup="true"
            aria-label={`User menu for ${displayName}`}
          >
            {currentUser.user_metadata?.avatar_url ? (
              <img
                src={currentUser.user_metadata.avatar_url}
                alt={displayName}
                className="user-avatar-img"
              />
            ) : (
              <div className="user-avatar-placeholder">
                <FaUser />
              </div>
            )}
            <span className="user-display-name">{displayName}</span>
          </button>

          {menuOpen && (
            <div 
              className="user-dropdown-menu" 
              role="menu"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="user-dropdown-header">
                <p className="dropdown-name">{displayName}</p>
                <p className="dropdown-email">{currentUser.email}</p>
                <span className="provider-badge">
                  {provider === 'azure' ? (
                    <>
                      <FaMicrosoft /> Microsoft Entra ID
                    </>
                  ) : provider === 'github' ? (
                    <>
                      <FaGithub /> GitHub
                    </>
                  ) : provider === 'google' ? (
                    <>
                      <FaGoogle /> Google
                    </>
                  ) : (
                    <>
                      <FaUser /> Account
                    </>
                  )}
                </span>
              </div>

              <div className="dropdown-divider"></div>

              <button
                type="button"
                className="dropdown-item"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  setProgressModalOpen(true);
                }}
              >
                <FaChartLine />
                <span>My Progress & Stats</span>
              </button>

              {onNavigate && (
                <>
                  <div className="dropdown-divider"></div>
                  <button
                    type="button"
                    className="dropdown-item legal-dropdown-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(false);
                      onNavigate('privacy');
                    }}
                  >
                    <FaShieldAlt />
                    <span>Privacy Policy</span>
                  </button>
                  <button
                    type="button"
                    className="dropdown-item legal-dropdown-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(false);
                      onNavigate('terms');
                    }}
                  >
                    <FaFileContract />
                    <span>Terms of Service</span>
                  </button>
                </>
              )}

              <div className="dropdown-divider"></div>

              <button type="button" className="dropdown-item signout-btn" onClick={handleSignOut}>
                <FaSignOutAlt />
                <span>Sign Out</span>
              </button>
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
            aria-label="View learning stats"
          >
            <FaChartLine />
            <span className="btn-text">{chrome.myStats}</span>
          </button>

          <button
            type="button"
            className="header-action-btn signin-btn"
            onClick={() => setAuthModalOpen(true)}
            title="Sign in to sync progress"
            aria-label="Sign in to sync progress"
          >
            <FaSignInAlt />
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
