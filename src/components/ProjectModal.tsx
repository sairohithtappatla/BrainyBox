import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '@/pages/Index';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const handleGetProject = () => {
    const phoneNumber = '918247439347';
    const projectName = project.title;
    const projectTags = project.tags.join(', ');

    const message = encodeURIComponent(
      `Hello BrainyBox Team!

I'm interested in getting this amazing project:

Project Name: ${projectName}
Technologies: ${projectTags}
Project ID: #${project.id}

Could you please provide me with:
• Project cost & pricing details
• What's included in the package
• Delivery timeline
• Academic compliance confirmation
• Documentation and support details

I'm excited to work with this project for my academic/learning purposes!

Looking forward to hearing from you soon!`
    );

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
        >
          <X className="w-6 h-6 text-charcoal" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{project.icon}</div>
            <h2 className="font-poppins text-4xl font-bold text-charcoal mb-4">{project.title}</h2>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-coral/20 text-coral px-4 py-2 rounded-full text-sm font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Image Carousel */}
          <div className="relative mb-8 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={project.images[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-80 object-cover"
            />

            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6 text-charcoal" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6 text-charcoal" />
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentImageIndex
                        ? 'bg-coral scale-125'
                        : 'bg-white/70 hover:bg-white'
                        }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="font-poppins text-2xl font-semibold text-charcoal mb-4">About This Project</h3>
            <p className="text-charcoal/80 leading-relaxed text-lg">{project.description}</p>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h3 className="font-poppins text-xl font-semibold text-charcoal mb-4">Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-coral/20 text-coral px-4 py-2 rounded-full font-medium hover:bg-coral/30 transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-cream to-coral/10 rounded-2xl p-6 text-center">
            <h3 className="font-poppins text-xl font-semibold text-charcoal mb-4">Ready to bring this project to life? 🚀</h3>
            <p className="text-charcoal/70 mb-6 text-sm leading-relaxed">
              Get this complete project with source code, documentation, and full support. Perfect for academic submissions and learning!
            </p>
            <button
              onClick={handleGetProject}
              className="bg-gradient-to-r from-coral to-raspberry text-white px-12 py-4 rounded-2xl font-poppins font-semibold text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-coral/90 hover:to-raspberry/90 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <span>🎯 Get This Project Now</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-raspberry to-coral opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <p className="text-charcoal/60 mt-4 text-sm">
              💡 Instant delivery • 🔧 Full source code • 🎓 Academic ready
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
