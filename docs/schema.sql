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
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  active_language VARCHAR(10) NOT NULL DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Quiz Sessions Table with Multi-Language Tagging
CREATE TABLE IF NOT EXISTS public.quiz_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  language_id VARCHAR(10) NOT NULL DEFAULT 'en',
  category VARCHAR(50) NOT NULL, -- 'alphabet', 'numbers', 'basicPhrases', 'commonWords', 'mixed'
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  percentage NUMERIC(5,2) GENERATED ALWAYS AS (
    CASE 
      WHEN total_questions > 0 THEN ROUND((score::numeric / total_questions) * 100, 2)
      ELSE 0
    END
  ) STORED,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast multi-language query resolution
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_user_lang ON public.quiz_sessions(user_id, language_id, completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_completed_at ON public.quiz_sessions(completed_at DESC);

-- 3. Spaced-Repetition Word Progress Table
CREATE TABLE IF NOT EXISTS public.word_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  language_id VARCHAR(10) NOT NULL DEFAULT 'en',
  category VARCHAR(50) NOT NULL,
  word_id VARCHAR(150) NOT NULL,
  prompt TEXT NOT NULL,
  answer TEXT NOT NULL,
  times_correct INTEGER NOT NULL DEFAULT 0,
  times_incorrect INTEGER NOT NULL DEFAULT 0,
  last_tested_at TIMESTAMPTZ DEFAULT NOW(),
  mastery_level INTEGER NOT NULL DEFAULT 0, -- 0 (learning) to 5 (mastered)
  CONSTRAINT unique_user_lang_word UNIQUE (user_id, language_id, word_id)
);

-- Index for fast lookup by user, language, and category/mastery
CREATE INDEX IF NOT EXISTS idx_word_progress_user_lang ON public.word_progress(user_id, language_id, mastery_level);

-- ==============================================================================
-- 4. ENABLE ROW LEVEL SECURITY (RLS)
-- Users can strictly ONLY read, insert, update, and delete their OWN rows!
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.word_progress ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Users can manage own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can manage own quiz sessions" ON public.quiz_sessions;
DROP POLICY IF EXISTS "Users can manage own word progress" ON public.word_progress;

-- Policies for profiles
CREATE POLICY "Users can manage own profile"
  ON public.profiles
  FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policies for quiz_sessions
CREATE POLICY "Users can manage own quiz sessions"
  ON public.quiz_sessions
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for word_progress
CREATE POLICY "Users can manage own word progress"
  ON public.word_progress
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
