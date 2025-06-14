
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus } from 'lucide-react';

const Admin = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [solution, setSolution] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [learningPathId, setLearningPathId] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch learning paths
  const { data: learningPaths } = useQuery({
    queryKey: ['learningPaths'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('learning_paths')
        .select('*')
        .order('order_index');
      if (error) throw error;
      return data;
    },
  });

  // Fetch all problems
  const { data: problems } = useQuery({
    queryKey: ['allProblems'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('problems')
        .select(`
          *,
          learning_paths(title)
        `)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !difficulty || !learningPathId) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const { error } = await supabase
        .from('problems')
        .insert({
          title,
          description,
          solution,
          difficulty,
          learning_path_id: learningPathId,
          tags: tagsArray,
        });

      if (error) throw error;

      toast({
        title: "Problem Created!",
        description: "The problem has been successfully added.",
      });

      // Reset form
      setTitle('');
      setDescription('');
      setSolution('');
      setDifficulty('');
      setLearningPathId('');
      setTags('');

      // Refetch problems
      queryClient.invalidateQueries({ queryKey: ['allProblems'] });
    } catch (error) {
      console.error('Error creating problem:', error);
      toast({
        title: "Error",
        description: "Failed to create problem. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteProblem = async (problemId: string) => {
    try {
      const { error } = await supabase
        .from('problems')
        .delete()
        .eq('id', problemId);

      if (error) throw error;

      toast({
        title: "Problem Deleted",
        description: "The problem has been successfully deleted.",
      });

      queryClient.invalidateQueries({ queryKey: ['allProblems'] });
    } catch (error) {
      console.error('Error deleting problem:', error);
      toast({
        title: "Error",
        description: "Failed to delete problem. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage problems and learning content
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Problem Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Problem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Problem Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Two Sum"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="learningPath">Learning Path *</Label>
                  <Select value={learningPathId} onValueChange={setLearningPathId} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select learning path" />
                    </SelectTrigger>
                    <SelectContent>
                      {learningPaths?.map((path) => (
                        <SelectItem key={path.id} value={path.id}>
                          {path.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="difficulty">Difficulty *</Label>
                  <Select value={difficulty} onValueChange={setDifficulty} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Problem Description *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the problem, include examples and constraints..."
                    rows={6}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="solution">Solution (Optional)</Label>
                  <Textarea
                    id="solution"
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    placeholder="Provide the solution or hints..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="e.g., array, hash-table, easy"
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? 'Creating...' : 'Create Problem'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Problems List */}
          <Card>
            <CardHeader>
              <CardTitle>Existing Problems</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {problems?.map((problem) => (
                  <div key={problem.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium">{problem.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {problem.learning_paths?.title}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant={
                            problem.difficulty === 'Easy' ? 'default' :
                            problem.difficulty === 'Medium' ? 'secondary' : 'destructive'
                          }>
                            {problem.difficulty}
                          </Badge>
                          {problem.tags?.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteProblem(problem.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Admin;
