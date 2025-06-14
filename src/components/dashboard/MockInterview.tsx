
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, Clock, Users, Star } from 'lucide-react';

export const MockInterview = () => {
  const interviewTypes = [
    {
      title: 'Technical Interview',
      description: 'Data structures, algorithms, and coding challenges',
      duration: '45-60 min',
      difficulty: 'Medium',
      participants: '1-on-1'
    },
    {
      title: 'System Design',
      description: 'Design scalable systems and architecture',
      duration: '60-90 min',
      difficulty: 'Hard',
      participants: 'Panel'
    },
    {
      title: 'Behavioral Interview',
      description: 'Leadership, teamwork, and communication skills',
      duration: '30-45 min',
      difficulty: 'Easy',
      participants: '1-on-1'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5" />
          Mock Interview Simulations
        </CardTitle>
        <CardDescription>
          Practice with AI-powered interview simulations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {interviewTypes.map((interview, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{interview.title}</h3>
                <Badge variant={interview.difficulty === 'Easy' ? 'secondary' : 
                              interview.difficulty === 'Medium' ? 'default' : 'destructive'}>
                  {interview.difficulty}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{interview.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {interview.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {interview.participants}
                </span>
              </div>
              <Button size="sm" className="w-full">
                Start Interview
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
