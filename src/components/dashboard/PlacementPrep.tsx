
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { GraduationCap, Building, Calendar, Target } from 'lucide-react';

export const PlacementPrep = () => {
  const companies = [
    { name: 'Google', logo: '🔍', difficulty: 'Hard', openings: 12 },
    { name: 'Microsoft', logo: '💻', difficulty: 'Hard', openings: 8 },
    { name: 'Amazon', logo: '📦', difficulty: 'Medium', openings: 15 },
    { name: 'Flipkart', logo: '🛒', difficulty: 'Medium', openings: 20 },
    { name: 'TCS', logo: '🏢', difficulty: 'Easy', openings: 50 }
  ];

  const prepModules = [
    { name: 'Aptitude & Reasoning', progress: 75, status: 'In Progress' },
    { name: 'Technical MCQs', progress: 60, status: 'In Progress' },
    { name: 'Group Discussion', progress: 90, status: 'Completed' },
    { name: 'HR Interview', progress: 45, status: 'Not Started' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Campus Placement Prep
        </CardTitle>
        <CardDescription>
          Comprehensive preparation for campus placements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Upcoming Companies */}
          <div>
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Building className="h-4 w-4" />
              Upcoming Company Visits
            </h3>
            <div className="space-y-2">
              {companies.slice(0, 3).map((company, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{company.logo}</span>
                    <div>
                      <p className="font-medium text-sm">{company.name}</p>
                      <p className="text-xs text-muted-foreground">{company.openings} openings</p>
                    </div>
                  </div>
                  <Badge variant={company.difficulty === 'Easy' ? 'secondary' : 
                                company.difficulty === 'Medium' ? 'default' : 'destructive'}>
                    {company.difficulty}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Preparation Modules */}
          <div>
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Preparation Modules
            </h3>
            <div className="space-y-3">
              {prepModules.map((module, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{module.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {module.status}
                    </Badge>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full">
            <Calendar className="h-4 w-4 mr-2" />
            View Full Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
