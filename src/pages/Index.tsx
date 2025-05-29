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
    images: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"]
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

        {/* SEO Content Section */}
        <section className="py-16 bg-background">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group bg-white dark:bg-gray-800/90 rounded-2xl p-6 shadow-lg hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-coral/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer relative overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="absolute inset-0 bg-gradient-to-br from-coral/5 to-transparent dark:from-coral/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-4 group-hover:scale-125 group-hover:animate-bounce transition-transform duration-300">💰</div>
                  <h2 className="text-xl font-bold mb-4 text-coral group-hover:text-coral dark:group-hover:text-coral/90 transition-colors duration-300">Affordable Code Marketplace</h2>
                  <p className="text-gray-600 dark:text-gray-200 transition-colors duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-100">
                    Buy premium programming projects at student-friendly prices. Complete source code starting from just ₹999 - quality education shouldn't break the bank.
                  </p>
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-coral rounded-full opacity-0 group-hover:opacity-80 dark:group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
              </div>

              <div className="group bg-white dark:bg-gray-800/90 rounded-2xl p-6 shadow-lg hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-raspberry/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer relative overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="absolute inset-0 bg-gradient-to-br from-raspberry/5 to-transparent dark:from-raspberry/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-4 group-hover:scale-125 group-hover:animate-bounce transition-transform duration-300">🎓</div>
                  <h2 className="text-xl font-bold mb-4 text-coral group-hover:text-raspberry dark:group-hover:text-raspberry/90 transition-colors duration-300">Budget-Friendly Student Projects</h2>
                  <p className="text-gray-600 dark:text-gray-200 transition-colors duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-100">
                    Comprehensive collection of academic projects for PPS, OODP, DSA, DBMS, AI/ML, and FSD at prices students can actually afford.
                  </p>
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-raspberry rounded-full opacity-0 group-hover:opacity-80 dark:group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
              </div>

              <div className="group bg-white dark:bg-gray-800/90 rounded-2xl p-6 shadow-lg hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-coral/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer relative overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="absolute inset-0 bg-gradient-to-br from-coral/5 to-transparent dark:from-coral/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-4 group-hover:scale-125 group-hover:animate-bounce transition-transform duration-300">⚡</div>
                  <h2 className="text-xl font-bold mb-4 text-coral group-hover:text-coral dark:group-hover:text-coral/90 transition-colors duration-300">Instant Value</h2>
                  <p className="text-gray-600 dark:text-gray-200 transition-colors duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-100">
                     Maximum value at minimum cost - learn from professionally written, affordable code solutions.
                  </p>
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-coral rounded-full opacity-0 group-hover:opacity-80 dark:group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
              </div>
            </div>

            {/* SEO Text Content */}
            <div className="mt-12 prose max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-6 text-foreground dark:text-gray-100">Why Choose BrainyBox for Programming Projects?</h2>
              <div className="text-gray-600 dark:text-gray-300 space-y-4">
                <p>
                  <strong>BrainyBox</strong> is the most affordable marketplace for premium programming projects. Whether you're a student on a tight budget or looking for cost-effective academic solutions, we offer 500+ high-quality projects at student-friendly prices.
                </p>
                <p>
                  Our collection includes budget-friendly projects for <strong>Programming for Problem Solving (PPS)</strong>, <strong>Object-Oriented Design & Programming (OODP)</strong>, <strong>Data Structures & Algorithms (DSA)</strong> - starting from just ₹499.
                </p>
                <p>
                  Each affordable project comes with complete source code and implementation guides. Perfect for students who want quality education without the premium price tag.
                </p>
              </div>
            </div>
          </div>
        </section>

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
