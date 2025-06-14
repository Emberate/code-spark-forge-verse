
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Phone, Mail, Clock, Zap } from 'lucide-react';

export const PrioritySupport = () => {
  const supportOptions = [
    {
      type: 'Live Chat',
      icon: MessageCircle,
      description: 'Instant help from our experts',
      availability: '24/7',
      responseTime: '< 2 min'
    },
    {
      type: 'Video Call',
      icon: Phone,
      description: 'One-on-one mentoring sessions',
      availability: '9 AM - 9 PM',
      responseTime: '< 15 min'
    },
    {
      type: 'Email Support',
      icon: Mail,
      description: 'Detailed technical assistance',
      availability: 'Always',
      responseTime: '< 1 hour'
    }
  ];

  const recentTickets = [
    { id: '#12345', topic: 'Algorithm Doubt', status: 'Resolved', time: '2 min ago' },
    { id: '#12344', topic: 'Interview Prep', status: 'In Progress', time: '1 hour ago' },
    { id: '#12343', topic: 'Technical Issue', status: 'Resolved', time: '2 hours ago' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          Priority Support
        </CardTitle>
        <CardDescription>
          Get instant help from our expert mentors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Support Options */}
          <div className="grid gap-3">
            {supportOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto p-4"
                >
                  <Icon className="h-4 w-4 mr-3" />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{option.type}</div>
                    <div className="text-xs text-muted-foreground">{option.description}</div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-green-600">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {option.responseTime}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {option.availability}
                      </span>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>

          {/* Recent Tickets */}
          <div>
            <h3 className="font-medium mb-3">Recent Support Tickets</h3>
            <div className="space-y-2">
              {recentTickets.map((ticket, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <p className="text-sm font-medium">{ticket.id}</p>
                    <p className="text-xs text-muted-foreground">{ticket.topic}</p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={ticket.status === 'Resolved' ? 'secondary' : 'default'}
                      className="text-xs"
                    >
                      {ticket.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{ticket.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
