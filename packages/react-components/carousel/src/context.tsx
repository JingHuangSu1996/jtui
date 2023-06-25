import React, { useContext } from 'react';

type CarouselContextType = {
  itemRef: (element: HTMLElement) => void;
  scrollLeftToStep: () => void;
  scrollRightToStep: () => void;
  containerRef: React.RefObject<HTMLElement>;
  scrollToIndex: (index: number) => void;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  firstVisibleIndex: number;
  lastVisibleIndex: number;
  showArrows: boolean;
};

const CarouselContext = React.createContext<CarouselContextType | null>(null);

const useCarouselContext = () => {
  const carouselContext = useContext(CarouselContext);
  if (!carouselContext) {
    throw new Error('useCarouselContext must be used within a CarouselContextProvider');
  }
  return carouselContext;
};

export { CarouselContext, useCarouselContext };
