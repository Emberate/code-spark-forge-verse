import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, Lock } from 'lucide-react';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useNavigate } from 'react-router-dom';

export const LearningPath = () => {
  const { data: progressData, isLoading } = useUserProgress();
  const navigate = useNavigate();

  const handleContinue = (learningPathId: string, pathTitle: string) => {
    navigate(`/terminal?pathId=${learningPathId}&pathTitle=${encodeURIComponent(pathTitle)}`);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Learning Path</CardTitle>
          <CardDescription>Loading your progress...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  if (!progressData || progressData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Learning Path</CardTitle>
          <CardDescription>Setting up your learning journey...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p>Your learning path will appear here once initialized.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

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
          {progressData.map((progress) => {
            const path = progress.learning_paths;
            const progressPercentage = path.total_problems > 0 
              ? (progress.completed_problems / path.total_problems) * 100 
              : 0;
            
            const isLocked = progress.status === 'locked';
            const isCompleted = progress.status === 'completed';
            const isInProgress = progress.status === 'in-progress';

            return (
              <div key={progress.id} className="flex items-center space-x-4 p-4 border rounded-lg">
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
                  <p className={`text-xs mt-1 ${isLocked ? 'text-gray-400' : 'text-muted-foreground'}`}>
                    {path.description}
                  </p>
                  <div className="mt-2">
                    <Progress value={progressPercentage} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {progress.completed_problems}/{path.total_problems} problems completed
                    </p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  disabled={isLocked}
                  variant={isCompleted ? "outline" : "default"}
                  onClick={() => handleContinue(path.id, path.title)}
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
