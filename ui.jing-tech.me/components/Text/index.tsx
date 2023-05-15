import { styled, theme } from '@jtui/theme';

export const StyledText = styled('div', {
  color: theme.colors['color-text-default'],
  fontWeight: theme.fontWeights.normal,
  fontSize: theme.fontSizes[200],
  lineHeight: 1.14,
  variants: {
    color: {
      textDefault: {
        color: theme.colors['color-text-default'],
      },
      textSubtle: {
        color: theme.colors['color-text-subtle'],
      },
      textInverse: {
        color: theme.colors['color-text-inverse'],
      },
      textLink: {
        color: theme.colors['color-text-link'],
      },
      textSuccess: {
        color: theme.colors['color-text-success'],
      },
      textWarning: {
        color: theme.colors['color-text-warning'],
      },
      textError: {
        color: theme.colors['color-text-error'],
      },
    },
    cursor: {
      notAllowed: {
        cursor: 'not-allowed',
      },
      pointer: {
        cursor: 'pointer',
      },
      wait: {
        cursor: 'wait',
      },
    },
    display: {
      block: {
        display: 'block',
      },
      inline: {
        display: 'inline',
      },
      inlineBlock: {
        display: 'inline-block',
      },
    },
    lineHeight: {
      normal: {
        lineHeight: 'normal',
      },
    },
    fontSize: {
      fontSize100: {
        fontSize: theme.fontSizes[100],
      },
      fontSize200: {
        fontSize: theme.fontSizes[200],
      },
      fontSize300: {
        fontSize: theme.fontSizes[300],
      },
      fontSize400: {
        fontSize: theme.fontSizes[400],
      },
      fontSize500: {
        fontSize: theme.fontSizes[500],
      },
      fontSize600: {
        fontSize: theme.fontSizes[600],
      },
      fontSize700: {
        fontSize: theme.fontSizes[700],
      },
      fontSize800: {
        fontSize: theme.fontSizes[800],
      },
    },
    fontWeight: {
      normal: {
        fontWeight: theme.fontWeights.normal,
      },
      semibold: {
        fontWeight: theme.fontWeights.semibold,
      },
      bold: {
        fontWeight: theme.fontWeights.bold,
      },
    },
    textDecoration: {
      none: {
        textDecoration: 'none',
      },
      underline: {
        textDecoration: 'underline',
      },
    },
    textTransform: {
      none: {
        textTransform: 'none',
      },
      uppercase: {
        textTransform: 'uppercase',
      },
      lowercase: {
        textTransform: 'lowercase',
      },
      capitalize: {
        textTransform: 'capitalize',
      },
    },
  },
});
