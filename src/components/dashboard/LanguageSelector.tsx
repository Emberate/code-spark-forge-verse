
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, Check } from 'lucide-react';

export const LanguageSelector = () => {
  const languages = [
    { name: 'English', code: 'en', flag: '🇺🇸', active: true },
    { name: 'हिंदी', code: 'hi', flag: '🇮🇳', active: false },
    { name: 'বাংলা', code: 'bn', flag: '🇧🇩', active: false },
    { name: 'தமிழ்', code: 'ta', flag: '🇮🇳', active: false },
    { name: 'తెలుగు', code: 'te', flag: '🇮🇳', active: false },
    { name: 'ಕನ್ನಡ', code: 'kn', flag: '🇮🇳', active: false },
    { name: 'മലയാളം', code: 'ml', flag: '🇮🇳', active: false },
    { name: 'ગુજરાતી', code: 'gu', flag: '🇮🇳', active: false },
    { name: 'ਪੰਜਾਬੀ', code: 'pa', flag: '🇮🇳', active: false },
    { name: 'मराठी', code: 'mr', flag: '🇮🇳', active: false }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Regional Languages
        </CardTitle>
        <CardDescription>
          Learn coding in your preferred language
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {languages.map((language) => (
            <Button
              key={language.code}
              variant={language.active ? "default" : "outline"}
              size="sm"
              className="justify-start h-auto p-3"
            >
              <span className="mr-2">{language.flag}</span>
              <span className="flex-1 text-left">{language.name}</span>
              {language.active && <Check className="h-3 w-3" />}
            </Button>
          ))}
        </div>
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground">
            💡 Problems, explanations, and tutorials available in all regional languages
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
