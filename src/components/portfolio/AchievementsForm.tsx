import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Trophy, Plus, Trash2, Calendar, Award } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  organization?: string;
  certificateUrl?: string;
  type: 'certification' | 'award' | 'competition' | 'course' | 'other';
}

const achievementTypes = [
  { value: 'certification', label: 'Certification' },
  { value: 'award', label: 'Award' },
  { value: 'competition', label: 'Competition' },
  { value: 'course', label: 'Course Completion' },
  { value: 'other', label: 'Other' }
];

export const AchievementsForm = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'AWS Certified Developer',
      description: 'Achieved AWS Certified Developer Associate certification',
      date: '2024-01-15',
      organization: 'Amazon Web Services',
      type: 'certification'
    },
    {
      id: '2',
      title: 'Hackathon Winner',
      description: 'First place in University Tech Hackathon 2023',
      date: '2023-11-20',
      organization: 'University Tech Club',
      type: 'competition'
    }
  ]);

  const [newAchievement, setNewAchievement] = useState<Omit<Achievement, 'id'>>({
    title: '',
    description: '',
    date: '',
    organization: '',
    certificateUrl: '',
    type: 'certification'
  });

  const addAchievement = () => {
    if (newAchievement.title && newAchievement.description && newAchievement.date) {
      const achievement: Achievement = {
        ...newAchievement,
        id: Date.now().toString()
      };
      setAchievements(prev => [...prev, achievement]);
      setNewAchievement({
        title: '',
        description: '',
        date: '',
        organization: '',
        certificateUrl: '',
        type: 'certification'
      });
    }
  };

  const removeAchievement = (id: string) => {
    setAchievements(prev => prev.filter(a => a.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'certification':
        return <Award className="h-4 w-4" />;
      case 'award':
        return <Trophy className="h-4 w-4" />;
      case 'competition':
        return <Trophy className="h-4 w-4" />;
      default:
        return <Award className="h-4 w-4" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'certification':
        return 'bg-blue-100 text-blue-800';
      case 'award':
        return 'bg-yellow-100 text-yellow-800';
      case 'competition':
        return 'bg-purple-100 text-purple-800';
      case 'course':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Achievements & Certifications</h2>
      </div>

      {/* Existing Achievements */}
      <div className="space-y-4">
        {achievements.map((achievement) => (
          <Card key={achievement.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getTypeIcon(achievement.type)}
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                    <Badge className={getTypeBadgeColor(achievement.type)}>
                      {achievementTypes.find(t => t.value === achievement.type)?.label}
                    </Badge>
                  </div>
                  <CardDescription className="mb-2">{achievement.description}</CardDescription>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(achievement.date)}
                    </div>
                    {achievement.organization && (
                      <span>• {achievement.organization}</span>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAchievement(achievement.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            {achievement.certificateUrl && (
              <CardContent>
                <a
                  href={achievement.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  View Certificate →
                </a>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Add New Achievement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Achievement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="achievementTitle">Title</Label>
              <Input
                id="achievementTitle"
                value={newAchievement.title}
                onChange={(e) => setNewAchievement(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., AWS Certified Developer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="achievementType">Type</Label>
              <select
                id="achievementType"
                value={newAchievement.type}
                onChange={(e) => setNewAchievement(prev => ({ ...prev, type: e.target.value as Achievement['type'] }))}
                className="w-full px-3 py-2 border rounded-md"
              >
                {achievementTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="achievementDescription">Description</Label>
            <Textarea
              id="achievementDescription"
              value={newAchievement.description}
              onChange={(e) => setNewAchievement(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your achievement..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="achievementDate">Date</Label>
              <Input
                id="achievementDate"
                type="date"
                value={newAchievement.date}
                onChange={(e) => setNewAchievement(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="achievementOrg">Organization (Optional)</Label>
              <Input
                id="achievementOrg"
                value={newAchievement.organization}
                onChange={(e) => setNewAchievement(prev => ({ ...prev, organization: e.target.value }))}
                placeholder="e.g., Amazon Web Services"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="certificateUrl">Certificate URL (Optional)</Label>
            <Input
              id="certificateUrl"
              value={newAchievement.certificateUrl}
              onChange={(e) => setNewAchievement(prev => ({ ...prev, certificateUrl: e.target.value }))}
              placeholder="https://certificate-url.com"
            />
          </div>

          <Button onClick={addAchievement} className="w-full">
            Add Achievement
          </Button>
        </CardContent>
      </Card>

      <Button className="w-full">Save Achievements</Button>
    </div>
  );
};
