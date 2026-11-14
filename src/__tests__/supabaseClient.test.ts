import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const GOOGLE_CLIENT_ID = '905048514453-nvuv8q589bhkv121o1lugquu19u2dgsc.apps.googleusercontent.com';

const makeAuthMock = () => ({
  signInWithOAuth: vi.fn().mockResolvedValue({ error: null }),
  signInWithIdToken: vi.fn().mockResolvedValue({ error: null }),
  signOut: vi.fn().mockResolvedValue({ error: null }),
  getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'u1', email: 'a@b.c' } } }),
});

const loadModule = async (
  env: { url?: string; key?: string; googleClientId?: string },
  auth = makeAuthMock()
) => {
  vi.resetModules();
  vi.stubEnv('VITE_SUPABASE_URL', env.url ?? '');
  vi.stubEnv('VITE_SUPABASE_ANON_KEY', env.key ?? '');
  if (env.googleClientId !== undefined) {
    vi.stubEnv('VITE_GOOGLE_CLIENT_ID', env.googleClientId);
  }
  const createClient = vi.fn().mockReturnValue({ auth });
  vi.doMock('@supabase/supabase-js', () => ({ createClient }));
  const mod = await import('../services/supabaseClient');
  return { mod, auth, createClient };
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.doUnmock('@supabase/supabase-js');
  vi.resetModules();
});

describe('supabaseClient - not configured (guest mode)', () => {
  it('reports unconfigured and exports a null client when env vars are missing', async () => {
    const { mod, createClient } = await loadModule({});
    expect(mod.isSupabaseConfigured()).toBe(false);
    expect(mod.supabase).toBeNull();
    expect(createClient).not.toHaveBeenCalled();
  });

  it('treats a URL that is not https as unconfigured', async () => {
    const { mod } = await loadModule({ url: 'http://insecure.example.com', key: 'anon' });
    expect(mod.isSupabaseConfigured()).toBe(false);
    expect(mod.supabase).toBeNull();
  });

  it('treats a missing anon key as unconfigured', async () => {
    const { mod } = await loadModule({ url: 'https://x.supabase.co', key: '' });
    expect(mod.isSupabaseConfigured()).toBe(false);
  });

  it('treats a missing URL as unconfigured', async () => {
    const { mod } = await loadModule({ url: '', key: 'anon' });
    expect(mod.isSupabaseConfigured()).toBe(false);
  });

  it('rejects .env.example placeholder URL and anon key values', async () => {
    const placeholderUrl = await loadModule({ url: 'https://your-project-id.supabase.co', key: 'real-key' });
    expect(placeholderUrl.mod.isSupabaseConfigured()).toBe(false);

    const placeholderKey = await loadModule({ url: 'https://abc.supabase.co', key: 'your-anon-public-key' });
    expect(placeholderKey.mod.isSupabaseConfigured()).toBe(false);
  });

  it.each(['signInWithGoogle', 'signInWithEntra', 'signInWithGithub'] as const)(
    '%s returns a friendly guest-mode error instead of throwing',
    async (fn) => {
      const { mod } = await loadModule({});
      const result = await mod[fn]();
      expect(result.error).toBeInstanceOf(Error);
      expect(result.error?.message).toMatch(/Guest Mode/i);
    }
  );

  it('signOutUser succeeds quietly and getCurrentUser returns null', async () => {
    const { mod } = await loadModule({});
    expect(await mod.signOutUser()).toEqual({ error: null });
    expect(await mod.getCurrentUser()).toBeNull();
  });
});

