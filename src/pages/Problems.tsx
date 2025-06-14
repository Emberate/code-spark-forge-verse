
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, CheckCircle, Clock, Star } from 'lucide-react';

const Problems = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');

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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Problems</h1>
          <p className="text-muted-foreground mt-2">
            Practice coding problems from top tech companies
          </p>
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
                
                {problems.map((problem) => (
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
                      <Button size="sm" variant="outline">
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
                          <Card key={problem.id}>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-sm">{problem.title}</h4>
                                {getStatusIcon(problem.status)}
                              </div>
                              <div className="flex items-center justify-between">
                                <Badge className={getDifficultyColor(problem.difficulty)}>
                                  {problem.difficulty}
                                </Badge>
                                <Button size="sm">Practice</Button>
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
