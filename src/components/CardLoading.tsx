import React from 'react';

interface CardLoadingProps {
  count?: number;
  className?: string;
}

const CardLoading = ({ count = 6, className = '' }: CardLoadingProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 ${className}`}>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="bg-background/80 dark:bg-background/90 backdrop-blur-md rounded-3xl p-6 border border-border/40 animate-pulse"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Icon placeholder */}
          <div className="w-16 h-16 bg-gradient-to-r from-coral/20 to-raspberry/20 rounded-2xl mb-4 animate-pulse"></div>
          
          {/* Title placeholder */}
          <div className="space-y-3 mb-4">
            <div className="h-6 bg-gradient-to-r from-coral/10 to-raspberry/10 rounded-lg animate-pulse"></div>
            <div className="h-4 bg-gradient-to-r from-coral/5 to-raspberry/5 rounded-lg w-3/4 animate-pulse"></div>
          </div>
          
          {/* Description placeholder */}
          <div className="space-y-2 mb-6">
            <div className="h-3 bg-border/30 rounded animate-pulse"></div>
            <div className="h-3 bg-border/30 rounded animate-pulse"></div>
            <div className="h-3 bg-border/30 rounded w-2/3 animate-pulse"></div>
          </div>
          
          {/* Tags placeholder */}
          <div className="flex gap-2 mb-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-6 w-16 bg-coral/10 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
          
          {/* Author and price placeholder */}
          <div className="flex justify-between items-center">
            <div className="h-4 w-20 bg-border/30 rounded animate-pulse"></div>
            <div className="h-6 w-12 bg-gradient-to-r from-raspberry/20 to-coral/20 rounded animate-pulse"></div>
          </div>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-coral/5 to-transparent animate-shimmer opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
        </div>
      ))}
    </div>
  );
};

export default CardLoading;