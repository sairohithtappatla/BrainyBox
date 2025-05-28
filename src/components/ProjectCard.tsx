import React, { useState } from 'react';
import { Project } from '../pages/Index';
import LazyImage from './LazyImage';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-background/80 dark:bg-gray-900/90 backdrop-blur-md rounded-3xl p-6 border border-border/40 dark:border-gray-700/50 hover:border-coral/50 dark:hover:border-coral/60 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 shadow-lg dark:shadow-2xl hover:shadow-xl dark:hover:shadow-coral/20 relative overflow-hidden dark-theme-glow"
    >
      {/* Enhanced project icon */}
      <div className="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
        {project.icon}
      </div>

      {/* Enhanced title */}
      <h3 className="font-bold text-xl sm:text-2xl mb-3 text-foreground dark:text-white group-hover:text-coral dark:group-hover:text-coral transition-colors duration-300 line-clamp-2">
        {project.title}
      </h3>

      {/* Enhanced description */}
      <p className="text-muted-foreground dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3 group-hover:text-muted-foreground/80 dark:group-hover:text-gray-200 transition-colors duration-300">
        {project.description}
      </p>

      {/* Enhanced image preview */}
      <div className="w-full h-48 bg-gradient-to-br from-coral/10 to-raspberry/10 dark:from-coral/20 dark:to-raspberry/20 rounded-2xl mb-6 overflow-hidden shadow-md dark:shadow-lg">
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
      </div>

      {/* Enhanced tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="bg-coral/15 dark:bg-coral/25 text-coral dark:text-coral px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-coral/25 dark:hover:bg-coral/35 transition-colors duration-200 shadow-sm dark:shadow-coral/10"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Enhanced author and price */}
      <div className="flex justify-between items-center">
        <div className="text-muted-foreground dark:text-gray-400 text-sm">
          by <span className="font-semibold text-foreground dark:text-white">{project.author}</span>
        </div>
        <div className="font-bold text-xl text-raspberry dark:text-raspberry shadow-sm">
          {project.price}
        </div>
      </div>

      {/* Enhanced hover glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-coral/5 to-raspberry/5 dark:from-coral/15 dark:to-raspberry/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Dark theme specific glow */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none dark:bg-gradient-to-r dark:from-coral/10 dark:to-raspberry/10 dark:blur-xl"></div>
    </div>
  );
};

export default ProjectCard;
