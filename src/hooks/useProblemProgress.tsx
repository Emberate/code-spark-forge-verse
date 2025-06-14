
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (!user) return;

    // Load problem progress from localStorage as fallback
    const savedProgress = localStorage.getItem(`problem-progress-${user.id}`);
    if (savedProgress) {
      setProblemStatuses(JSON.parse(savedProgress));
    }

    // Load from database if available
    loadProgressFromDatabase();
  }, [user]);

  const loadProgressFromDatabase = async () => {
    if (!user) return;

    try {
      const { data: activities } = await supabase
        .from('user_activities')
        .select('*')
        .eq('user_id', user.id);

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
    }
  };

  const updateProblemStatus = async (problemId: string, status: Partial<ProblemStatus>) => {
    if (!user) return;

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
    localStorage.setItem(`problem-progress-${user.id}`, JSON.stringify(updatedStatuses));

    // Save to database
    try {
      const activityType = status.solved ? 'solved' : 'attempted';
      await supabase
        .from('user_activities')
        .insert({
          user_id: user.id,
          problem_id: problemId,
          activity_type: activityType
        });
    } catch (error) {
      console.error('Error saving progress to database:', error);
    }
  };

  const getProblemStatus = (problemId: string): ProblemStatus => {
    return problemStatuses[problemId] || { solved: false, attempted: false };
  };

  return {
    getProblemStatus,
    updateProblemStatus,
    problemStatuses
  };
};
