
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Save, Eye, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PersonalInfoForm } from '@/components/portfolio/PersonalInfoForm';
import { ProjectsForm } from '@/components/portfolio/ProjectsForm';
import { SkillsForm } from '@/components/portfolio/SkillsForm';
import { AchievementsForm } from '@/components/portfolio/AchievementsForm';
import { ResumeUpload } from '@/components/portfolio/ResumeUpload';

const Portfolio = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('personal');
  
  const portfolioSections = [
    { id: 'personal', name: 'Personal Info', completed: true, progress: 100 },
    { id: 'projects', name: 'Projects', completed: false, progress: 60 },
    { id: 'skills', name: 'Skills', completed: true, progress: 100 },
    { id: 'achievements', name: 'Achievements', completed: false, progress: 30 },
    { id: 'resume', name: 'Resume', completed: false, progress: 0 }
  ];

  const overallProgress = portfolioSections.reduce((acc, section) => acc + section.progress, 0) / portfolioSections.length;

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoForm />;
      case 'projects':
        return <ProjectsForm />;
      case 'skills':
        return <SkillsForm />;
      case 'achievements':
        return <AchievementsForm />;
      case 'resume':
        return <ResumeUpload />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Briefcase className="h-8 w-8" />
                Portfolio Builder
              </h1>
              <p className="text-muted-foreground mt-2">
                Create a professional portfolio to showcase your skills and achievements
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sections</CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm text-muted-foreground">{Math.round(overallProgress)}%</span>
                    </div>
                    <Progress value={overallProgress} className="h-2" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {portfolioSections.map((section) => (
                    <Button
                      key={section.id}
                      variant={activeSection === section.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveSection(section.id)}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-2 h-2 rounded-full ${section.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <span className="text-sm">{section.name}</span>
                        {section.completed && <Badge variant="secondary" className="text-xs ml-auto">Done</Badge>}
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <Card>
                <CardContent className="p-6">
                  {renderActiveSection()}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Save Progress
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Portfolio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
