import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../pages/Index';

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

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md p-6 border-b border-gray-100 flex justify-between items-center rounded-t-3xl">
          <div>
            <h2 className="font-poppins text-3xl font-bold text-charcoal flex items-center gap-3">
              <span className="text-4xl">{project.icon}</span>
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X size={24} className="text-charcoal" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image Carousel */}
          <div className="relative mb-8 rounded-2xl overflow-hidden bg-gray-100">
            <div className="aspect-video relative">
              <img
                src={project.images[currentImageIndex]}
                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-500"
              />

              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <ChevronLeft size={20} className="text-charcoal" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <ChevronRight size={20} className="text-charcoal" />
                  </button>
                </>
              )}
            </div>

            {/* Image Indicators */}
            {project.images.length > 1 && (
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
            <h3 className="font-poppins text-xl font-semibold text-charcoal mb-4">Interested in this project?</h3>
            <button className="bg-gradient-to-r from-coral to-raspberry text-white px-12 py-4 rounded-2xl font-poppins font-semibold text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-coral/90 hover:to-raspberry/90">
              Get Project Details
            </button>
            <p className="text-charcoal/60 mt-4 text-sm">
              Contact us to learn more about this project and implementation details
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
