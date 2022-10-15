import { createMultiStyleConfigHelpers, StyleFunctionProps, getToken } from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers(['container', 'header', 'body']);

export const Choice = helpers.defineMultiStyleConfig({
  baseStyle: ({ colorScheme: c }) => ({
    container: {
      alignItems: 'stretch',
      boxShadow: 'md',
      boxSizing: 'content-box',
      borderRadius: '12px',
      borderColor: `${c}.100`,
      color: `${c}.700`,
      display: 'flex',
      flexDirection: ['column', 'row'],
      overflow: 'hidden',
      userSelect: 'none',
      margin: '18px',
    },
    header: {
      alignItems: 'center',
      bg: `${c}.50`,
      boxShadow: 'md',
      color: `${c}.700`,
      display: 'flex',
      flex: '1 1 0px',
      flexDirection: 'row',
      fontSize: 'xl',
      fontWeight: 'bold',
      justifyContent: 'center',
      padding: '12px',
      position: 'relative',
      w: '100%',
    },
    body: {
      alignItems: 'center',
      padding: '12px',
      bg: `${c}.25`,
      color: `${c}.600`,
      display: 'flex',
      flex: '2 1 100%',
    },
  }),
  variants: {
    selected: ({ colorScheme: c }) => ({
      container: {
        borderColor: `${c}.400`,
      },
      header: {
        boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)',
        zIndex: 1,
      },
      body: {
        boxShadow: 'inner',
        bg: `${c}.100`,
        color: `${c}.800`,
      },
    }),
  },
  defaultProps: {
    colorScheme: 'violet',
  },
});

export const animateBody = (theme: Record<string, any>, { colorScheme }: StyleFunctionProps) => {
  // helper function to get the rgba from color level.
  const color = (level: number) => getToken('colors', `${colorScheme}.${level}`)(theme);

  return {
    variants: {
      ['selected-base']: {
        background: color(100),
        boxShadow: 'inset 0 0 8px 0 rgba(0, 0, 0, 0.2)',
      },
      ['selected-active']: {
        background: color(300),
        transition: { duration: 0 },
        initial: 'inset 0 0 0 0 black',
        boxShadow: 'inset 0 0 8px 0 rgba(0, 0, 0, 0.2)',
      },
      ['selected-hover']: {
        background: color(200),
        transition: { duration: 0.2 },
        boxShadow: 'inset 0 0 8px 0 rgba(0, 0, 0, 0.2)',
      },
      ['unselected-hover']: {
        background: color(50),
        transition: { duration: 0.2 },
        boxShadow: 'inset 0 0 0 0',
      },
      ['unselected-base']: {
        background: color(25),
        boxShadow: 'inset 0 0 0 0',
      },
      ['unselected-active']: {
        background: color(300),
        transition: { duration: 0 },
        boxShadow: 'inset 0 0 4px 0 rgba(0, 0, 0, 0.2)',
      },
    },
  };
};

export const animateHeader = (theme: Record<string, any>, { colorScheme }: StyleFunctionProps) => {
  // helper function to get the rgba from color level.
  const color = (level: number) => getToken('colors', `${colorScheme}.${level}`)(theme);

  return {
    variants: {
      ['selected-base']: {
        background: color(200),
      },
      ['selected-hover']: {
        background: color(200),
      },
      ['selected-active']: {
        background: color(200),
        transition: { duration: 0 },
      },
      ['unselected-hover']: {
        background: color(100),
      },
      ['unselected-active']: {
        background: color(200),
        transition: { duration: 0 },
      },
    },
  };
};
