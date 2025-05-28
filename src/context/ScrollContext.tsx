import React, { createContext, useContext, useState } from 'react';

interface ScrollContextType {
  targetSection: string | null;
  setTargetSection: (section: string | null) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [targetSection, setTargetSection] = useState<string | null>(null);
  return (
    <ScrollContext.Provider value={{ targetSection, setTargetSection }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScrollContext must be used within ScrollProvider");
  }
  return context;
};
