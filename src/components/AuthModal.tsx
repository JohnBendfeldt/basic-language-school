import React, { useState } from 'react';
import { FaTimes, FaGoogle, FaMicrosoft, FaGithub, FaLock } from 'react-icons/fa';
import { signInWithGoogle, signInWithEntra, signInWithGithub, isSupabaseConfigured } from '../services/supabaseClient';
import { useLanguage } from '../contexts/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { baseLanguage } = useLanguage();
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'azure' | 'github' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const configured = isSupabaseConfigured();

  if (!isOpen) return null;

  const copy = (() => {
    switch (baseLanguage) {
      case 'ru':
        return {
          title: 'Синхронизация прогресса',
          subtitle: 'Выберите сервис, чтобы сохранить историю тестов, выученные слова и синхронизировать данные на всех устройствах.',
          guestLabel: 'Гостевой режим:',
          guestBody: 'Сейчас ваш прогресс сохранён локально в браузере. Для облачной синхронизации укажите ключи Supabase в ',
          connecting: 'Подключение к',
          privacy1: 'Мы уважаем вашу конфиденциальность.',
          privacy2: 'Без спама — только ваш прогресс обучения.'
        };
      case 'es':
        return {
          title: 'Sincroniza tu Progreso de Aprendizaje',
          subtitle: 'Elige un proveedor para guardar tu historial de cuestionarios, palabras dominadas y sincronizar en todos tus dispositivos.',
          guestLabel: 'Modo Invitado:',
          guestBody: 'Tu progreso se guarda actualmente en tu navegador. Para activar la sincronización en la nube, conecta Supabase en ',
          connecting: 'Conectando con',
          privacy1: 'Respetamos tu privacidad.',
          privacy2: 'Sin spam, solo tu progreso de aprendizaje.'
        };
      case 'fr':
        return {
          title: 'Synchronisez Votre Progression',
          subtitle: 'Choisissez un fournisseur pour sauvegarder votre historique de quiz, vos mots maîtrisés et synchroniser sur tous vos appareils.',
          guestLabel: 'Mode Invité :',
          guestBody: 'Votre progression est enregistrée dans votre navigateur. Pour activer le cloud, configurez Supabase dans ',
          connecting: 'Connexion à',
          privacy1: 'Nous respectons votre vie privée.',
          privacy2: 'Pas de spam, uniquement votre progression linguistique.'
        };
      case 'en':
      default:
        return {
          title: 'Sync Your Learning Progress',
          subtitle: 'Choose a provider to save your quiz history, track words mastered, and sync across all your devices.',
          guestLabel: 'Running in Guest Mode:',
          guestBody: 'Your progress is currently saved offline in your browser. To enable live cloud sync, connect your Supabase project credentials in ',
          connecting: 'Connecting to',
          privacy1: 'We respect your privacy.',
          privacy2: 'No spam, only your language learning progress.'
        };
    }
  })();

  const handleGoogleLogin = async () => {
    setLoadingProvider('google');
    setErrorMessage(null);
    try {
      const { error } = await signInWithGoogle();
      if (error) setErrorMessage(error.message);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to initialize Google login');
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleGithubLogin = async () => {
    setLoadingProvider('github');
    setErrorMessage(null);
    try {
      const { error } = await signInWithGithub();
      if (error) setErrorMessage(error.message);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to initialize GitHub login');
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleEntraLogin = async () => {
    setLoadingProvider('azure');
    setErrorMessage(null);
    try {
      const { error } = await signInWithEntra();
      if (error) setErrorMessage(error.message);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to initialize Microsoft login');
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="auth-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="auth-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose} aria-label="Close modal">
          <FaTimes />
        </button>

        <div className="auth-modal-header">
          <div className="auth-modal-icon">
            <FaLock />
          </div>
          <h2>{copy.title}</h2>
          <p>
            {copy.subtitle}
          </p>
        </div>

        {errorMessage && (
          <div className="auth-modal-alert auth-modal-error">
            {errorMessage}
          </div>
        )}

        {!configured && (
          <div className="auth-modal-alert auth-modal-info">
            <strong>{copy.guestLabel}</strong> {copy.guestBody}<code>.env.local</code>.
          </div>
        )}

        <div className="auth-providers-grid">
          {/* Google */}
          <button
            className={`auth-tile-btn google-tile ${loadingProvider === 'google' ? 'loading' : ''}`}
            onClick={handleGoogleLogin}
            disabled={loadingProvider !== null}
            title="Sign in with Google (Gmail)"
            aria-label="Sign in with Google"
          >
            <div className="auth-tile-icon-wrap google">
              <FaGoogle className="tile-icon" />
            </div>
            <div className="auth-tile-text">
              <span className="tile-name">Google</span>
              <span className="tile-subtext">Gmail</span>
            </div>
          </button>

          {/* GitHub */}
          <button
            className={`auth-tile-btn github-tile ${loadingProvider === 'github' ? 'loading' : ''}`}
            onClick={handleGithubLogin}
            disabled={loadingProvider !== null}
            title="Sign in with GitHub"
            aria-label="Sign in with GitHub"
          >
            <div className="auth-tile-icon-wrap github">
              <FaGithub className="tile-icon" />
            </div>
            <div className="auth-tile-text">
              <span className="tile-name">GitHub</span>
              <span className="tile-subtext">1-Click</span>
            </div>
          </button>

          {/* Microsoft */}
          <button
            className={`auth-tile-btn entra-tile ${loadingProvider === 'azure' ? 'loading' : ''}`}
            onClick={handleEntraLogin}
            disabled={loadingProvider !== null}
            title="Sign in with Microsoft Entra ID"
            aria-label="Sign in with Microsoft Entra ID"
          >
            <div className="auth-tile-icon-wrap entra">
              <FaMicrosoft className="tile-icon" />
            </div>
            <div className="auth-tile-text">
              <span className="tile-name">Microsoft</span>
              <span className="tile-subtext">Entra ID</span>
            </div>
          </button>
        </div>

        {loadingProvider && (
          <div className="auth-loading-notice">
            {copy.connecting} {loadingProvider === 'azure' ? 'Microsoft' : loadingProvider === 'github' ? 'GitHub' : 'Google'}...
          </div>
        )}

        <div className="auth-modal-footer">
          <p>{copy.privacy1}</p>
          <p>{copy.privacy2}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
