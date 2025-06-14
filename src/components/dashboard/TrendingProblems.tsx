
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Clock } from 'lucide-react';

export const TrendingProblems = () => {
  const problems = [
    {
      id: 1,
      title: 'Longest Substring Without Repeating Characters',
      difficulty: 'Medium',
      acceptance: '32%',
      solvers: '2.1M',
      tags: ['Hash Table', 'String', 'Sliding Window']
    },
    {
      id: 2,
      title: 'Container With Most Water',
      difficulty: 'Medium',
      acceptance: '54%',
      solvers: '1.8M',
      tags: ['Array', 'Two Pointers']
    },
    {
      id: 3,
      title: 'Valid Anagram',
      difficulty: 'Easy',
      acceptance: '63%',
      solvers: '2.5M',
      tags: ['Hash Table', 'String', 'Sorting']
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-orange-600" />
          Trending Problems
        </CardTitle>
        <CardDescription>
          Popular problems in the community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {problems.map((problem) => (
            <div key={problem.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-sm mb-2">{problem.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                    <span className={`px-2 py-1 rounded-full ${
                      problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {problem.difficulty}
                    </span>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {problem.solvers}
                    </div>
                    <span>{problem.acceptance} acceptance</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {problem.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-muted rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <Button size="sm">Solve</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
