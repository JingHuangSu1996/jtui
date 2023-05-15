import { styled, theme, config } from '@jtui/theme';

export const StyledParagraph = styled('p', {
  color: theme.colors['color-text-default'],
  fontWeight: theme.fontWeights.normal,
  marginBottom: theme.space[40],
  display: 'inline-flex',
  variants: {
    size: {
      small: {
        fontSize: theme.fontSizes[200],
        lineHeight: '1.12',
      },
      medium: {
        fontSize: theme.fontSizes[300],
        lineHeight: '1.4',
      },
    },
    color: {
      default: {
        color: theme.colors['color-text-default'],
      },
      inverse: {
        color: theme.colors['color-text-inverse'],
      },
    },
    marginBottom: {
      space100: {
        marginBottom: theme.space[100],
      },
      space400: {
        marginBottom: theme.space[400],
      },
    },
  },
});
