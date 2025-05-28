import { useState, useEffect } from 'react';

export const useMinimumLoading = (minDuration: number = 1200) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration]);

  return isLoading;
};