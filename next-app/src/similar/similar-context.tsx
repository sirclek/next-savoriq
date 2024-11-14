import type { Id } from '@/common/custom-types';
import { createContext, ReactNode, useContext, useState } from 'react';

type SimilarHoverContextType = {
  hoveredWhiskeyId:  Id | null;
  setHoveredWhiskeyId: (id: Id | null) => void;
};

const SimilarHoverContext = createContext<SimilarHoverContextType | undefined>(undefined);

export const SimilarHoverProvider = ({ children }: { children: ReactNode }) => {
  const [hoveredWhiskeyId, setHoveredWhiskeyId] = useState<Id | null>(null);

  return <SimilarHoverContext.Provider value={{ hoveredWhiskeyId, setHoveredWhiskeyId }}>{children}</SimilarHoverContext.Provider>;
};

export const useHover = () => {
  const context = useContext(SimilarHoverContext);
  if (!context) {
    throw new Error('useHover must be used within a HoverProvider');
  }
  return context;
};
