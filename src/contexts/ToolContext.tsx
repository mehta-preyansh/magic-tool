"use client"

import { DashboardData } from "@/app/api/generate-data/route";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface ToolContextType {
  data: DashboardData | null;
  setData: (data: DashboardData | null) => void;
}

const ToolContext = createContext<ToolContextType | undefined>(undefined);
export const useToolContext = () => {
  const ctx = useContext(ToolContext);
  if (!ctx) throw new Error('useToolContext must be used inside ToolContextProvider');
  return ctx;
};

export const ToolContextProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<DashboardData | null>(null);
  useEffect(() => {

  }, []);


  return (
    <ToolContext.Provider value={{data, setData}}>
      {children}
    </ToolContext.Provider>
  );
};
