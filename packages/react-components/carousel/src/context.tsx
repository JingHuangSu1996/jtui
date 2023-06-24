import React from 'react';

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

export default CarouselContext;
