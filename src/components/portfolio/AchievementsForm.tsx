
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Plus, Calendar, Award, Trash2 } from 'lucide-react';

export const AchievementsForm = () => {
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: 'Hackathon Winner',
      description: 'First place in XYZ Hackathon 2024',
      date: '2024-01-15',
      type: 'Competition'
    },
    {
      id: 2,
      title: 'AWS Certified Developer',
      description: 'Associate level certification',
      date: '2023-12-10',
      type: 'Certification'
    }
  ]);

  const addAchievement = () => {
    const newAchievement = {
      id: Date.now(),
      title: '',
      description: '',
      date: '',
      type: 'Achievement'
    };
    setAchievements([...achievements, newAchievement]);
  };

  const removeAchievement = (id: number) => {
    setAchievements(achievements.filter(a => a.id !== id));
  };

  const achievementTypes = ['Achievement', 'Certification', 'Competition', 'Award', 'Publication'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Achievements & Certifications</h2>
        </div>
        <Button onClick={addAchievement} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Achievement
        </Button>
      </div>

      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <Card key={achievement.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Achievement {index + 1}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAchievement(achievement.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`title-${achievement.id}`}>Title</Label>
                <Input
                  id={`title-${achievement.id}`}
                  defaultValue={achievement.title}
                  placeholder="Achievement title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`description-${achievement.id}`}>Description</Label>
                <Input
                  id={`description-${achievement.id}`}
                  defaultValue={achievement.description}
                  placeholder="Brief description of the achievement"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`date-${achievement.id}`}>Date</Label>
                  <Input
                    id={`date-${achievement.id}`}
                    type="date"
                    defaultValue={achievement.date}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`type-${achievement.id}`}>Type</Label>
                  <select
                    id={`type-${achievement.id}`}
                    defaultValue={achievement.type}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {achievementTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <Badge variant="outline" className="w-fit">
                {achievement.type}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button className="w-full">Save Achievements</Button>
    </div>
  );
};
