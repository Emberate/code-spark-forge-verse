
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, Lock } from 'lucide-react';

export const LearningPath = () => {
  const paths = [
    {
      id: 1,
      title: 'Arrays & Strings',
      completed: 15,
      total: 20,
      status: 'in-progress',
      difficulty: 'Easy'
    },
    {
      id: 2,
      title: 'Linked Lists',
      completed: 8,
      total: 12,
      status: 'in-progress',
      difficulty: 'Medium'
    },
    {
      id: 3,
      title: 'Trees & Graphs',
      completed: 0,
      total: 15,
      status: 'locked',
      difficulty: 'Hard'
    },
    {
      id: 4,
      title: 'Dynamic Programming',
      completed: 0,
      total: 18,
      status: 'locked',
      difficulty: 'Hard'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Learning Path</CardTitle>
        <CardDescription>
          Continue your structured learning journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {paths.map((path) => {
            const progress = (path.completed / path.total) * 100;
            const isLocked = path.status === 'locked';
            const isCompleted = path.completed === path.total;

            return (
              <div key={path.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : isLocked ? (
                    <Lock className="h-6 w-6 text-gray-400" />
                  ) : (
                    <Circle className="h-6 w-6 text-blue-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-sm font-medium ${isLocked ? 'text-gray-400' : ''}`}>
                      {path.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      path.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      path.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {path.difficulty}
                    </span>
                  </div>
                  <div className="mt-2">
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {path.completed}/{path.total} problems completed
                    </p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  disabled={isLocked}
                  variant={isCompleted ? "outline" : "default"}
                >
                  {isCompleted ? 'Review' : isLocked ? 'Locked' : 'Continue'}
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
