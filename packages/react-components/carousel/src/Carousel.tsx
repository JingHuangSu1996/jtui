import React, { useLayoutEffect, useContext } from 'react';
import { CarouselNextButton as NextButton } from './CarouselNextButton';
import { CarouselPrevButton as PrevButton } from './CarouselPrevButton';
import { styled, theme } from '@jtui/theme';
import CarouselContext from './context';
import useHorizontalScroll from './hooks/useHorizontalScroll';
import useInterval from './hooks/useInterval';

type CarouselRootProps = {
  children?: React.ReactNode;
  scrollTo?: number;
  loop?: boolean;
  hideScrollbar?: boolean;
  step?: number;
  showArrows?: boolean;
  selectedIndex?: number;
  autoPlayDelay?: number;
};

const CarouselWrapper = styled('div', {
  position: 'relative',
  width: '100%',
});

const CardWrapper = styled('div', {
  display: 'flex',
  overflowX: 'auto',
  overflowY: 'hidden',
  height: 'auto',
  gap: '1rem', // replace with your value
  WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '& > li': {
    listStyle: 'none',
    '&::before': {
      position: 'absolute',
    },
  },
  '& > *': {
    flex: '0 0 auto',
  },
  '& > img': {
    height: '100%',
    flexBasis: 'auto',
    width: 'auto',
  },
  scrollSnapType: 'x mandatory',

  variants: {
    autoSlideDelay: {
      true: { overflowX: 'hidden' },
      false: {},
    },
    isRLT: {
      flexDirection: 'row-reverse',
    },
    horizontalEdgeGap: {
      true: {
        padding: (value) => `0 ${value}`,
        margin: (value) => `0 ${-value}`,
      },
      false: {},
    },
    hideScrollbar: {
      true: {
        '&::-webkit-scrollbar': { display: 'none' },
        '-ms-overflow-style': 'none',
        scrollbarWidth: 'none',
      },
      false: {},
    },
    currentScrollingSpec: {
      true: {
        scrollSnapType: 'x mandatory',
        scrollSnapDestination: 'unset',
        scrollSnapPointsX: 'unset',
      },
      false: {},
    },
  },
});

const StyleItem = styled('li', {
  display: 'flex',
  backgroundColor: theme.colors['color-background-secondary-base'],
  borderRadius: '$100',
  boxShadow: '0 4px 6px 0 hsla(0, 0%, 0%, 0.07), 0 1px 3px 0 hsla(0, 0%, 0%, 0.06)',
  padding: '$200',
  margin: '$200',
  minWidth: '300px',
  height: '200px',

  scrollSnapCoordinate: '0 0',
  variants: {
    currentScrollingSpec: {
      true: {
        scrollSnapAlign: 'center',
        scrollSnapCoordinate: 'unset',
      },
    },
  },
});

export const Item = ({ children, classNames }: { children: React.ReactNode; classNames?: string }) => {
  const { itemRef } = useContext(CarouselContext);

  return (
    <StyleItem className={classNames} ref={itemRef} currentScrollingSpec>
      {children}
    </StyleItem>
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
          <CardWrapper currentScrollingSpec ref={containerRef} horizontalEdgeGap hideScrollbar={hideScrollbar}>
            {children}
          </CardWrapper>
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
