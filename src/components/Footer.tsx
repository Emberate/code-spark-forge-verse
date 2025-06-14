
import React from 'react';
import { Code, Mail, Phone, MapPin, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">CodeSpark</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering Indian developers with AI-powered coding education and career preparation.
            </p>
            <div className="flex space-x-4">
              <Github className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Practice Problems</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Mock Interviews</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Leaderboard</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Competitions</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Study Groups</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">API Reference</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">support@codespark.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">+91 9876543210</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">Bangalore, Karnataka, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 CodeSpark. All rights reserved. Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
};
