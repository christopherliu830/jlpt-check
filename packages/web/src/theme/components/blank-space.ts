import { ComponentStyleConfig, getToken, StyleFunctionProps } from '@chakra-ui/react';

export const BlankSpace: ComponentStyleConfig = {
  baseStyle: ({ colorScheme: c }) => ({
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'end',
    justifyContent: 'center',
    boxShadow: 'md',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    background: `${c}.50`,
    m: 2,
    p: 1,
    minW: '80px',
    minH: '2.333333333em',
    textAlign: 'center',
    d: 'inline-flex',
    verticalAlign: 'baseline',
  }),
};

export function animation(theme: Record<string, unknown>, { colorScheme }: StyleFunctionProps) {
  const color = (level: number) => getToken('colors', `${colorScheme}.${level}`)(theme);
  return {
    backgroundColor: [color(100), color(50)],
    transition: { duration: 0.6 },
  };
}