describe('supabaseClient - configured', () => {
  const env = { url: 'https://abc.supabase.co', key: 'anon-key' };
  let assignMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    sessionStorage.clear();
    assignMock = vi.fn();
    Object.defineProperty(window, 'location', {
      value: {
        ...window.location,
        origin: 'https://basiclanguage.school',
        pathname: '/',
        search: '',
        hash: '',
        assign: assignMock,
      },
      writable: true,
    });
  });

  it('creates the client with persistent, auto-refreshing sessions', async () => {
    const { mod, createClient } = await loadModule(env);
    expect(mod.isSupabaseConfigured()).toBe(true);
    expect(mod.supabase).not.toBeNull();
    expect(createClient).toHaveBeenCalledWith('https://abc.supabase.co', 'anon-key', {
      auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true },
    });
  });

  it('signs in directly with Google OIDC using the site origin and exchanges hash id_token with Supabase', async () => {
    const { mod, auth } = await loadModule(env);
    const result = await mod.signInWithGoogle();
    expect(result.error).toBeNull();
    expect(auth.signInWithOAuth).not.toHaveBeenCalled();
    expect(assignMock).toHaveBeenCalledTimes(1);

    const authUrl = new URL(assignMock.mock.calls[0][0]);
    expect(`${authUrl.origin}${authUrl.pathname}`).toBe('https://accounts.google.com/o/oauth2/v2/auth');
    expect(authUrl.searchParams.get('client_id')).toBe(GOOGLE_CLIENT_ID);
    expect(authUrl.searchParams.get('redirect_uri')).toBe('https://basiclanguage.school');
    expect(authUrl.searchParams.get('response_type')).toBe('id_token');
    expect(authUrl.searchParams.get('scope')).toBe('openid email profile');
    expect(authUrl.searchParams.get('nonce')).toMatch(/^[a-f0-9]{64}$/);
    const storedNonce = sessionStorage.getItem(mod.GOOGLE_NONCE_STORAGE_KEY);
    expect(storedNonce).toBeTruthy();

    const replaceStateSpy = vi.spyOn(window.history, 'replaceState').mockImplementation(() => {});
    window.location.hash = '#id_token=google.jwt.token&authuser=0';
    await mod.consumeGoogleIdTokenFromHash();

    expect(auth.signInWithIdToken).toHaveBeenCalledWith({
      provider: 'google',
      token: 'google.jwt.token',
      nonce: storedNonce,
    });
    expect(sessionStorage.getItem(mod.GOOGLE_NONCE_STORAGE_KEY)).toBeNull();
    expect(replaceStateSpy).toHaveBeenCalledTimes(1);
    replaceStateSpy.mockRestore();
  });

  it('falls back to Supabase OAuth for Google when VITE_GOOGLE_CLIENT_ID is empty', async () => {
    const { mod, auth } = await loadModule({ ...env, googleClientId: '' });
    const result = await mod.signInWithGoogle();
    expect(result.error).toBeNull();
    expect(assignMock).not.toHaveBeenCalled();
    expect(auth.signInWithOAuth).toHaveBeenCalledWith({
      provider: 'google',
      options: { redirectTo: 'https://basiclanguage.school' },
    });
  });

  it('signs in with GitHub and redirects back to the site origin', async () => {
    const { mod, auth } = await loadModule(env);
    await mod.signInWithGithub();
    expect(auth.signInWithOAuth).toHaveBeenCalledWith({
      provider: 'github',
      options: { redirectTo: 'https://basiclanguage.school' },
    });
  });

  it('signs in with Microsoft Entra requesting email, profile and openid scopes', async () => {
    const { mod, auth } = await loadModule(env);
    await mod.signInWithEntra();
    expect(auth.signInWithOAuth).toHaveBeenCalledWith({
      provider: 'azure',
      options: { redirectTo: 'https://basiclanguage.school', scopes: 'email profile openid' },
    });
  });

  it('passes OAuth errors back to the caller', async () => {
    const auth = makeAuthMock();
    const boom = new Error('provider disabled');
    auth.signInWithOAuth.mockResolvedValue({ error: boom });
    const { mod } = await loadModule({ ...env, googleClientId: '' }, auth);
    expect((await mod.signInWithGoogle()).error).toBe(boom);
    expect((await mod.signInWithGithub()).error).toBe(boom);
    expect((await mod.signInWithEntra()).error).toBe(boom);
  });

  it('signs out through the client and surfaces its error', async () => {
    const auth = makeAuthMock();
    const { mod } = await loadModule(env, auth);
    expect(await mod.signOutUser()).toEqual({ error: null });
    expect(auth.signOut).toHaveBeenCalledTimes(1);

    const failure = new Error('network');
    auth.signOut.mockResolvedValue({ error: failure });
    expect((await mod.signOutUser()).error).toBe(failure);
  });

  it('returns the current user from the session', async () => {
    const { mod } = await loadModule(env);
    expect(await mod.getCurrentUser()).toEqual({ id: 'u1', email: 'a@b.c' });
  });

  it('returns null when nobody is signed in', async () => {
    const auth = makeAuthMock();
    auth.getUser.mockResolvedValue({ data: { user: null } });
    const { mod } = await loadModule(env, auth);
    expect(await mod.getCurrentUser()).toBeNull();
  });
});
