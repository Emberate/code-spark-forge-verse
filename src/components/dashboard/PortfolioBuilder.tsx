
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Briefcase, ExternalLink, Plus, Edit } from 'lucide-react';

export const PortfolioBuilder = () => {
  const portfolioSections = [
    { name: 'Personal Info', completed: true, progress: 100 },
    { name: 'Projects', completed: false, progress: 60 },
    { name: 'Skills', completed: true, progress: 100 },
    { name: 'Achievements', completed: false, progress: 30 },
    { name: 'Resume', completed: false, progress: 0 }
  ];

  const overallProgress = portfolioSections.reduce((acc, section) => acc + section.progress, 0) / portfolioSections.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Portfolio Builder
        </CardTitle>
        <CardDescription>
          Create a professional portfolio to showcase your skills
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>

          <div className="space-y-3">
            {portfolioSections.map((section, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${section.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className="text-sm font-medium">{section.name}</span>
                  {section.completed && <Badge variant="secondary" className="text-xs">Done</Badge>}
                </div>
                <Button size="sm" variant="ghost">
                  {section.progress > 0 ? <Edit className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                </Button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button className="flex-1">
              Continue Building
            </Button>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-3 w-3 mr-1" />
              Preview
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
