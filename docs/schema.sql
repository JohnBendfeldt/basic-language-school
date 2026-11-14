-- ==============================================================================
-- BASIC LANGUAGE SCHOOL: SUPABASE POSTGRESQL SCHEMA WITH ROW LEVEL SECURITY (RLS)
-- Platform: basiclanguage.school
-- ==============================================================================
-- Copy and paste this script into your Supabase Dashboard:
-- Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Profiles Table with Active Language
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT CHECK (email IS NULL OR char_length(email) <= 320),
  display_name TEXT CHECK (display_name IS NULL OR char_length(display_name) <= 200),
  avatar_url TEXT CHECK (avatar_url IS NULL OR (char_length(avatar_url) <= 2048 AND avatar_url LIKE 'https://%')),
  active_language VARCHAR(10) NOT NULL DEFAULT 'en' CHECK (char_length(active_language) BETWEEN 2 AND 10),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Quiz Sessions Table with Multi-Language Tagging
CREATE TABLE IF NOT EXISTS public.quiz_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  language_id VARCHAR(10) NOT NULL DEFAULT 'en' CHECK (char_length(language_id) BETWEEN 2 AND 10),
  category VARCHAR(50) NOT NULL CHECK (char_length(category) BETWEEN 1 AND 50), -- 'alphabet', 'numbers', 'basicPhrases', 'commonWords', 'mixed', etc.
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= total_questions),
  total_questions INTEGER NOT NULL CHECK (total_questions > 0 AND total_questions <= 500),
  percentage NUMERIC(5,2) GENERATED ALWAYS AS (
    CASE 
      WHEN total_questions > 0 THEN ROUND((score::numeric / total_questions) * 100, 2)
      ELSE 0
    END
  ) STORED,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for fast multi-language query resolution
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_user_lang ON public.quiz_sessions(user_id, language_id, completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_completed_at ON public.quiz_sessions(completed_at DESC);

-- 3. Spaced-Repetition Word Progress Table
CREATE TABLE IF NOT EXISTS public.word_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  language_id VARCHAR(10) NOT NULL DEFAULT 'en' CHECK (char_length(language_id) BETWEEN 2 AND 10),
  category VARCHAR(50) NOT NULL CHECK (char_length(category) BETWEEN 1 AND 50),
  word_id VARCHAR(150) NOT NULL CHECK (char_length(word_id) BETWEEN 1 AND 150),
  prompt TEXT NOT NULL CHECK (char_length(prompt) <= 500),
  answer TEXT NOT NULL CHECK (char_length(answer) <= 500),
  target TEXT CHECK (target IS NULL OR char_length(target) <= 500),
  times_correct INTEGER NOT NULL DEFAULT 0 CHECK (times_correct >= 0),
  times_incorrect INTEGER NOT NULL DEFAULT 0 CHECK (times_incorrect >= 0),
  last_tested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  mastery_level INTEGER NOT NULL DEFAULT 0 CHECK (mastery_level BETWEEN 0 AND 5), -- 0 (learning) to 5 (mastered)
  CONSTRAINT unique_user_lang_word UNIQUE (user_id, language_id, word_id)
);

-- Idempotent migration for pre-existing installations consolidating into the shared database
ALTER TABLE public.quiz_sessions ADD COLUMN IF NOT EXISTS language_id VARCHAR(10) NOT NULL DEFAULT 'en' CHECK (char_length(language_id) BETWEEN 2 AND 10);
ALTER TABLE public.word_progress ADD COLUMN IF NOT EXISTS language_id VARCHAR(10) NOT NULL DEFAULT 'en' CHECK (char_length(language_id) BETWEEN 2 AND 10);
ALTER TABLE public.word_progress ADD COLUMN IF NOT EXISTS target TEXT;
ALTER TABLE public.word_progress DROP CONSTRAINT IF EXISTS unique_user_word;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'unique_user_lang_word'
  ) THEN
    ALTER TABLE public.word_progress
      ADD CONSTRAINT unique_user_lang_word UNIQUE (user_id, language_id, word_id);
  END IF;
END $$;

-- Index for fast lookup by user, language, and category/mastery
CREATE INDEX IF NOT EXISTS idx_word_progress_user_lang ON public.word_progress(user_id, language_id, mastery_level);

-- ==============================================================================
-- 4. PRIVILEGE HARDENING & ROW LEVEL SECURITY (RLS)
-- Unauthenticated (anon) requests have zero table access; authenticated users
-- can strictly ONLY read, insert, update, and delete their OWN rows.
-- ==============================================================================

REVOKE ALL ON public.profiles FROM anon;
REVOKE ALL ON public.quiz_sessions FROM anon;
REVOKE ALL ON public.word_progress FROM anon;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT SELECT, INSERT, DELETE ON public.quiz_sessions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.word_progress TO authenticated;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.word_progress ENABLE ROW LEVEL SECURITY;

-- Drop legacy catch-all policies if re-running
DROP POLICY IF EXISTS "Users can manage own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can manage own quiz sessions" ON public.quiz_sessions;
DROP POLICY IF EXISTS "Users can manage own word progress" ON public.word_progress;

-- Policies for profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can delete their own profile" ON public.profiles;
CREATE POLICY "Users can delete their own profile"
  ON public.profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

-- Policies for quiz_sessions
DROP POLICY IF EXISTS "Users can view their own quiz sessions" ON public.quiz_sessions;
CREATE POLICY "Users can view their own quiz sessions"
  ON public.quiz_sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own quiz sessions" ON public.quiz_sessions;
CREATE POLICY "Users can insert their own quiz sessions"
  ON public.quiz_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own quiz sessions" ON public.quiz_sessions;
CREATE POLICY "Users can delete their own quiz sessions"
  ON public.quiz_sessions
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for word_progress
DROP POLICY IF EXISTS "Users can view their own word progress" ON public.word_progress;
CREATE POLICY "Users can view their own word progress"
  ON public.word_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own word progress" ON public.word_progress;
CREATE POLICY "Users can insert their own word progress"
  ON public.word_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own word progress" ON public.word_progress;
CREATE POLICY "Users can update their own word progress"
  ON public.word_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own word progress" ON public.word_progress;
CREATE POLICY "Users can delete their own word progress"
  ON public.word_progress
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
