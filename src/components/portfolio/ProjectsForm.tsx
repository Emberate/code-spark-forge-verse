import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FolderOpen, Plus, Trash2, ExternalLink, Github } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const ProjectsForm = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce platform built with React and Node.js',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/username/project'
    }
  ]);

  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    technologies: [],
    liveUrl: '',
    githubUrl: ''
  });

  const [newTech, setNewTech] = useState('');

  const addTechnology = () => {
    if (newTech.trim() && !newProject.technologies.includes(newTech.trim())) {
      setNewProject(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()]
      }));
      setNewTech('');
    }
  };

  const removeTechnology = (tech: string) => {
    setNewProject(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const addProject = () => {
    if (newProject.title && newProject.description) {
      const project: Project = {
        ...newProject,
        id: Date.now().toString()
      };
      setProjects(prev => [...prev, project]);
      setNewProject({
        title: '',
        description: '',
        technologies: [],
        liveUrl: '',
        githubUrl: ''
      });
    }
  };

  const removeProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <FolderOpen className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Projects</h2>
      </div>

      {/* Existing Projects */}
      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="mt-2">{project.description}</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(project.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">Technologies</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
                    >
                      <Github className="h-3 w-3" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Project */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Project
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectTitle">Project Title</Label>
            <Input
              id="projectTitle"
              value={newProject.title}
              onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter project title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectDescription">Description</Label>
            <Textarea
              id="projectDescription"
              value={newProject.description}
              onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your project..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Technologies Used</Label>
            <div className="flex gap-2">
              <Input
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                placeholder="Add technology"
                onKeyPress={(e) => e.key === 'Enter' && addTechnology()}
              />
              <Button type="button" onClick={addTechnology} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {newProject.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removeTechnology(tech)}
                >
                  {tech} ×
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="liveUrl">Live Demo URL (Optional)</Label>
              <Input
                id="liveUrl"
                value={newProject.liveUrl}
                onChange={(e) => setNewProject(prev => ({ ...prev, liveUrl: e.target.value }))}
                placeholder="https://your-project.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL (Optional)</Label>
              <Input
                id="githubUrl"
                value={newProject.githubUrl}
                onChange={(e) => setNewProject(prev => ({ ...prev, githubUrl: e.target.value }))}
                placeholder="https://github.com/username/project"
              />
            </div>
          </div>

          <Button onClick={addProject} className="w-full">
            Add Project
          </Button>
        </CardContent>
      </Card>

      <Button className="w-full">Save Projects</Button>
    </div>
  );
};
