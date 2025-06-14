
-- Create a profiles table to store additional user information
CREATE TABLE public.profiles (
  id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  full_name text,
  email text,
  level integer DEFAULT 1,
  points integer DEFAULT 0,
  current_streak integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id)
);

-- Create learning paths table
CREATE TABLE public.learning_paths (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  total_problems integer NOT NULL DEFAULT 0,
  description text,
  order_index integer NOT NULL,
  prerequisites uuid[] DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id)
);

-- Create user progress table to track individual progress
CREATE TABLE public.user_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  learning_path_id uuid NOT NULL REFERENCES public.learning_paths ON DELETE CASCADE,
  completed_problems integer DEFAULT 0,
  status text DEFAULT 'locked' CHECK (status IN ('locked', 'in-progress', 'completed')),
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id),
  UNIQUE(user_id, learning_path_id)
);

-- Create problems table
CREATE TABLE public.problems (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  learning_path_id uuid NOT NULL REFERENCES public.learning_paths ON DELETE CASCADE,
  title text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  description text,
  solution text,
  tags text[] DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id)
);

-- Create user activities table for tracking recent activities
CREATE TABLE public.user_activities (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  problem_id uuid NOT NULL REFERENCES public.problems ON DELETE CASCADE,
  activity_type text NOT NULL CHECK (activity_type IN ('solved', 'attempted')),
  created_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problems ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for user_progress
CREATE POLICY "Users can view their own progress" ON public.user_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON public.user_progress
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own progress" ON public.user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for user_activities
CREATE POLICY "Users can view their own activities" ON public.user_activities
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own activities" ON public.user_activities
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Learning paths and problems are public for reading
CREATE POLICY "Anyone can view learning paths" ON public.learning_paths
  FOR SELECT USING (true);
CREATE POLICY "Anyone can view problems" ON public.problems
  FOR SELECT USING (true);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email
  );
  RETURN new;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert default learning paths
INSERT INTO public.learning_paths (title, difficulty, total_problems, description, order_index) VALUES
('Arrays & Strings', 'Easy', 20, 'Master the fundamentals of arrays and string manipulation', 1),
('Linked Lists', 'Medium', 12, 'Understand pointer-based data structures', 2),
('Trees & Graphs', 'Hard', 15, 'Explore hierarchical and graph data structures', 3),
('Dynamic Programming', 'Hard', 18, 'Master optimization and memoization techniques', 4);
