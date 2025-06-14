
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { PricingSection } from '@/components/PricingSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
