import * as React from 'react';
import { StyleIcon, StyledCard, StyledCardFooter, StyledCardHeader, StyledCollapsibleContent } from './styles';
import type { CardProps, CardFooterProps, CardHeaderProps, CardBaseProps } from './types';
import { CollapseButton, Collapsible, useCollapsibleContext } from '~/components/Collapsible';

/** A Card is a styled container that groups related content and actions. */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { useCollapse, borderless, children, padding, paddingBottom, paddingLeft, paddingRight, paddingTop, ...props },
    ref,
  ) => {
    const CollapsibleElement = useCollapse ? Collapsible : React.Fragment;

    return (
      <CollapsibleElement>
        <StyledCard
          borderless={borderless}
          padding={padding}
          paddingBottom={paddingBottom}
          paddingLeft={paddingLeft}
          paddingRight={paddingRight}
          paddingTop={paddingTop}
          ref={ref}
          {...props}
        >
          {children}
        </StyledCard>
      </CollapsibleElement>
    );
  },
);

export const Content = React.forwardRef<HTMLDivElement, CardBaseProps>(
  ({ borderless, children, padding, paddingBottom, paddingLeft, paddingRight, paddingTop, ...props }, ref) => {
    const { useCollapse } = useCollapsibleContext() || {};

    const CollapsibleElement = useCollapse ? StyledCollapsibleContent : React.Fragment;

    return (
      <CollapsibleElement>
        <StyledCard
          borderless={borderless}
          padding={padding}
          paddingBottom={paddingBottom}
          paddingLeft={paddingLeft}
          paddingRight={paddingRight}
          paddingTop={paddingTop}
          ref={ref}
          {...props}
        >
          {children}
        </StyledCard>
      </CollapsibleElement>
    );
  },
);

export const Footer = React.forwardRef<HTMLDivElement, CardFooterProps>(({ children, ...props }, ref) => (
  <StyledCardFooter ref={ref} {...props}>
    {children}
  </StyledCardFooter>
));

export const Header = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ children, ...props }, ref) => {
  const { useCollapse } = useCollapsibleContext() || {};
  return (
    <aside style={{ position: 'relative', background: 'hsl(210deg, 55%, 92%)' }}>
      <StyleIcon />
      <StyledCardHeader ref={ref} {...props}>
        {children}
      </StyledCardHeader>
      {useCollapse && <CollapseButton />}
    </aside>
  );
});
