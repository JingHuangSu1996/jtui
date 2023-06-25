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
  right: '0',
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

type CarouselNextButtonProps = {
  /** asChild prop description */
  asChild?: boolean;
  classNames?: string;
  isDisabled?: boolean;
  onClick?: () => void;
} & React.ComponentPropsWithRef<typeof Button>;

const ArrowRightIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
      fill="currentColor"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ></path>
  </svg>
);

export const CarouselNextButton = React.forwardRef<HTMLElement, CarouselNextButtonProps>(({ asChild }, ref) => {
  const { scrollRightToStep, canScrollRight, showArrows, ...rest } = useCarouselContext();

  const handleClick = () => {
    scrollRightToStep();
  };

  return asChild && showArrows ? (
    <Slot ref={ref} onClick={handleClick} {...(rest as any)} />
  ) : (
    <Button ref={ref} onClick={handleClick} disabled={!canScrollRight} {...rest}>
      <ArrowRightIcon />
    </Button>
  );
});

CarouselNextButton.displayName = 'CarouselNextButton';

export type { CarouselNextButtonProps };
