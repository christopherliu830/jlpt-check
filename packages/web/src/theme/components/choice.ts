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
      flex: '0 0 32px',
      flexDirection: 'row',
      fontSize: 'xl',
      fontWeight: 'bold',
      justifyContent: 'center',
      padding: '12px',
    },
    body: {
      alignItems: 'center',
      padding: '12px',
      bg: `${c}.25`,
      color: `${c}.600`,
      display: 'flex',
      flex: '2 1 100%',
      fontSize: 'xl',
      fontWeight: 'bold',
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

export const animateBody = (theme: Record<string, unknown>, { colorScheme }: StyleFunctionProps) => {
  // helper function to get the rgba from color level.
  const color = (level: number) => getToken('colors', `${colorScheme}.${level}`)(theme);

  return {
    variants: {
      ['selected-base']: {
        backgroundColor: color(100),
        boxShadow: 'inset 0 0 8px 0 rgba(0, 0, 0, 0.2)',
      },
      ['selected-active']: {
        backgroundColor: color(300),
        transition: { duration: 0 },
        initial: 'inset 0 0 0 0 black',
        boxShadow: 'inset 0 0 8px 0 rgba(0, 0, 0, 0.2)',
      },
      ['selected-hover']: {
        backgroundColor: color(200),
        transition: { duration: 0.2 },
        boxShadow: 'inset 0 0 8px 0 rgba(0, 0, 0, 0.2)',
      },
      ['unselected-hover']: {
        backgroundColor: color(50),
        transition: { duration: 0.2 },
        boxShadow: 'inset 0 0 0 0',
      },
      ['unselected-base']: {
        backgroundColor: color(25),
        boxShadow: 'inset 0 0 0 0',
      },
      ['unselected-active']: {
        backgroundColor: color(300),
        transition: { duration: 0 },
        boxShadow: 'inset 0 0 4px 0 rgba(0, 0, 0, 0.2)',
      },
    },
  };
};

export const animateHeader = (theme: Record<string, unknown>, { colorScheme }: StyleFunctionProps) => {
  // helper function to get the rgba from color level.
  const color = (level: number) => getToken('colors', `${colorScheme}.${level}`)(theme);

  return {
    variants: {
      ['selected-base']: {
        backgroundColor: color(200),
      },
      ['selected-hover']: {
        backgroundColor: color(200),
      },
      ['selected-active']: {
        backgroundColor: color(200),
        transition: { duration: 0 },
      },
      ['unselected-hover']: {
        backgroundColor: color(100),
      },
      ['unselected-active']: {
        backgroundColor: color(200),
        transition: { duration: 0 },
      },
    },
  };
};
