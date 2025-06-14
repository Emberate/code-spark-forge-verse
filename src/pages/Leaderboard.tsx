
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Medal, Award, Crown, Flame, Target } from 'lucide-react';

const Leaderboard = () => {
  const globalLeaderboard = [
    {
      rank: 1,
      name: 'Arjun Sharma',
      college: 'IIT Delhi',
      points: 15420,
      solved: 287,
      streak: 45,
      avatar: '👨‍💻'
    },
    {
      rank: 2,
      name: 'Priya Patel',
      college: 'IIT Bombay',
      points: 14890,
      solved: 256,
      streak: 32,
      avatar: '👩‍💻'
    },
    {
      rank: 3,
      name: 'Vikram Singh',
      college: 'IIT Kanpur',
      points: 14250,
      solved: 234,
      streak: 28,
      avatar: '👨‍💻'
    },
    {
      rank: 4,
      name: 'Ananya Gupta',
      college: 'BITS Pilani',
      points: 13800,
      solved: 198,
      streak: 41,
      avatar: '👩‍💻'
    },
    {
      rank: 5,
      name: 'Rohit Kumar',
      college: 'NIT Trichy',
      points: 13456,
      solved: 187,
      streak: 23,
      avatar: '👨‍💻'
    }
  ];

  const collegeLeaderboard = [
    {
      rank: 1,
      college: 'IIT Delhi',
      totalStudents: 1250,
      avgPoints: 8420,
      topSolver: 'Arjun Sharma'
    },
    {
      rank: 2,
      college: 'IIT Bombay',
      totalStudents: 1180,
      avgPoints: 8150,
      topSolver: 'Priya Patel'
    },
    {
      rank: 3,
      college: 'IIT Kanpur',
      totalStudents: 980,
      avgPoints: 7890,
      topSolver: 'Vikram Singh'
    },
    {
      rank: 4,
      college: 'BITS Pilani',
      totalStudents: 2100,
      avgPoints: 7650,
      topSolver: 'Ananya Gupta'
    },
    {
      rank: 5,
      college: 'NIT Trichy',
      totalStudents: 1500,
      avgPoints: 7420,
      topSolver: 'Rohit Kumar'
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200';
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';
      case 3:
        return 'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200';
      default:
        return 'bg-background border-border';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Trophy className="h-8 w-8 text-yellow-600" />
            Leaderboard
          </h1>
          <p className="text-muted-foreground mt-2">
            See how you rank against other developers across India
          </p>
        </div>

        {/* Current User Rank Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Your Current Rank</h3>
                <p className="text-3xl font-bold text-blue-600">#2,847</p>
                <p className="text-sm text-muted-foreground">
                  You're in the top 15% of all users!
                </p>
              </div>
              <div className="text-right space-y-2">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-green-600" />
                  <span className="text-sm">142 problems solved</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">15-day streak</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">2,540 points</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="global" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="global">Global Ranking</TabsTrigger>
            <TabsTrigger value="college">College Ranking</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Contest</TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {globalLeaderboard.map((user) => (
                    <div
                      key={user.rank}
                      className={`p-4 rounded-lg border transition-all hover:shadow-md ${getRankBg(user.rank)}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {getRankIcon(user.rank)}
                          </div>
                          <div className="text-2xl">{user.avatar}</div>
                          <div>
                            <h3 className="font-semibold">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">{user.college}</p>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="text-lg font-bold">{user.points.toLocaleString()} pts</div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{user.solved} solved</span>
                            <div className="flex items-center gap-1">
                              <Flame className="h-3 w-3 text-orange-500" />
                              <span>{user.streak}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="college" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Colleges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {collegeLeaderboard.map((college) => (
                    <div
                      key={college.rank}
                      className={`p-4 rounded-lg border transition-all hover:shadow-md ${getRankBg(college.rank)}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {getRankIcon(college.rank)}
                          </div>
                          <div>
                            <h3 className="font-semibold">{college.college}</h3>
                            <p className="text-sm text-muted-foreground">
                              {college.totalStudents} active students
                            </p>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="text-lg font-bold">{college.avgPoints.toLocaleString()} avg pts</div>
                          <div className="text-sm text-muted-foreground">
                            Top: {college.topSolver}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Contest Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Weekly Contest #47</h3>
                  <p className="text-muted-foreground mb-4">
                    Contest ends in 2 days, 14 hours
                  </p>
                  <Badge className="bg-green-100 text-green-800">
                    You're currently ranked #156
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Leaderboard;
