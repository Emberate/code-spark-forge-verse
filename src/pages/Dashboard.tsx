
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { LearningPath } from '@/components/dashboard/LearningPath';
import { AchievementBadges } from '@/components/dashboard/AchievementBadges';
import { TrendingProblems } from '@/components/dashboard/TrendingProblems';
import { Code, Trophy, Target, Zap, Clock, Star } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      window.location.href = '/login';
    }
  }, []);

  if (!user) return null;

  const stats = [
    {
      title: 'Problems Solved',
      value: '142',
      change: '+12 this week',
      icon: Code,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Current Streak',
      value: '15 days',
      change: 'Personal best!',
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Ranking',
      value: '#2,847',
      change: '+156 this month',
      icon: Trophy,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Study Time',
      value: '48h',
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
          <h1 className="text-3xl font-bold">Welcome back, {user.name}! 👋</h1>
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
