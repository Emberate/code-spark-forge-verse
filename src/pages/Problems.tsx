
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, CheckCircle, Clock, Star, Calendar, Code, Trophy, Target } from 'lucide-react';
import { useDailyProblem } from '@/hooks/useDailyProblem';
import { useProblemProgress } from '@/hooks/useProblemProgress';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Problems = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  
  const { data: dailyProblem, isLoading: dailyLoading } = useDailyProblem();
  const { getProblemStatus, updateProblemStatus } = useProblemProgress();

  const problems = [
    {
      id: 1,
      title: 'Two Sum',
      difficulty: 'Easy',
      status: 'solved',
      acceptance: '50.1%',
      frequency: 'High',
      tags: ['Array', 'Hash Table'],
      companies: ['Amazon', 'Google', 'Microsoft']
    },
    {
      id: 2,
      title: 'Add Two Numbers',
      difficulty: 'Medium',
      status: 'attempted',
      acceptance: '38.2%',
      frequency: 'Medium',
      tags: ['Linked List', 'Math'],
      companies: ['Amazon', 'Microsoft']
    },
    {
      id: 3,
      title: 'Longest Substring Without Repeating Characters',
      difficulty: 'Medium',
      status: 'unsolved',
      acceptance: '33.8%',
      frequency: 'High',
      tags: ['Hash Table', 'String', 'Sliding Window'],
      companies: ['Amazon', 'Adobe', 'Bloomberg']
    },
    {
      id: 4,
      title: 'Median of Two Sorted Arrays',
      difficulty: 'Hard',
      status: 'unsolved',
      acceptance: '35.2%',
      frequency: 'Medium',
      tags: ['Array', 'Binary Search', 'Divide and Conquer'],
      companies: ['Google', 'Microsoft', 'Apple']
    },
    {
      id: 5,
      title: 'Longest Palindromic Substring',
      difficulty: 'Medium',
      status: 'solved',
      acceptance: '32.1%',
      frequency: 'High',
      tags: ['String', 'Dynamic Programming'],
      companies: ['Amazon', 'Microsoft', 'Apple']
    }
  ];

  const tags = ['Array', 'String', 'Hash Table', 'Dynamic Programming', 'Math', 'Binary Search'];
  const companies = ['Amazon', 'Google', 'Microsoft', 'Apple', 'Meta', 'Netflix'];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'solved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'attempted':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-gray-300" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSolveProblem = (problem: any) => {
    // Navigate to terminal with problem data
    const searchParams = new URLSearchParams({
      problemId: problem.id.toString(),
      problemTitle: problem.title,
      difficulty: problem.difficulty
    });
    navigate(`/terminal?${searchParams.toString()}`);
  };

  const handleSolveDailyProblem = () => {
    if (!dailyProblem) return;
    
    // Navigate to terminal with daily problem data
    const searchParams = new URLSearchParams({
      problemId: dailyProblem.id,
      problemTitle: dailyProblem.title,
      difficulty: dailyProblem.difficulty,
      isDaily: 'true'
    });
    navigate(`/terminal?${searchParams.toString()}`);
  };

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         problem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
    const matchesTag = selectedTag === 'all' || problem.tags.includes(selectedTag);
    
    return matchesSearch && matchesDifficulty && matchesTag;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Problems</h1>
          <p className="text-muted-foreground mt-2">
            Practice coding problems from top tech companies
          </p>
        </div>

        {/* Daily Challenge */}
        <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              Daily Challenge
              <Badge variant="secondary" className="ml-auto">
                {new Date().toLocaleDateString()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dailyLoading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
                <p className="mt-2 text-sm text-muted-foreground">Loading today's challenge...</p>
              </div>
            ) : dailyProblem ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{dailyProblem.title}</h3>
                    <div className="flex items-center gap-4 mb-3">
                      <Badge className={getDifficultyColor(dailyProblem.difficulty)}>
                        {dailyProblem.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{dailyProblem.acceptance} acceptance</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-muted-foreground">{dailyProblem.frequency} frequency</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {dailyProblem.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {dailyProblem.description.split('\n')[0]}
                    </p>
                  </div>
                  <div className="ml-4">
                    <Button 
                      onClick={handleSolveDailyProblem}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      <Code className="h-4 w-4 mr-2" />
                      Solve Now
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center py-4 text-muted-foreground">
                No daily challenge available
              </p>
            )}
          </CardContent>
        </Card>

        {/* Problem Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Solved</p>
                  <p className="text-xl font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Attempted</p>
                  <p className="text-xl font-bold">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Easy</p>
                  <p className="text-xl font-bold">2/2</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Acceptance</p>
                  <p className="text-xl font-bold">67%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Problem Set</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search problems..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <select 
                    className="px-3 py-2 border rounded-md text-sm"
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                  >
                    <option value="all">All Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                  <select 
                    className="px-3 py-2 border rounded-md text-sm"
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                  >
                    <option value="all">All Tags</option>
                    {tags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Problems Table */}
              <div className="border rounded-lg">
                <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/50 text-sm font-medium">
                  <div className="col-span-1">Status</div>
                  <div className="col-span-4">Title</div>
                  <div className="col-span-2">Difficulty</div>
                  <div className="col-span-2">Acceptance</div>
                  <div className="col-span-2">Frequency</div>
                  <div className="col-span-1">Action</div>
                </div>
                
                {filteredProblems.map((problem) => (
                  <div key={problem.id} className="grid grid-cols-12 gap-4 p-4 border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                    <div className="col-span-1 flex items-center">
                      {getStatusIcon(problem.status)}
                    </div>
                    <div className="col-span-4">
                      <h3 className="font-medium text-sm mb-1">{problem.title}</h3>
                      <div className="flex flex-wrap gap-1">
                        {problem.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {problem.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{problem.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <Badge className={getDifficultyColor(problem.difficulty)}>
                        {problem.difficulty}
                      </Badge>
                    </div>
                    <div className="col-span-2 flex items-center text-sm text-muted-foreground">
                      {problem.acceptance}
                    </div>
                    <div className="col-span-2 flex items-center">
                      <div className="flex items-center gap-1">
                        <Star className={`h-3 w-3 ${
                          problem.frequency === 'High' ? 'text-yellow-500 fill-current' : 'text-gray-300'
                        }`} />
                        <span className="text-sm text-muted-foreground">{problem.frequency}</span>
                      </div>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleSolveProblem(problem)}
                      >
                        Solve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company-wise Problems */}
        <Card>
          <CardHeader>
            <CardTitle>Company Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="amazon" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                {companies.map((company) => (
                  <TabsTrigger key={company} value={company.toLowerCase()}>
                    {company}
                  </TabsTrigger>
                ))}
              </TabsList>
              {companies.map((company) => (
                <TabsContent key={company} value={company.toLowerCase()}>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Problems frequently asked in {company} interviews
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {problems
                        .filter(p => p.companies.includes(company))
                        .map((problem) => (
                          <Card key={problem.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-sm">{problem.title}</h4>
                                {getStatusIcon(problem.status)}
                              </div>
                              <div className="flex items-center justify-between">
                                <Badge className={getDifficultyColor(problem.difficulty)}>
                                  {problem.difficulty}
                                </Badge>
                                <Button 
                                  size="sm"
                                  onClick={() => handleSolveProblem(problem)}
                                >
                                  Practice
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Problems;
