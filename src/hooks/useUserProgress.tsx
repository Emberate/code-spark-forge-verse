
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useUserProgress = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['userProgress', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const { data: progressData, error } = await supabase
        .from('user_progress')
        .select(`
          *,
          learning_paths (
            id,
            title,
            difficulty,
            total_problems,
            description,
            order_index
          )
        `)
        .eq('user_id', user.id)
        .order('learning_paths(order_index)');

      if (error) throw error;

      return progressData;
    },
    enabled: !!user,
  });
};

export const useUserProfile = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['userProfile', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useInitializeUserProgress = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['initializeProgress', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      // Get all learning paths
      const { data: learningPaths, error: pathsError } = await supabase
        .from('learning_paths')
        .select('*')
        .order('order_index');

      if (pathsError) throw pathsError;

      // Check existing progress
      const { data: existingProgress, error: progressError } = await supabase
        .from('user_progress')
        .select('learning_path_id')
        .eq('user_id', user.id);

      if (progressError) throw progressError;

      const existingPathIds = existingProgress.map(p => p.learning_path_id);
      const pathsToCreate = learningPaths.filter(path => !existingPathIds.includes(path.id));

      if (pathsToCreate.length > 0) {
        const progressEntries = pathsToCreate.map((path, index) => ({
          user_id: user.id,
          learning_path_id: path.id,
          status: index === 0 ? 'in-progress' : 'locked',
          completed_problems: 0,
          started_at: index === 0 ? new Date().toISOString() : null
        }));

        const { error: insertError } = await supabase
          .from('user_progress')
          .insert(progressEntries);

        if (insertError) throw insertError;
      }

      return true;
    },
    enabled: !!user,
  });
};
