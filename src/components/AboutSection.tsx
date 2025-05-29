import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, Users, Award, TrendingUp } from 'lucide-react';

const AboutSection = () => {
  const navigate = useNavigate();

  // Function to handle Contact navigation
  const handleContactNavigation = () => {
    // Check if we're on the home page
    if (window.location.pathname === '/') {
      // If on home page, scroll to contact section
      const contactElement = document.querySelector('#contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on other pages, navigate to home then scroll to contact
      navigate('/');
      setTimeout(() => {
        const contactElement = document.querySelector('#contact');
        if (contactElement) {
          contactElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  };

  // Function to handle WhatsApp redirection
  const handleWhatsAppRedirection = () => {
    const message = encodeURIComponent("I'm looking for a project, can you help me out?");
    const whatsappUrl = `https://wa.me/15551234567?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const stats = [
    {
      icon: Star,
      number: '500+',
      label: 'Premium Projects',
      description: 'Curated collection of high-quality, production-ready projects'
    },
    {
      icon: Users,
      number: '50K+',
      label: 'Happy Developers',
      description: 'Developers worldwide trust our solutions for their projects'
    },
    {
      icon: Award,
      number: '99%',
      label: 'Success Rate',
      description: 'Client satisfaction rate with our delivery and support'
    },
    {
      icon: TrendingUp,
      number: '24/7',
      label: 'Expert Support',
      description: 'Round-the-clock assistance from our technical experts'
    }
  ];



  return (
    <section className="py-20 sm:py-24 px-6 bg-background relative overflow-hidden" id="about">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-coral/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-raspberry/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 bg-coral/20 dark:bg-coral/30 border border-coral/40 px-6 py-3 rounded-full mb-8 text-base font-semibold text-coral shadow-lg backdrop-blur-md">
            <span className="text-lg">🌟</span>
            <span>About BrainyBox</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-foreground leading-tight">
            Empowering Developers with{' '}
            <span className="bg-gradient-to-r from-coral to-raspberry bg-clip-text text-transparent">
              Premium Solutions
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            We're on a mission to accelerate software development by providing
            <span className="text-coral font-semibold"> battle-tested, enterprise-grade solutions</span> that
            help developers build amazing products faster and more efficiently.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-20 sm:mb-24">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="group bg-background/80 dark:bg-background/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-border/40 hover:border-coral/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 text-center"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="bg-gradient-to-br from-coral/10 to-raspberry/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-coral" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2 group-hover:bg-gradient-to-r group-hover:from-coral group-hover:to-raspberry group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {stat.number}
                </div>
                <h3 className="font-bold text-foreground mb-2 group-hover:text-coral transition-colors duration-300">
                  {stat.label}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {stat.description}
                </p>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-coral rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300 animate-ping" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;