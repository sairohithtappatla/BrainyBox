import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Code2,
  Settings2,
  Coffee,
  Binary,
  Database,
  Bot,
  Shield,
  Image,
  Eye,
  Globe,
  FileCode2,
  Laptop
} from 'lucide-react';

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
    const message = encodeURIComponent("I'm looking for academic programming projects, can you help me out?");
    const whatsappUrl = `https://wa.me/15551234567?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // Function to navigate to projects with category filter
  const handleExploreProjects = (solutionTitle: string) => {
    // Map solution titles to appropriate academic categories
    const categoryMap: { [key: string]: string } = {
      'Programming for Problem Solving': 'PPS',
      'Object-Oriented Design': 'OODP',
      'Advanced Programming Practice': 'APP',
      'Data Structures & Algorithms': 'DSA',
      'Database Management Systems': 'DBMS',
      'Artificial Intelligence': 'AI/ML',
      'Cryptography & Security': 'Cryptography',
      'Digital Image Processing': 'Digital Image Processing',
      'Computer Vision': 'Computer Vision',
      'Full Stack Development': 'FSD',
      'Python Programming': 'Python',
      'Java Development': 'Java'
    };

    const category = categoryMap[solutionTitle] || 'All';
    navigate(`/projects?category=${encodeURIComponent(category)}`);
  };

  const solutions = [
    {
      title: 'Programming for Problem Solving',
      description: 'C programming fundamentals with algorithmic problem-solving and structured programming.',
      icon: Code2,
      features: ['C Programming', 'Algorithm Design', 'Problem Solving', 'Structured Programming'],
      color: 'coral',
      projects: '120+'
    },
    {
      title: 'Object-Oriented Design',
      description: 'Object-oriented programming concepts using C++ with inheritance and polymorphism.',
      icon: Settings2,
      features: ['C++ Programming', 'OOP Concepts', 'Inheritance', 'Polymorphism'],
      color: 'raspberry',
      projects: '100+'
    },
    {
      title: 'Advanced Programming Practice',
      description: 'Enterprise Java applications with GUI development and advanced programming techniques.',
      icon: Laptop,
      features: ['Java Programming', 'GUI Development', 'Multi-threading', 'Enterprise Applications'],
      color: 'coral',
      projects: '150+'
    },
    {
      title: 'Data Structures & Algorithms',
      description: 'Implementation and analysis of data structures with algorithmic problem solving.',
      icon: Binary,
      features: ['Data Structures', 'Algorithm Analysis', 'Time Complexity', 'Graph Algorithms'],
      color: 'raspberry',
      projects: '200+'
    },
    {
      title: 'Database Management Systems',
      description: 'Relational database design, SQL programming, and database administration concepts.',
      icon: Database,
      features: ['SQL Programming', 'Database Design', 'Normalization', 'Transaction Management'],
      color: 'coral',
      projects: '80+'
    },
    {
      title: 'Artificial Intelligence',
      description: 'Machine learning algorithms, AI applications, and intelligent system development.',
      icon: Bot,
      features: ['Machine Learning', 'Neural Networks', 'Natural Language Processing', 'Computer Intelligence'],
      color: 'raspberry',
      projects: '90+'
    },
    {
      title: 'Cryptography & Security',
      description: 'Information security, encryption algorithms, and secure system development.',
      icon: Shield,
      features: ['Encryption Algorithms', 'Digital Signatures', 'Network Security', 'Blockchain'],
      color: 'coral',
      projects: '60+'
    },
    {
      title: 'Digital Image Processing',
      description: 'Image enhancement, filtering, and analysis using MATLAB and advanced techniques.',
      icon: Image,
      features: ['Image Enhancement', 'Digital Filters', 'MATLAB Programming', 'Signal Processing'],
      color: 'raspberry',
      projects: '70+'
    },
    {
      title: 'Computer Vision',
      description: 'Real-time image processing, object detection, and visual recognition systems.',
      icon: Eye,
      features: ['OpenCV', 'Object Detection', 'Image Recognition', 'Real-time Processing'],
      color: 'coral',
      projects: '85+'
    },
    {
      title: 'Full Stack Development',
      description: 'Complete web application development with modern frameworks and databases.',
      icon: Globe,
      features: ['React/Angular', 'Node.js/Express', 'MongoDB/MySQL', 'REST APIs'],
      color: 'raspberry',
      projects: '110+'
    },
    {
      title: 'Python Programming',
      description: 'Python applications for data analysis, automation, and scientific computing.',
      icon: FileCode2,
      features: ['Data Analytics', 'Web Scraping', 'Scientific Computing', 'Automation'],
      color: 'coral',
      projects: '130+'
    },
    {
      title: 'Java Development',
      description: 'Enterprise Java applications with Spring framework and advanced Java concepts.',
      icon: Coffee,
      features: ['Spring Framework', 'Enterprise Applications', 'Java EE', 'Microservices'],
      color: 'raspberry',
      projects: '140+'
    },
  ];

  return (
    <section className="py-20 sm:py-24 px-6 bg-background relative overflow-hidden" id="solutions">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-coral/8 rounded-full blur-3xl animate-float opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-raspberry/8 rounded-full blur-3xl animate-float opacity-60" style={{ animationDelay: '2s' }} />
        <div className="absolute top-3/4 left-3/4 w-40 h-40 bg-coral/6 rounded-full blur-2xl animate-bounce-gentle opacity-40" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 bg-coral/25 dark:bg-coral/35 border-2 border-coral/50 dark:border-coral/60 px-6 py-3 rounded-full mb-8 text-base font-bold text-coral shadow-xl backdrop-blur-md animate-fade-in-up hover:scale-105 transition-transform duration-300">
            <span className="text-lg animate-bounce-gentle">🎓</span>
            <span className="text-coral font-bold">Academic Programming Solutions</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-foreground leading-tight">
            Comprehensive{' '}
            <span className="bg-gradient-to-r from-raspberry to-coral bg-clip-text text-transparent">
              CSE Curriculum Projects
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Master every aspect of Computer Science Engineering with our
            <span className="text-coral font-semibold"> affordable, high-quality projects</span> covering
            all major programming subjects at student-friendly prices.
          </p>
        </div>

        {/* Solutions Grid - Updated to 3x4 for 12 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-24">
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <div
                key={index}
                className="group bg-background/80 dark:bg-background/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-border/40 dark:border-border/50 hover:border-coral/50 dark:hover:border-coral/60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer relative overflow-hidden shadow-lg hover:shadow-coral/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-${solution.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

                <div className="relative z-10">
                  {/* Icon and Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-2xl bg-${solution.color}/10 group-hover:bg-${solution.color}/20 transition-colors duration-300`}>
                      <IconComponent className={`w-8 h-8 text-${solution.color} group-hover:scale-110 transition-transform duration-300`} />
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
            Quality Projects at Student Prices
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Don't break the bank for quality projects. Get premium academic solutions starting from just ₹999!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleContactNavigation}
              className="bg-gradient-to-r from-coral to-raspberry hover:from-coral/90 hover:to-raspberry/90 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              💰 Get Student Pricing
            </Button>
            <Button
              onClick={() => navigate('/projects')}
              variant="outline"
              className="px-8 py-3 text-lg font-semibold rounded-xl border-2 hover:bg-coral/10 transition-all duration-300"
            >
              View Affordable Projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;