import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const makeAuthMock = () => ({
  signInWithOAuth: vi.fn().mockResolvedValue({ error: null }),
  signOut: vi.fn().mockResolvedValue({ error: null }),
  getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'u1', email: 'a@b.c' } } }),
});

const loadModule = async (env: { url?: string; key?: string }, auth = makeAuthMock()) => {
  vi.resetModules();
  vi.stubEnv('VITE_SUPABASE_URL', env.url ?? '');
  vi.stubEnv('VITE_SUPABASE_ANON_KEY', env.key ?? '');
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

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: { ...window.location, origin: 'https://basiclanguage.school' },
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

  it('signs in with Google and redirects back to the site origin', async () => {
    const { mod, auth } = await loadModule(env);
    const result = await mod.signInWithGoogle();
    expect(result.error).toBeNull();
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
    const { mod } = await loadModule(env, auth);
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
