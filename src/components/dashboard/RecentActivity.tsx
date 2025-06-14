
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle, X } from 'lucide-react';

export const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'solved',
      problem: 'Two Sum',
      time: '2 hours ago',
      difficulty: 'Easy'
    },
    {
      id: 2,
      type: 'attempted',
      problem: 'Merge Intervals',
      time: '5 hours ago',
      difficulty: 'Medium'
    },
    {
      id: 3,
      type: 'solved',
      problem: 'Valid Parentheses',
      time: '1 day ago',
      difficulty: 'Easy'
    },
    {
      id: 4,
      type: 'solved',
      problem: 'Binary Search',
      time: '2 days ago',
      difficulty: 'Easy'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
        <CardDescription>
          Your latest problem-solving sessions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3">
              <div className={`p-1 rounded-full ${
                activity.type === 'solved' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {activity.type === 'solved' ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-red-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.problem}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                activity.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                activity.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {activity.difficulty}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
