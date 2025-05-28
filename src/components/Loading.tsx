import React from 'react';
import { useTheme } from './theme-provider';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  type?: 'spinner' | 'dots' | 'pulse' | 'gradient';
  text?: string;
  className?: string;
}

const Loading = ({ 
  size = 'md', 
  type = 'gradient', 
  text = 'Loading amazing projects...',
  className = '' 
}: LoadingProps) => {
  const { theme } = useTheme();

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const renderSpinner = () => (
    <div className={`${sizeClasses[size]} relative`}>
      <div className="absolute inset-0 rounded-full border-4 border-coral/20 dark:border-coral/30"></div>
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-coral animate-spin"></div>
      <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-raspberry animate-spin animation-reverse" style={{ animationDuration: '0.8s' }}></div>
    </div>
  );

  const renderDots = () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-6 h-6'} bg-gradient-to-r from-coral to-raspberry rounded-full animate-bounce`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div className={`${sizeClasses[size]} relative`}>
      <div className="absolute inset-0 bg-gradient-to-r from-coral to-raspberry rounded-full animate-ping opacity-75"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-coral to-raspberry rounded-full opacity-60"></div>
      <div className="absolute inset-2 bg-gradient-to-r from-raspberry to-coral rounded-full animate-pulse"></div>
    </div>
  );

  const renderGradient = () => (
    <div className={`${sizeClasses[size]} relative`}>
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-coral via-raspberry to-coral animate-spin opacity-80"
           style={{ background: 'conic-gradient(from 0deg, #E26D5A, #C3073F, #E26D5A)' }}>
      </div>
      {/* Inner circle */}
      <div className="absolute inset-1 rounded-full bg-background dark:bg-background"></div>
      {/* Center dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 bg-gradient-to-r from-coral to-raspberry rounded-full animate-pulse"></div>
      </div>
      {/* Particles */}
      <div className="absolute -inset-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-coral rounded-full animate-ping opacity-60"
            style={{
              top: `${20 + Math.sin(i * 90 * Math.PI / 180) * 40}%`,
              left: `${20 + Math.cos(i * 90 * Math.PI / 180) * 40}%`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
    </div>
  );

  const renderLoader = () => {
    switch (type) {
      case 'spinner':
        return renderSpinner();
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'gradient':
      default:
        return renderGradient();
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <div className="relative">
        {renderLoader()}
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-coral/20 to-raspberry/20 rounded-full blur-xl animate-pulse opacity-50"></div>
      </div>
      
      {text && (
        <div className="text-center space-y-2">
          <p className={`font-medium text-foreground dark:text-foreground ${textSizes[size]}`}>
            {text}
          </p>
          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1 h-1 bg-coral rounded-full animate-bounce opacity-60"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Loading;