
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface ProblemStatus {
  solved: boolean;
  attempted: boolean;
  lastAttempt?: Date;
  bestTime?: number;
}

export const useProblemProgress = () => {
  const { user } = useAuth();
  const [problemStatuses, setProblemStatuses] = useState<Record<string, ProblemStatus>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProgressFromDatabase = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const { data: activities, error: dbError } = await supabase
        .from('user_activities')
        .select('*')
        .eq('user_id', user.id);

      if (dbError) {
        console.error('Database error:', dbError);
        setError('Failed to load progress from database');
        return;
      }

      if (activities) {
        const statusMap: Record<string, ProblemStatus> = {};
        activities.forEach(activity => {
          const problemId = activity.problem_id;
          if (!statusMap[problemId]) {
            statusMap[problemId] = { solved: false, attempted: false };
          }
          
          if (activity.activity_type === 'solved') {
            statusMap[problemId].solved = true;
          } else if (activity.activity_type === 'attempted') {
            statusMap[problemId].attempted = true;
          }
          
          statusMap[problemId].lastAttempt = new Date(activity.created_at);
        });
        
        setProblemStatuses(statusMap);
      }
    } catch (error) {
      console.error('Error loading progress from database:', error);
      setError('Unexpected error occurred while loading progress');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      setProblemStatuses({});
      return;
    }

    // Load problem progress from localStorage as fallback
    const savedProgress = localStorage.getItem(`problem-progress-${user.id}`);
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setProblemStatuses(parsed);
      } catch (error) {
        console.error('Error parsing saved progress:', error);
        localStorage.removeItem(`problem-progress-${user.id}`);
      }
    }

    // Load from database
    loadProgressFromDatabase();
  }, [user, loadProgressFromDatabase]);

  const updateProblemStatus = useCallback(async (problemId: string, status: Partial<ProblemStatus>) => {
    if (!user) {
      console.warn('Cannot update problem status: user not authenticated');
      return;
    }

    const newStatus = {
      ...problemStatuses[problemId],
      ...status,
      lastAttempt: new Date()
    };

    const updatedStatuses = {
      ...problemStatuses,
      [problemId]: newStatus
    };

    setProblemStatuses(updatedStatuses);
    
    // Save to localStorage
    try {
      localStorage.setItem(`problem-progress-${user.id}`, JSON.stringify(updatedStatuses));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }

    // Save to database
    try {
      const activityType = status.solved ? 'solved' : 'attempted';
      const { error: dbError } = await supabase
        .from('user_activities')
        .insert({
          user_id: user.id,
          problem_id: problemId,
          activity_type: activityType
        });

      if (dbError) {
        console.error('Error saving progress to database:', dbError);
        setError('Failed to save progress to database');
      }
    } catch (error) {
      console.error('Error saving progress to database:', error);
      setError('Unexpected error occurred while saving progress');
    }
  }, [user, problemStatuses]);

  const getProblemStatus = useCallback((problemId: string): ProblemStatus => {
    return problemStatuses[problemId] || { solved: false, attempted: false };
  }, [problemStatuses]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    getProblemStatus,
    updateProblemStatus,
    problemStatuses,
    isLoading,
    error,
    clearError
  };
};
