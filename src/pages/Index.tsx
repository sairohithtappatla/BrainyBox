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
import EnhancedAIBot from '../components/EnhancedAIBot';
import { useScrollContext } from '@/context/ScrollContext';

export interface Project {
  id: number;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  images: string[];
}

const sampleProjects: Project[] = [
  {
    id: 128,
    title: "Chatbot Development",
    description: "AI chatbot using natural language processing with machine learning for intelligent conversations and customer support.",
    icon: "💬",
    tags: ["AI/ML", "NLP", "Chatbot"],
    images: ["https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800", "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800"]
  },
  {
    id: 29,
    title: "Game Development Engine",
    description: "Object-oriented game engine with physics simulation, graphics rendering, collision detection, and modular architecture.",
    icon: "🎮",
    tags: ["OODP", "Game Engine", "Graphics"],
    images: ["https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800", "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800"]
  },
  {
    id: 201,
    title: "Real-time Face Detection",
    description: "OpenCV-based face detection system with real-time video processing using Haar cascades and deep learning models.",
    icon: "👤",
    tags: ["Computer Vision", "OpenCV", "Face Detection"],
    images: ["https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800", "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800"]
  },
  {
    id: 255,
    title: "Stock Price Predictor",
    description: "Financial prediction model using Python with real-time data fetching and LSTM neural networks.",
    icon: "📈",
    tags: ["Python", "Finance", "Prediction", "Neural Networks"],
    images: ["https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800", "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800"]
  },
  {
    id: 151,
    title: "Secure File Encryption Tool",
    description: "Advanced cryptography project implementing AES, RSA encryption algorithms with digital signatures and key management.",
    icon: "🔐",
    tags: ["Cryptography", "Security", "Encryption"],
    images: ["https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"]
  },
  {
    id: 226,
    title: "E-Commerce Platform",
    description: "Complete online shopping platform with React frontend, Node.js backend, MongoDB database, and payment integration.",
    icon: "🛒",
    tags: ["FSD", "React", "Node.js", "MongoDB"],
    images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"]
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
    <ThemeProvider>
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

        {/* Enhanced AI Bot */}
        <EnhancedAIBot />
      </div>
    </ThemeProvider>
  );
};

export default Index;
