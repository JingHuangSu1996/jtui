// prettier-ignore
import { createStitches, PropertyValue } from '@stitches/react';
import tokens from '@jtui/design-tokens/dist/json/variables.json';
import colorTokens from '@jtui/design-tokens/dist/json/variables-light.json';
import darkColorTokens from '@jtui/design-tokens/dist/json/variables-dark.json';

export type { VariantProps } from '@stitches/react';

const prefix = 'jtui';
const BASE = '16px';

const breakpoints = {
  sm: '767px',
  md: '900px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1440px',
};

const JTUI = createStitches({
  prefix,
  theme: {
    colors: {
      ...colorTokens,
      ...tokens.color.red,
      ...tokens.color.pink,
      ...tokens.color.blue,
      ...tokens.color.green,
      ...tokens.color.gray,
      ...tokens.color.teal,
      ...tokens.color.purple,
      ...tokens.color.orange,
      ...tokens.color.yellow,
      ...tokens.color.black,
      ...tokens.color.white,
    },
    space: tokens.space,
    fontSizes: tokens.font.size,
    fontWeights: tokens.font.weight,
    opacity: tokens.opacity,
    transitions: {
      allFast: 'all $fast $inOut',
      fast: '0.2s',
      normal: '0.3s',
      inOut: 'cubic-bezier(.4, 0, .2, 1)',
    },
    borderStyles: {},
    borderWidths: {},
    letterSpacings: {},
  },
  media: {
    sm: `(max-width: calc(${breakpoints.sm} - 1px))`,
    md: `(min-width: ${breakpoints.sm}) and (max-width: calc(${breakpoints.md} - 1px))`,
    lg: `(min-width: ${breakpoints.md}) and (max-width: calc(${breakpoints.lg} - 1px))`,
    xl: `(min-width: ${breakpoints.lg}) and (max-width: calc(${breakpoints.xl} - 1px))`,
    xxl: `(min-width: ${breakpoints.xl}) and (max-width: ${breakpoints.xxl})`,
    notSm: `(min-width: ${breakpoints.sm})`,
    notMd: `(min-width: ${breakpoints.md})`,
    notLg: `(min-width: ${breakpoints.lg})`,
    notXl: `(min-width: ${breakpoints.xl})`,
    notXxl: `(min-width: calc(${breakpoints.xxl} + 1px ))`,
    minSm: `(min-width: ${breakpoints.sm})`,
    minMd: `(min-width: ${breakpoints.md})`,
    minLg: `(min-width: ${breakpoints.lg})`,
    minXl: `(min-width: ${breakpoints.xl})`,
    minXxl: `(min-width: calc(${breakpoints.xxl} + 1px ))`,
    maxSm: `(max-width: calc(${breakpoints.sm} - 1px))`,
    maxMd: `(max-width: calc(${breakpoints.md} - 1px))`,
    maxLg: `(max-width: calc(${breakpoints.lg} - 1px))`,
    maxXl: `(max-width: calc(${breakpoints.xl} - 1px))`,
    maxXxl: `(max-width: ${breakpoints.xxl})`,
    reducedMotion: '(prefers-reduced-motion)',
    hover: '(any-hover: hover)',
    dark: '(prefers-color-scheme: dark)',
    light: '(prefers-color-scheme: light)',
  },
  utils: {
    px: (value: PropertyValue<'padding'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: PropertyValue<'padding'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    my: (value: PropertyValue<'margin'>) => ({
      marginTop: value,
      marginBottom: value,
    }),
    mx: (value: PropertyValue<'margin'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
    size: (value: PropertyValue<'width' | 'height'>) => ({
      width: value,
      height: value,
    }),
  },
});

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config, reset } = JTUI;
export const utils = config.utils;

export const darkTheme = createTheme(`${prefix}-dark`, {
  colors: {
    ...darkColorTokens,
  },
});

export const globalStyles = globalCss({
  ':root': {
    '--base': `${BASE}`,
    fontSize: `${BASE}`,
    lineHeight: '$meta',
  },
  '*': {
    boxSizing: 'border-box',
  },
  html: {
    overflowX: 'hidden',
    '-webkit-font-smoothing': 'antialiased',
    textRendering: 'optimizeLegibility',
    textSizeAdjust: '100%',
  },
  body: {
    margin: 0,
    fontFamily: '$meta',
  },
});

export const darkModeGlobalStyles = globalCss({
  '@dark': {
    ...Object.keys(darkTheme.colors).reduce((varSet, currentColorKey) => {
      const currentColor = darkTheme.colors[currentColorKey];
      const currentColorValue =
        currentColor.value.substring(0, 1) === '$' ? `$colors${currentColor.value}` : currentColor.value;

      return {
        [currentColor.variable]: currentColorValue,
        ...varSet,
      };
    }, {}),
  },
});
