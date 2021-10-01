import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMedium, setIsMedium] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 600);
    setIsMedium(window.innerWidth < 995);
  }, []);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 600);
    setIsMedium(window.innerWidth < 995);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AppContext.Provider
      value={{ isMobile, setIsMobile, isMedium, setIsMedium }}
    >
      {children}
    </AppContext.Provider>
  );
};
