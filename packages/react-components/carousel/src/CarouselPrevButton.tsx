import React, { useContext } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { styled, theme } from '@jtui/theme';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
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

export const CarouselPrevButton = React.forwardRef<HTMLDivElement, CarouselPrevButtonProps>(
  ({ asChild, onClick, isDisabled, ...props }, ref) => {
    const { scrollLeftToStep, canScrollLeft, showArrows, ...rest } = useContext(CarouselContext);

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
  },
);

CarouselPrevButton.displayName = 'CarouselPrevButton';

export type { CarouselPrevButtonProps };
