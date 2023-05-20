import { styled, theme, keyframes } from '@jtui/theme';
import { BoxIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Content as CollapsibleContent } from '@radix-ui/react-collapsible';

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-collapsible-content-height)' },
});

const slideUp = keyframes({
  from: { height: 'var(--radix-collapsible-content-height)' },
  to: { height: 0 },
});

export const StyledCollapsibleContent = styled(CollapsibleContent, {
  '@media (prefers-reduced-motion: no-preference)': {
    overflow: 'hidden',
    willChange: 'height',
    '&[data-state="open"]': { animationDuration: '300ms', animationFillMode: 'ease-out', animationName: slideDown },
    '&[data-state="closed"]': { animationDuration: '300ms', animationFillMode: 'ease-out', animationName: slideUp },
  },
});

export const StyledCard = styled('div', {
  backgroundColor: 'hsl(210deg, 55%, 92%)',
  borderColor: 'hsl(225deg, 8%, 80%)',
  borderRadius: '4px',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderLeftColor: 'hsl(230deg, 100%, 69%)',
  borderLeftWidth: '3px',
  variants: {
    borderless: {
      true: {
        border: 'none',
      },
    },
    padding: {
      space100: {
        padding: theme.space[100],
      },
      space200: {
        padding: theme.space[200],
      },
      space300: {
        padding: theme.space[300],
      },
      space400: {
        padding: theme.space[400],
      },
      space500: {
        padding: theme.space[500],
      },
      space600: {
        padding: theme.space[600],
      },
      space700: {
        padding: theme.space[700],
      },
    },
    paddingTop: {
      space100: {
        padding: theme.space[100],
      },
      space200: {
        padding: theme.space[200],
      },
      space300: {
        padding: theme.space[300],
      },
      space400: {
        padding: theme.space[400],
      },
      space500: {
        padding: theme.space[500],
      },
      space600: {
        padding: theme.space[600],
      },
      space700: {
        padding: theme.space[700],
      },
    },
    paddingRight: {
      space100: {
        padding: theme.space[100],
      },
      space200: {
        padding: theme.space[200],
      },
      space300: {
        padding: theme.space[300],
      },
      space400: {
        padding: theme.space[400],
      },
      space500: {
        padding: theme.space[500],
      },
      space600: {
        padding: theme.space[600],
      },
      space700: {
        padding: theme.space[700],
      },
    },
    paddingBottom: {
      space100: {
        padding: theme.space[100],
      },
      space200: {
        padding: theme.space[200],
      },
      space300: {
        padding: theme.space[300],
      },
      space400: {
        padding: theme.space[400],
      },
      space500: {
        padding: theme.space[500],
      },
      space600: {
        padding: theme.space[600],
      },
      space700: {
        padding: theme.space[700],
      },
    },
    paddingLeft: {
      space100: {
        padding: theme.space[100],
      },
      space200: {
        padding: theme.space[200],
      },
      space300: {
        padding: theme.space[300],
      },
      space400: {
        padding: theme.space[400],
      },
      space500: {
        padding: theme.space[500],
      },
      space600: {
        padding: theme.space[600],
      },
      space700: {
        padding: theme.space[700],
      },
    },
  },
});

export const StyledCardHeader = styled('div', {
  borderBottomColor: 'hsl(225deg, 8%, 80%)',
  borderBottomStyle: 'solid',
  borderBottomWidth: '1px',
  px: theme.space[400],
  py: theme.space[200],
});

export const StyledCardFooter = styled('div', {
  borderTopColor: 'hsl(225deg, 8%, 80%)',
  borderTopStyle: 'solid',
  borderTopWidth: '1px',
  px: theme.space[400],
  py: theme.space[200],
});

export const StyleIcon = styled(ExclamationTriangleIcon, {
  color: 'hsl(230deg, 100%, 69%)',
  position: 'absolute',
  top: '0px',
  left: '0px',
  height: '40px',
  width: '40px',
  transform: 'translate(calc(-50% - 1.5px), -50%)',
  padding: '8px',
  background: theme.colors['color-background-default'],
  borderRadius: '50%',
  transition: 'background 350ms ease 0s',
});
