import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '../components/theme-provider';
import Header from '../components/Header';
import ProjectsGrid from '../components/ProjectsGrid';
import AboutSection from '../components/AboutSection';
import SolutionsSection from '../components/SolutionsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ProjectModal from '../components/ProjectModal';
import FloatingAIBot from '../components/FloatingAIBot';
import { useScrollContext } from '@/context/ScrollContext';

export interface Project {
  id: number;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  images: string[];
  author: string;
  price: string;
}

const sampleProjects: Project[] = [
  {
    id: 1,
    title: "Smart Home Dashboard",
    description: "A beautiful React dashboard for controlling IoT devices with real-time data visualization and responsive design.",
    icon: "🏠",
    tags: ["React", "IoT", "Dashboard"],
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800"],
    author: "Alex Chen",
    price: "$49"
  },
  {
    id: 2,
    title: "AI Study Companion",
    description: "An intelligent study assistant that uses machine learning to adapt to your learning style and schedule.",
    icon: "🤖",
    tags: ["AI", "Python", "Education"],
    images: ["https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800", "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800"],
    author: "Maya Patel",
    price: "$79"
  },
  {
    id: 3,
    title: "Eco-Tracker Mobile App",
    description: "Track your carbon footprint with this beautiful mobile app featuring gamification and social challenges.",
    icon: "🌱",
    tags: ["React Native", "Sustainability", "Mobile"],
    images: ["https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=800", "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800"],
    author: "Jordan Kim",
    price: "$35"
  },
  {
    id: 4,
    title: "Virtual Study Rooms",
    description: "Collaborative virtual spaces for students to study together with video chat, whiteboards, and resource sharing.",
    icon: "📚",
    tags: ["WebRTC", "Collaboration", "Education"],
    images: ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800", "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800"],
    author: "Sam Rodriguez",
    price: "$65"
  },
  {
    id: 5,
    title: "Blockchain Voting System",
    description: "Secure and transparent voting platform using blockchain technology with modern UI and real-time results.",
    icon: "🗳️",
    tags: ["Blockchain", "Security", "Web3"],
    images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800", "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800"],
    author: "Taylor Swift",
    price: "$120"
  },
  {
    id: 6,
    title: "Social Recipe Sharing",
    description: "Connect food lovers worldwide with this recipe sharing platform featuring video tutorials and social features.",
    icon: "👨‍🍳",
    tags: ["Social", "Food", "Community"],
    images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800", "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800"],
    author: "Chef Maria",
    price: "$45"
  }
];

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const navigate = useNavigate();
  const { targetSection, setTargetSection } = useScrollContext();

  const handleViewMore = () => {
    navigate('/projects');
  };

  // Handle scroll to target section after navigation
  useEffect(() => {
    if (targetSection) {
      // Small delay to ensure components are fully rendered
      const timer = setTimeout(() => {
        const element = document.querySelector(targetSection);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setTargetSection(null); // Clear the target section
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [targetSection, setTargetSection]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="brainybox-theme">
      <div className="min-h-screen bg-background">
        {/* Header with Hero Section */}
        <Header />
        
        {/* 1. First: Comprehensive Development Solutions */}
        <SolutionsSection />
        
        {/* 2. Second: Empowering Developers with Premium Solutions */}
        <AboutSection />
        
        {/* 3. Third: Featured Projects */}
        <ProjectsGrid
          projects={sampleProjects}
          onProjectClick={setSelectedProject}
          showViewMore={true}
          onViewMore={handleViewMore}
        />
        
        {/* 4. Contact Section */}
        <ContactSection />
        
        {/* Footer */}
        <Footer />
        
        {/* Project Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
        
        {/* Floating AI Bot */}
        <FloatingAIBot />
      </div>
    </ThemeProvider>
  );
};

export default Index;
