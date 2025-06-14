
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Code, User, Trophy, BookOpen } from 'lucide-react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">CodeSpark</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#problems" className="text-foreground hover:text-primary transition-colors">
              Problems
            </a>
            <a href="#leaderboard" className="text-foreground hover:text-primary transition-colors">
              Leaderboard
            </a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors">
              Pricing
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <a href="#features" className="block px-3 py-2 text-foreground hover:text-primary">
                Features
              </a>
              <a href="#problems" className="block px-3 py-2 text-foreground hover:text-primary">
                Problems
              </a>
              <a href="#leaderboard" className="block px-3 py-2 text-foreground hover:text-primary">
                Leaderboard
              </a>
              <a href="#pricing" className="block px-3 py-2 text-foreground hover:text-primary">
                Pricing
              </a>
              <div className="px-3 py-2 space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button size="sm" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
