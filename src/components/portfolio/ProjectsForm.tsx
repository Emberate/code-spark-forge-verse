
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FolderOpen, Plus, ExternalLink, Github, Trash2 } from 'lucide-react';

export const ProjectsForm = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Full-stack web application built with React and Node.js',
      technologies: ['React', 'Node.js', 'MongoDB'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/user/project'
    }
  ]);

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: '',
      description: '',
      technologies: [],
      liveUrl: '',
      githubUrl: ''
    };
    setProjects([...projects, newProject]);
  };

  const removeProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderOpen className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Projects</h2>
        </div>
        <Button onClick={addProject} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Project {index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`title-${project.id}`}>Project Title</Label>
                <Input
                  id={`title-${project.id}`}
                  defaultValue={project.title}
                  placeholder="Enter project title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`description-${project.id}`}>Description</Label>
                <Input
                  id={`description-${project.id}`}
                  defaultValue={project.description}
                  placeholder="Brief description of your project"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`liveUrl-${project.id}`}>Live URL</Label>
                  <Input
                    id={`liveUrl-${project.id}`}
                    defaultValue={project.liveUrl}
                    placeholder="https://your-project.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`githubUrl-${project.id}`}>GitHub URL</Label>
                  <Input
                    id={`githubUrl-${project.id}`}
                    defaultValue={project.githubUrl}
                    placeholder="https://github.com/user/repo"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Technologies Used</Label>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <Badge key={i} variant="secondary">{tech}</Badge>
                  ))}
                  <Button variant="outline" size="sm">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Tech
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button className="w-full">Save Projects</Button>
    </div>
  );
};
