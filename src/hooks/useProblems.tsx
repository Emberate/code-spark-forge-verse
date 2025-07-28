
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useProblems = (learningPathId?: string) => {
  return useQuery({
    queryKey: ['problems', learningPathId],
    queryFn: async () => {
      if (!learningPathId) return [];

      const { data, error } = await supabase
        .from('problems')
        .select('*')
        .eq('learning_path_id', learningPathId)
        .order('created_at');

      if (error) throw error;
      return data;
    },
    enabled: !!learningPathId,
  });
};

export const useProblem = (problemId?: string) => {
  return useQuery({
    queryKey: ['problem', problemId],
    queryFn: async () => {
      if (!problemId) return null;

      const { data, error } = await supabase
        .from('problems')
        .select('*')
        .eq('id', problemId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!problemId,
  });
};
