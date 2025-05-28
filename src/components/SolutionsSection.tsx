import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Code, Smartphone, Globe, Database, Shield, Zap, Cloud, Cpu, Palette, Users, Settings, Rocket } from 'lucide-react';

const SolutionsSection = () => {
  const navigate = useNavigate();

  // Function to handle Contact navigation
  const handleContactNavigation = () => {
    if (window.location.pathname === '/') {
      const contactElement = document.querySelector('#contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
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

  // Function to navigate to projects with category filter
  const handleExploreProjects = (solutionTitle: string) => {
    // Map solution titles to appropriate categories/tags
    const categoryMap: { [key: string]: string } = {
      'Web Applications': 'React',
      'Mobile Apps': 'Mobile',
      'Backend Systems': 'Node.js',
      'DevOps & Security': 'Security',
      'AI & Machine Learning': 'AI',
      'Cloud Solutions': 'Cloud',
      'IoT Systems': 'IoT',
      'UI/UX Design': 'Design',
      'Team Collaboration': 'Collaboration',
      'System Integration': 'Integration',
      'Performance Optimization': 'Performance',
      'Custom Development': 'Custom'
    };

    const category = categoryMap[solutionTitle] || 'All';
    navigate(`/projects?category=${encodeURIComponent(category)}`);
  };

  const solutions = [
    {
      title: 'Web Applications',
      description: 'Full-stack web solutions with modern frameworks like React, Vue, and Angular.',
      icon: Globe,
      features: ['Responsive Design', 'PWA Support', 'SEO Optimized', 'Performance Tuned'],
      color: 'coral',
      projects: '150+'
    },
    {
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      icon: Smartphone,
      features: ['React Native', 'Flutter', 'Native iOS/Android', 'Cross-Platform'],
      color: 'raspberry',
      projects: '100+'
    },
    {
      title: 'Backend Systems',
      description: 'Scalable backend architectures with microservices and cloud integration.',
      icon: Database,
      features: ['Microservices', 'Cloud Native', 'API Gateway', 'Load Balancing'],
      color: 'coral',
      projects: '200+'
    },
    {
      title: 'DevOps & Security',
      description: 'Complete CI/CD pipelines and security-first development practices.',
      icon: Shield,
      features: ['CI/CD Pipelines', 'Container Orchestration', 'Security Scanning', 'Monitoring'],
      color: 'raspberry',
      projects: '80+'
    },
    {
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions powered by machine learning and artificial intelligence.',
      icon: Zap,
      features: ['TensorFlow', 'PyTorch', 'NLP Processing', 'Computer Vision'],
      color: 'coral',
      projects: '60+'
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and serverless application development.',
      icon: Cloud,
      features: ['AWS/Azure/GCP', 'Serverless', 'Kubernetes', 'Auto-Scaling'],
      color: 'raspberry',
      projects: '90+'
    },
    {
      title: 'IoT Systems',
      description: 'Internet of Things solutions with real-time data processing and analytics.',
      icon: Cpu,
      features: ['Hardware Integration', 'Real-time Analytics', 'Edge Computing', 'Data Visualization'],
      color: 'coral',
      projects: '45+'
    },
    {
      title: 'UI/UX Design',
      description: 'Modern user interface design with exceptional user experience principles.',
      icon: Palette,
      features: ['Design Systems', 'Prototyping', 'User Research', 'Accessibility'],
      color: 'raspberry',
      projects: '120+'
    },
    {
      title: 'Team Collaboration',
      description: 'Enterprise collaboration tools and project management solutions.',
      icon: Users,
      features: ['Real-time Chat', 'Project Tracking', 'Team Analytics', 'Integration APIs'],
      color: 'coral',
      projects: '75+'
    },
    {
      title: 'System Integration',
      description: 'Seamless integration between existing systems and new technologies.',
      icon: Settings,
      features: ['Legacy Integration', 'API Development', 'Data Migration', 'Third-party APIs'],
      color: 'raspberry',
      projects: '85+'
    },
    {
      title: 'Performance Optimization',
      description: 'Advanced optimization techniques for high-performance applications.',
      icon: Rocket,
      features: ['Code Optimization', 'Database Tuning', 'Caching Strategies', 'Load Testing'],
      color: 'coral',
      projects: '110+'
    },
    {
      title: 'Custom Development',
      description: 'Tailored solutions built specifically for your unique business requirements.',
      icon: Code,
      features: ['Custom Architecture', 'Legacy Integration', 'Scalable Design', 'Expert Support'],
      color: 'raspberry',
      projects: '120+'
    },
  ];

  return (
    <section className="py-20 sm:py-24 px-6 bg-background relative overflow-hidden" id="solutions">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-coral/8 rounded-full blur-3xl animate-float opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-raspberry/8 rounded-full blur-3xl animate-float opacity-60" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/6 w-40 h-40 bg-lavender/15 rounded-full blur-2xl animate-bounce-gentle opacity-40" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 bg-raspberry/20 dark:bg-raspberry/30 border border-raspberry/40 px-6 py-3 rounded-full mb-8 text-base font-semibold text-raspberry shadow-lg backdrop-blur-md">
            <span className="text-lg">⚡</span>
            <span>Our Solutions</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-foreground leading-tight">
            Comprehensive{' '}
            <span className="bg-gradient-to-r from-raspberry to-coral bg-clip-text text-transparent">
              Development Solutions
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            From web applications to AI-powered systems, we provide
            <span className="text-raspberry font-semibold"> enterprise-grade solutions</span> across
            all major technology stacks and platforms.
          </p>
        </div>

        {/* Solutions Grid - Updated to 3x4 for 12 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-24">
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <div
                key={index}
                className="group bg-background/80 dark:bg-background/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-border/40 hover:border-coral/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-${solution.color}/5 to-transparent dark:from-${solution.color}/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`bg-gradient-to-br from-${solution.color}/10 to-${solution.color}/20 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-7 h-7 text-${solution.color}`} />
                    </div>
                    <div className={`text-xs font-bold bg-${solution.color}/10 text-${solution.color} px-3 py-1 rounded-full`}>
                      {solution.projects}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className={`text-xl font-bold mb-3 text-foreground group-hover:text-${solution.color} transition-colors duration-300`}>
                    {solution.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-5 text-sm">
                    {solution.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {solution.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 bg-${solution.color} rounded-full`} />
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA - Updated with category navigation */}
                  <Button
                    onClick={() => handleExploreProjects(solution.title)}
                    variant="outline"
                    size="sm"
                    className={`w-full bg-background/80 backdrop-blur-md border-2 border-${solution.color}/30 hover:bg-${solution.color}/10 hover:border-${solution.color}/50 transition-all duration-300 text-xs group/btn`}
                  >
                    <span className="mr-2 group-hover/btn:animate-bounce">🚀</span>
                    Explore Projects
                  </Button>
                </div>

                <div className={`absolute -top-2 -right-2 w-3 h-3 bg-${solution.color} rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300 animate-ping`} />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-raspberry/10 to-coral/10 rounded-3xl p-12 sm:p-16 border border-raspberry/20">
          <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-foreground">
            Need a Custom Solution?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our expert team can build tailored solutions that perfectly match your specific requirements and business goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleContactNavigation}
              className="bg-gradient-to-r from-raspberry to-coral hover:from-raspberry/90 hover:to-coral/90 text-white px-10 py-6 text-lg font-bold transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_20px_60px_rgba(195,7,63,0.4)] rounded-xl"
            >
              <span className="mr-2">🎯</span>
              Request Custom Solution
            </Button>
            <Button
              onClick={handleWhatsAppRedirection}
              variant="outline"
              className="bg-background/80 backdrop-blur-md border-2 border-border/50 hover:bg-background/90 hover:border-border/60 px-10 py-6 text-lg font-bold transition-all duration-300 hover:-translate-y-1 hover:scale-105 rounded-xl"
            >
              <span className="mr-2">📞</span>
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;