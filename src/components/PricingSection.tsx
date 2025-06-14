
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Crown } from 'lucide-react';

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Perfect for getting started with coding practice",
    features: [
      "100+ practice problems",
      "Basic AI code suggestions",
      "Community discussions",
      "Mobile app access",
      "Hindi language support"
    ],
    cta: "Start Free",
    popular: false,
    icon: Star
  },
  {
    name: "Pro",
    price: "₹299",
    period: "per month",
    description: "Ideal for serious learners and job seekers",
    features: [
      "1000+ premium problems",
      "Advanced AI pair programming",
      "Mock interview simulations",
      "Personalized learning paths",
      "All regional languages",
      "Portfolio builder",
      "Campus placement prep",
      "Priority support"
    ],
    cta: "Start Pro Trial",
    popular: true,
    icon: Zap
  },
  {
    name: "Enterprise",
    price: "₹999",
    period: "per month",
    description: "For teams and educational institutions",
    features: [
      "Unlimited problems & features",
      "Team management dashboard",
      "Custom problem sets",
      "Advanced analytics",
      "1-on-1 mentorship sessions",
      "Bulk assessments",
      "API access",
      "Dedicated support"
    ],
    cta: "Contact Sales",
    popular: false,
    icon: Crown
  }
];

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Choose Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}Learning Path{" "}
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
            Affordable pricing designed for Indian students and professionals
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">💳 UPI, Paytm, PhonePe accepted</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative overflow-hidden ${plan.popular ? 'ring-2 ring-primary shadow-lg scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <CardHeader className={`text-center space-y-4 ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                <div className="flex items-center justify-center">
                  <plan.icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full" size="lg" variant={plan.popular ? "default" : "outline"}>
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center space-y-4">
          <p className="text-muted-foreground">
            🎓 <strong>Student Discount:</strong> Get 50% off Pro plan with valid student ID
          </p>
          <p className="text-sm text-muted-foreground">
            All plans include 7-day free trial • Cancel anytime • No setup fees
          </p>
        </div>
      </div>
    </section>
  );
};
