import React, { useLayoutEffect } from 'react';

import useHorizontalScroll from './hooks/useHorizontalScroll';
import useInterval from './hooks/useInterval';
import { useCarouselContext, CarouselContext } from './context';
import { CarouselNextButton as NextButton } from './CarouselNextButton';
import { CarouselPrevButton as PrevButton } from './CarouselPrevButton';
import { CarouselWrapper, StyledItemsWrapper, StyledItem } from './Carousel.style';

type CarouselRootProps = {
  children: React.ReactNode;
  scrollTo?: number;
  loop?: boolean;
  hideScrollbar?: boolean;
  step?: number;
  showArrows?: boolean;
  selectedIndex?: number;
  autoPlayDelay?: number;
};

const Item = ({ children, classNames }: { children: React.ReactNode; classNames?: string }) => {
  const { itemRef } = useCarouselContext();

  return (
    <StyledItem className={classNames} ref={itemRef} currentScrollingSpec>
      {children}
    </StyledItem>
  );
};

const CarouselRoot = React.forwardRef<HTMLDivElement, CarouselRootProps>(
  ({ children, scrollTo = 5, loop, hideScrollbar = true, step, showArrows, selectedIndex, autoPlayDelay }, ref) => {
    const {
      itemRef,
      scrollLeftToStep,
      scrollRightToStep,
      containerRef,
      scrollToIndex,
      canScrollLeft,
      canScrollRight,
      firstVisibleIndex,
      lastVisibleIndex,
    } = useHorizontalScroll({ scrollStep: step || 1, scrollTo });

    useLayoutEffect(() => {
      if (selectedIndex) {
        scrollToIndex(selectedIndex);
      }
    }, [selectedIndex]);

    useInterval(() => canScrollRight && scrollRightToStep(), autoPlayDelay);

    return (
      <CarouselContext.Provider
        value={{
          itemRef,
          scrollLeftToStep,
          scrollRightToStep,
          containerRef,
          scrollToIndex,
          canScrollLeft,
          canScrollRight,
          firstVisibleIndex,
          lastVisibleIndex,
          showArrows,
        }}
      >
        <CarouselWrapper>
          <PrevButton />
          <StyledItemsWrapper currentScrollingSpec horizontalEdgeGap hideScrollbar={hideScrollbar} ref={containerRef}>
            {children}
          </StyledItemsWrapper>
          <NextButton />
        </CarouselWrapper>
      </CarouselContext.Provider>
    );
  },
);

CarouselRoot.displayName = 'Carousel';

export const Carousel = Object.assign(CarouselRoot, {
  Item,
  PrevButton,
  NextButton,
});

export type { CarouselRootProps };
