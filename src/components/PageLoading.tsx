import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import { useTheme } from './theme-provider';

interface PageLoadingProps {
  text?: string;
  showLogo?: boolean;
}

const PageLoading = ({ 
  text = 'Loading BrainyBox...', 
  showLogo = true 
}: PageLoadingProps) => {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        // Smooth progress increment
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 dark:bg-background/98 backdrop-blur-md">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-coral/30 rounded-full animate-float opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main loading content */}
      <div className="relative z-10 text-center">
        {showLogo && (
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-coral via-raspberry to-coral bg-clip-text text-transparent tracking-tight animate-pulse mb-4">
              BrainyBox
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-coral to-raspberry rounded-full mx-auto animate-pulse"></div>
          </div>
        )}

        <Loading 
          size="lg" 
          type="gradient" 
          text={text}
          className="scale-110"
        />

        {/* Enhanced Progress bar with percentage */}
        <div className="mt-8 w-80 mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Loading...</span>
            <span className="text-sm font-semibold text-coral">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-border/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-coral to-raspberry rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Loading tips */}
        <div className="mt-6 max-w-md mx-auto">
          <p className="text-sm text-muted-foreground animate-pulse">
            Preparing your development experience...
          </p>
        </div>
      </div>

      {/* Enhanced decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-coral/5 rounded-full blur-3xl animate-float opacity-60" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-raspberry/5 rounded-full blur-2xl animate-float opacity-60" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/6 w-16 h-16 bg-lavender/10 rounded-full blur-xl animate-bounce-gentle opacity-40" style={{ animationDelay: '1s' }} />
    </div>
  );
};

export default PageLoading;