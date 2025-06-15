
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Code, Plus, Trash2 } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

const skillCategories = [
  'Programming Languages',
  'Frontend Frameworks',
  'Backend Technologies',
  'Databases',
  'Tools & Technologies',
  'Soft Skills'
];

export const SkillsForm = () => {
  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: 'JavaScript', level: 90, category: 'Programming Languages' },
    { id: '2', name: 'React', level: 85, category: 'Frontend Frameworks' },
    { id: '3', name: 'Node.js', level: 80, category: 'Backend Technologies' },
    { id: '4', name: 'MongoDB', level: 75, category: 'Databases' }
  ]);

  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 50,
    category: skillCategories[0]
  });

  const addSkill = () => {
    if (newSkill.name.trim()) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: newSkill.name.trim(),
        level: newSkill.level,
        category: newSkill.category
      };
      setSkills(prev => [...prev, skill]);
      setNewSkill({
        name: '',
        level: 50,
        category: skillCategories[0]
      });
    }
  };

  const removeSkill = (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id));
  };

  const updateSkillLevel = (id: string, level: number) => {
    setSkills(prev => prev.map(skill => 
      skill.id === id ? { ...skill, level } : skill
    ));
  };

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  const getLevelColor = (level: number) => {
    if (level >= 80) return 'bg-green-500';
    if (level >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getLevelText = (level: number) => {
    if (level >= 80) return 'Expert';
    if (level >= 60) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Code className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Skills & Technologies</h2>
      </div>

      {/* Skills by Category */}
      <div className="space-y-6">
        {skillCategories.map(category => {
          const categorySkills = getSkillsByCategory(category);
          if (categorySkills.length === 0) return null;

          return (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="text-lg">{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categorySkills.map(skill => (
                    <div key={skill.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{skill.name}</span>
                          <Badge variant="outline" className={getLevelColor(skill.level).replace('bg-', 'border-')}>
                            {getLevelText(skill.level)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSkill(skill.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Progress value={skill.level} className="h-2" />
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={skill.level}
                          onChange={(e) => updateSkillLevel(skill.id, parseInt(e.target.value))}
                          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add New Skill */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Skill
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="skillName">Skill Name</Label>
              <Input
                id="skillName"
                value={newSkill.name}
                onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Python, React, AWS"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skillCategory">Category</Label>
              <select
                id="skillCategory"
                value={newSkill.category}
                onChange={(e) => setNewSkill(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md"
              >
                {skillCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skillLevel">Proficiency Level: {newSkill.level}%</Label>
            <div className="space-y-2">
              <Progress value={newSkill.level} className="h-2" />
              <input
                id="skillLevel"
                type="range"
                min="0"
                max="100"
                value={newSkill.level}
                onChange={(e) => setNewSkill(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Expert</span>
              </div>
            </div>
          </div>

          <Button onClick={addSkill} className="w-full">
            Add Skill
          </Button>
        </CardContent>
      </Card>

      <Button className="w-full">Save Skills</Button>
    </div>
  );
};
