import { Theme, StyleObjectOrFn } from '@chakra-ui/react';

type StyleInterpolation = StyleObjectOrFn

interface StyleConfig {
  parts?: string[],
  baseStyle: StyleInterpolation
  sizes?: { [size: string]: StyleInterpolation }
  variants: { [variant: string]: StyleInterpolation }
  defaultProps?: {
    variant?: string,
    size?: string,
    colorScheme?: string,
  }
}


export const Choice: StyleConfig = {
  parts: ['container', 'header', 'body'],
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
      height: '120px',
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
      minWidth: '220px',
      padding: '12px',
      position: 'relative',
      transition: 'background var(--chakra-transition-duration-normal)',
      w: '100%',
      _groupHover: {
        bg: `${c}.50`,
      },
      _groupActive: {
        bg: `${c}.100`
      },
    },
    body: {
      alignItems: 'center',
      padding: '12px',
      bg: `${c}.25`,
      color: `${c}.600`,
      display: 'flex',
      flex: '2 1 100%',
      transition: 'background var(--chakra-transition-duration-normal)',
    }
  }),
  variants: {
    selected: ({ colorScheme: c}) => ({
      container: {
        borderColor: `${c}.400`,
      },
      header: {
        boxShadow: 'inner',
        bg: `${c}.200`,
        _groupHover: {
          bg: `${c}.300`,
        }
      },
      body: {
        bg: `${c}.100`,
        color: `${c}.800`
      }
    })
  },
  defaultProps: {
    colorScheme: 'violet',
  }
}