import React, { Suspense, ComponentType, useState, useEffect } from 'react';
import SimpleLoading from './SimpleLoading';

interface LazyWrapperProps {
  fallback?: React.ReactNode;
  text?: string;
  minLoadingTime?: number;
}

// Enhanced lazy loading wrapper with minimum loading time
const LazyLoadingWrapper = ({
  children,
  fallback,
  text = 'Loading...',
  minLoadingTime = 800 // Increased from 500ms to 800ms
}: LazyWrapperProps & { children: React.ReactNode }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, minLoadingTime);

    return () => clearTimeout(timer);
  }, [minLoadingTime]);

  if (!showContent) {
    return fallback || <SimpleLoading text={text} />;
  }

  return <>{children}</>;
};

// HOC for lazy loading components
export const withLazyLoading = <P extends object>(
  Component: ComponentType<P>,
  options: LazyWrapperProps = {}
) => {
  const {
    fallback,
    text = 'Loading...',
    minLoadingTime = 800 // Increased from 500ms to 800ms
  } = options;

  const LazyComponent = (props: P) => {
    return (
      <Suspense fallback={<div style={{ display: 'none' }} />}>
        <LazyLoadingWrapper
          fallback={fallback}
          text={text}
          minLoadingTime={minLoadingTime}
        >
          <Component {...props} />
        </LazyLoadingWrapper>
      </Suspense>
    );
  };

  LazyComponent.displayName = `withLazyLoading(${Component.displayName || Component.name})`;

  return LazyComponent;
};

// Utility for creating lazy components
export const createLazyComponent = <P extends object>(
  importFunc: () => Promise<{ default: ComponentType<P> }>,
  options: LazyWrapperProps = {}
) => {
  const LazyComponent = React.lazy(importFunc);
  return withLazyLoading(LazyComponent, { ...options, minLoadingTime: options.minLoadingTime || 800 });
};