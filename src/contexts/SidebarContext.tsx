// context/SidebarContext.tsx
"use client"
import { createContext, useContext, useState } from 'react';

type SidebarContextType = {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);
export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const value = {
    isOpen,
    toggle: () => setIsOpen(!isOpen),
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
  
  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};

