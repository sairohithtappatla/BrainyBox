import React from 'react';

interface SimpleLoadingProps {
  text?: string;
}

const SimpleLoading = ({ text = 'Loading...' }: SimpleLoadingProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 dark:bg-black/90 backdrop-blur-sm">
      {/* Enhanced centered loading card for dark theme */}
      <div className="bg-background/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-border/40 dark:border-gray-700/60 max-w-xs mx-4 dark-theme-glow">
        {/* Loading animation */}
        <div className="flex flex-col items-center space-y-4">
          {/* Enhanced animated spinner for dark theme */}
          <div className="relative w-14 h-14">
            {/* Outer ring with enhanced dark theme */}
            <div className="absolute inset-0 rounded-full border-4 border-coral/20 dark:border-coral/40"></div>
            {/* Spinning ring with glow effect */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-coral dark:border-t-coral animate-spin" style={{ animationDuration: '0.8s' }}></div>
            {/* Enhanced inner pulsing dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-gradient-to-r from-coral to-raspberry rounded-full animate-pulse shadow-lg dark:shadow-coral/50" style={{ animationDuration: '1.2s' }}></div>
            </div>
            {/* Enhanced glow effect for dark theme */}
            <div className="absolute inset-0 rounded-full bg-coral/10 dark:bg-coral/25 animate-pulse opacity-60 blur-sm"></div>
          </div>

          {/* Enhanced loading text */}
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground dark:text-white mb-2">
              {text}
            </p>
            {/* Enhanced animated dots */}
            <div className="flex justify-center space-x-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-coral dark:bg-coral rounded-full animate-bounce shadow-sm dark:shadow-coral/30"
                  style={{ 
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '1s'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-coral/8 to-raspberry/8 dark:from-coral/15 dark:to-raspberry/15 rounded-2xl opacity-60 animate-pulse pointer-events-none" style={{ animationDuration: '2s' }}></div>
      </div>
    </div>
  );
};

export default SimpleLoading;