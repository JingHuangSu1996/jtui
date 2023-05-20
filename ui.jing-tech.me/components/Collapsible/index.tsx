import React from 'react';
import { styled, theme } from '@jtui/theme';
import { RowSpacingIcon, Cross2Icon } from '@radix-ui/react-icons';
import { Trigger as CollapsibleTrigger, Root as CollapsibleRoot } from '@radix-ui/react-collapsible';

const CollapsibleContext = React.createContext(null);
export const useCollapsibleContext = () => React.useContext(CollapsibleContext);

const StyledCollapsible = React.forwardRef<HTMLButtonElement, any>(({ children, ...props }, ref) => {
  const [open, setOpen] = React.useState(false);
  return (
    <CollapsibleContext.Provider value={{ open, useCollapse: true }}>
      <CollapsibleRoot open={open} onOpenChange={setOpen}>
        {children}
      </CollapsibleRoot>
    </CollapsibleContext.Provider>
  );
});

const StyledButton = styled('button', {
  background: 'white',
  border: 'white',
  borderRadius: '100%',
  height: '25px',
  width: '25px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgb(87, 70, 175)',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.14)',
  position: 'absolute',
  bottom: '-12.5px',
  left: '50%',
});

export const CollapseButton = React.forwardRef<HTMLButtonElement, any>(({ children, ...props }, ref) => {
  const { open } = useCollapsibleContext();
  return (
    <CollapsibleTrigger asChild>
      <StyledButton ref={ref} {...props}>
        {open ? <Cross2Icon /> : <RowSpacingIcon />}
      </StyledButton>
    </CollapsibleTrigger>
  );
});

export const Collapsible = styled(StyledCollapsible, {
  position: 'relative',
});
