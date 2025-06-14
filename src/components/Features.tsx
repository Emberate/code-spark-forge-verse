
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Users, 
  Trophy, 
  Gamepad2, 
  BookOpen, 
  Video, 
  Smartphone, 
  TrendingUp,
  Globe,
  Code,
  Zap,
  Target
} from 'lucide-react';

const features = [
  {
    category: "AI-Powered Learning",
    icon: Brain,
    items: [
      {
        title: "AI Pair Programming",
        description: "Get instant code suggestions, bug detection, and optimization tips from advanced AI",
        icon: Code,
        badge: "New"
      },
      {
        title: "Personalized Learning Paths",
        description: "Adaptive difficulty and career-specific tracks (Frontend, Backend, ML, DevOps)",
        icon: Target,
        badge: "Popular"
      },
      {
        title: "Smart Code Reviews",
        description: "Automated reviews with best practices, security analysis, and alternative solutions",
        icon: Zap,
        badge: null
      }
    ]
  },
  {
    category: "Gamification & Social",
    icon: Gamepad2,
    items: [
      {
        title: "Advanced Gamification",
        description: "Coding streaks, achievement badges, RPG elements, and guild competitions",
        icon: Trophy,
        badge: "Hot"
      },
      {
        title: "Social Learning",
        description: "Study groups, peer reviews, live coding sessions, and coding battles",
        icon: Users,
        badge: null
      },
      {
        title: "Live Competitions",
        description: "1v1 battles, team competitions with real-time leaderboards",
        icon: Gamepad2,
        badge: "Live"
      }
    ]
  },
  {
    category: "Career-Focused",
    icon: TrendingUp,
    items: [
      {
        title: "Industry-Specific Problems",
        description: "Google, Amazon, Microsoft, and Indian startup interview questions",
        icon: BookOpen,
        badge: "Premium"
      },
      {
        title: "Interview Simulation",
        description: "AI-powered mock interviews with video recording and behavioral prep",
        icon: Video,
        badge: null
      },
      {
        title: "Portfolio Builder",
        description: "Showcase solutions, skill certifications, and GitHub integration",
        icon: Globe,
        badge: null
      }
    ]
  },
  {
    category: "Indian Market Focus",
    icon: Globe,
    items: [
      {
        title: "Multi-Language Support",
        description: "Problem statements in Hindi, Tamil, Bengali and other regional languages",
        icon: Globe,
        badge: "🇮🇳"
      },
      {
        title: "Campus Integration",
        description: "College leaderboards, placement statistics, and campus ambassador programs",
        icon: BookOpen,
        badge: null
      },
      {
        title: "Mobile-First Experience",
        description: "Offline mode, voice coding, full mobile editor, and PWA support",
        icon: Smartphone,
        badge: "Mobile"
      }
    ]
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Everything You Need to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}Succeed{" "}
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
            From AI-powered learning to career placement - we've got every aspect of your coding journey covered
          </p>
        </div>

        <div className="space-y-16">
          {features.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-8">
              <div className="flex items-center justify-center gap-3">
                <section.icon className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-bold text-center">{section.category}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((feature, index) => (
                  <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="space-y-3">
                      <div className="flex items-center justify-between">
                        <feature.icon className="h-8 w-8 text-primary" />
                        {feature.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {feature.badge}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
