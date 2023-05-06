import React from 'react';

export const Button = React.forwardRef<HTMLDivElement, ButtonProps>(({ children }, ref) => {
  return <button>{children}</button>;
});

interface ButtonProps {
  children: React.ReactNode;
}

Button.displayName = 'Button';

export type { ButtonProps };
