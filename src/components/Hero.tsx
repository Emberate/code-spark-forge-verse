
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Star, Users, Trophy, Zap } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
            <Zap className="h-4 w-4 mr-2" />
            🇮🇳 Made for Indian Developers
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground">
            Master Coding with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}AI-Powered{" "}
            </span>
            Learning
          </h1>

          <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed">
            Transform your coding journey with personalized AI mentorship, real interview simulations, 
            and industry-specific challenges designed for Indian tech careers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="px-8 py-4 text-lg">
              <Play className="h-5 w-5 mr-2" />
              Start Learning Free
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
              Watch Demo
            </Button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 pt-8">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">50,000+ Active Learners</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">10,000+ Placements</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">4.8/5 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
