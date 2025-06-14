
import React, { useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { LearningPath } from '@/components/dashboard/LearningPath';
import { AchievementBadges } from '@/components/dashboard/AchievementBadges';
import { TrendingProblems } from '@/components/dashboard/TrendingProblems';
import { Code, Trophy, Target, Zap, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile, useInitializeUserProgress } from '@/hooks/useUserProgress';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const { data: initialized } = useInitializeUserProgress();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || profileLoading || !user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Problems Solved',
      value: '0', // This will be calculated from user activities
      change: 'Just getting started!',
      icon: Code,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Current Streak',
      value: `${profile.current_streak} days`,
      change: profile.current_streak > 0 ? 'Keep it up!' : 'Start your streak!',
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Level',
      value: `Level ${profile.level}`,
      change: `${profile.points} points`,
      icon: Trophy,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Study Time',
      value: '0h',
      change: 'This month',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {profile.full_name || 'Student'}! 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            Ready to continue your coding journey? You're doing great!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <LearningPath />
            <TrendingProblems />
          </div>
          <div className="space-y-8">
            <AchievementBadges />
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
