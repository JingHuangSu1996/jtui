import { styled, theme } from '@jtui/theme';

const CarouselWrapper = styled('div', {
  position: 'relative',
  width: '100%',
});

const StyledItemsWrapper = styled('div', {
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

const StyledItem = styled('li', {
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

export { CarouselWrapper, StyledItemsWrapper, StyledItem };
