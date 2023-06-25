import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { styled, theme } from '@jtui/theme';
import { useCarouselContext } from './context';

const Button = styled('button', {
  appearance: 'none',
  backgroundColor: theme.colors['color-background-secondary-base'],
  padding: '$200',
  border: 'none',
  cursor: 'pointer',
  display: 'inline-flex',
  fontSize: '$2',
  borderRadius: '50%',

  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  left: '0',
  zIndex: '5',
  boxShadow: '0 4px 6px 0 hsla(0, 0%, 0%, 0.07), 0 1px 3px 0 hsla(0, 0%, 0%, 0.06)',

  '&:disabled': {
    opacity: '0.5',
    cursor: 'not-allowed',
  },

  '&:hover': {
    opacity: 0.8,
  },
});

type CarouselPrevButtonProps = {
  /** asChild prop description */
  asChild?: boolean;
  classNames?: string;
  isDisabled?: boolean;
  onClick?: () => void;
} & React.ComponentPropsWithRef<typeof Button>;

/**
 * @todo remove it once we have @jtui/icons
 */
const ArrowLeftIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
      fill="currentColor"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ></path>
  </svg>
);

export const CarouselPrevButton = React.forwardRef<HTMLDivElement, CarouselPrevButtonProps>(({ asChild }, ref) => {
  const { scrollLeftToStep, canScrollLeft, showArrows, ...rest } = useCarouselContext();

  const handleClick = () => {
    scrollLeftToStep();
  };

  return asChild && showArrows ? (
    <Slot ref={ref} onClick={handleClick} {...(rest as any)} />
  ) : (
    <Button ref={ref} onClick={handleClick} disabled={!canScrollLeft} {...rest}>
      <ArrowLeftIcon />
    </Button>
  );
});

CarouselPrevButton.displayName = 'CarouselPrevButton';

export type { CarouselPrevButtonProps };
