import React, { RefObject, useContext } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { styled, theme } from '@jtui/theme';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import CarouselContext from './context';

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

export const CarouselNextButton = React.forwardRef<HTMLElement, CarouselNextButtonProps>(({ asChild }, ref) => {
  const { scrollRightToStep, canScrollRight, showArrows, ...rest } = useContext(CarouselContext);

  const handleClick = () => {
    console.log('run');
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
