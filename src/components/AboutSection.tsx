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

  const features = [
    {
      title: 'Production-Ready Code',
      description: 'Every project is thoroughly tested and optimized for production deployment.',
      icon: '🚀',
      gradient: 'from-coral to-raspberry'
    },
    {
      title: 'Comprehensive Documentation',
      description: 'Detailed guides, API references, and step-by-step implementation instructions.',
      icon: '📚',
      gradient: 'from-raspberry to-coral'
    },
    {
      title: 'Modern Technology Stack',
      description: 'Built with the latest frameworks, libraries, and industry best practices.',
      icon: '⚡',
      gradient: 'from-coral to-raspberry'
    },
    {
      title: 'Scalable Architecture',
      description: 'Built with modern frameworks and best practices for long-term maintainability.',
      icon: '🏗️',
      gradient: 'from-coral to-raspberry'
    },
    {
      title: 'Continuous Updates',
      description: 'Regular updates and security patches to keep your projects current and secure.',
      icon: '🔄',
      gradient: 'from-raspberry to-coral'
    },
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-background/80 dark:bg-background/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-border/40 hover:border-coral/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-coral/5 to-transparent dark:from-coral/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              
              <div className="relative z-10">
                <div className="text-4xl mb-4 group-hover:scale-125 group-hover:animate-bounce transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-xl mb-3 text-foreground group-hover:text-coral transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-coral rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300 animate-ping" />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-coral/10 to-raspberry/10 rounded-3xl p-12 sm:p-16 border border-coral/20">
          <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-foreground">
            Ready to Build Something Amazing?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust BrainyBox for their next project.
            Start building with our premium solutions today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleContactNavigation}
              className="bg-gradient-to-r from-coral to-raspberry hover:from-coral/90 hover:to-raspberry/90 text-white px-10 py-6 text-lg font-bold transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_20px_60px_rgba(226,109,90,0.4)] rounded-xl"
            >
              <span className="mr-2">🚀</span>
              Start Building Now
            </Button>
            <Button
              onClick={handleWhatsAppRedirection}
              variant="outline"
              className="bg-background/80 backdrop-blur-md border-2 border-border/50 hover:bg-background/90 hover:border-border/60 px-10 py-6 text-lg font-bold transition-all duration-300 hover:-translate-y-1 hover:scale-105 rounded-xl"
            >
              <span className="mr-2">💬</span>
              Talk to Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;