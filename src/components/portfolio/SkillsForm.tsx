
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Code, Plus, X } from 'lucide-react';

export const SkillsForm = () => {
  const [skills, setSkills] = useState([
    { name: 'JavaScript', level: 90, category: 'Programming' },
    { name: 'React', level: 85, category: 'Frontend' },
    { name: 'Node.js', level: 75, category: 'Backend' },
    { name: 'Python', level: 80, category: 'Programming' }
  ]);

  const [newSkill, setNewSkill] = useState({ name: '', level: 50, category: 'Programming' });

  const addSkill = () => {
    if (newSkill.name.trim()) {
      setSkills([...skills, { ...newSkill }]);
      setNewSkill({ name: '', level: 50, category: 'Programming' });
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const categories = ['Programming', 'Frontend', 'Backend', 'Database', 'Tools', 'Other'];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Code className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Skills & Technologies</h2>
      </div>

      {/* Add New Skill */}
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="font-medium">Add New Skill</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="skillName">Skill Name</Label>
            <Input
              id="skillName"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              placeholder="e.g., JavaScript, React"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skillCategory">Category</Label>
            <select
              id="skillCategory"
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="skillLevel">Proficiency Level ({newSkill.level}%)</Label>
            <input
              type="range"
              id="skillLevel"
              min="0"
              max="100"
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
        <Button onClick={addSkill}>
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {/* Skills List */}
      <div className="space-y-4">
        <h3 className="font-medium">Your Skills</h3>
        {skills.map((skill, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">{skill.name}</span>
                <Badge variant="secondary" className="text-xs">{skill.category}</Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeSkill(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Proficiency</span>
                <span>{skill.level}%</span>
              </div>
              <Progress value={skill.level} className="h-2" />
            </div>
          </div>
        ))}
      </div>

      <Button className="w-full">Save Skills</Button>
    </div>
  );
};
