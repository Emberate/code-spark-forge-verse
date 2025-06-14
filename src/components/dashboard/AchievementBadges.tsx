
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Flame, Target, Star, Award, Zap } from 'lucide-react';

export const AchievementBadges = () => {
  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Solved your first problem',
      icon: Target,
      earned: true,
      rarity: 'common'
    },
    {
      id: 2,
      title: 'Streak Master',
      description: '7-day solving streak',
      icon: Flame,
      earned: true,
      rarity: 'rare'
    },
    {
      id: 3,
      title: 'Speed Demon',
      description: 'Solved 10 problems in one day',
      icon: Zap,
      earned: true,
      rarity: 'epic'
    },
    {
      id: 4,
      title: 'Array Ninja',
      description: 'Master of array problems',
      icon: Award,
      earned: false,
      rarity: 'legendary'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      case 'legendary': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-600" />
          Achievements
        </CardTitle>
        <CardDescription>
          Your coding milestones
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`flex items-center space-x-3 p-3 rounded-lg border ${
                achievement.earned ? 'bg-background' : 'bg-muted/50 opacity-60'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                achievement.earned ? 'bg-primary/10' : 'bg-muted'
              }`}>
                <achievement.icon className={`h-4 w-4 ${
                  achievement.earned ? 'text-primary' : 'text-muted-foreground'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium">{achievement.title}</h4>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>
              <Badge className={getRarityColor(achievement.rarity)}>
                {achievement.rarity}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
