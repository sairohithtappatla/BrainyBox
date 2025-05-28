import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ProjectCard from './ProjectCard';
import SimpleLoading from './SimpleLoading';
import { Project } from '../pages/Index';
import { useMinimumLoading } from '../hooks/useMinimumLoading';

interface ProjectsGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  showViewMore?: boolean;
  onViewMore?: () => void;
}

const ProjectsGrid = ({ projects, onProjectClick, showViewMore = true, onViewMore }: ProjectsGridProps) => {
  // Use the custom hook for consistent timing
  const isLoading = useMinimumLoading(1200); // 1.2 seconds

  if (isLoading) {
    return (
      <section className="pt-8 sm:pt-12 pb-12 sm:pb-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-poppins text-4xl sm:text-5xl font-bold text-foreground dark:text-white mb-4 sm:mb-6">
            Featured <span className="text-coral dark:text-coral">Projects</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover amazing student projects from talented creators around the world.
            From AI innovations to sustainable solutions, find inspiration for your next big idea.
          </p>
        </div>
        
        {/* Enhanced loading with better dark theme */}
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="bg-background/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-border/40 dark:border-gray-700/60 dark-theme-glow">
            <div className="flex flex-col items-center space-y-3">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-3 border-coral/20 dark:border-coral/40"></div>
                <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-coral dark:border-t-coral animate-spin" style={{ animationDuration: '0.8s' }}></div>
                {/* Enhanced glow for dark theme */}
                <div className="absolute inset-0 rounded-full bg-coral/10 dark:bg-coral/20 animate-pulse opacity-60"></div>
              </div>
              <p className="text-foreground dark:text-white font-medium text-sm">Loading projects...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-8 sm:pt-12 pb-12 sm:pb-16 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="font-poppins text-4xl sm:text-5xl font-bold text-foreground dark:text-white mb-4 sm:mb-6">
          Featured <span className="text-coral dark:text-coral">Projects</span>
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Discover amazing student projects from talented creators around the world.
          From AI innovations to sustainable solutions, find inspiration for your next big idea.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <ProjectCard
              project={project}
              onClick={() => onProjectClick(project)}
            />
          </div>
        ))}
      </div>

      {showViewMore && (
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <Button 
            onClick={onViewMore}
            className="bg-gradient-to-r from-coral to-raspberry hover:from-coral/90 hover:to-raspberry/90 text-white px-12 py-6 text-lg font-bold transition-all duration-300 hover:-translate-y-2 hover:scale-110 hover:shadow-[0_25px_80px_rgba(226,109,90,0.4)] dark:hover:shadow-[0_25px_80px_rgba(226,109,90,0.6)] rounded-xl shadow-lg group dark-theme-glow"
          >
            <span className="mr-3 text-xl group-hover:animate-bounce">🚀</span>
            View All Projects
          </Button>
        </div>
      )}
    </section>
  );
};

export default ProjectsGrid;
