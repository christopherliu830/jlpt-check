import { getToken } from '@chakra-ui/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SunTheme = ({ colorScheme, theme }: { colorScheme: string; theme: Record<any, any> }) => {
  const color = getToken('colors', `${colorScheme}.700`)(theme);
  return {
    stroke: color,
    strokeWidth: '10px',
    filter: 'drop-shadow(0, 0, 1px, rgba(0, 0, 0, 0.2)',
    duration: 0.3,
    delay: 0.2,
    width: 30,
    offset: 110,
  };
};
