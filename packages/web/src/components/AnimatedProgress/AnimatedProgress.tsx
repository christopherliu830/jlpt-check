import { Box, BoxProps, getToken, useTheme } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export type AnimatedProgressBarProps = BoxProps & {
  value: number;
  delay?: number;
  max?: number;
  colorScheme?: string;
};

export function AnimatedProgressBar({ value, colorScheme, delay = 0, max = 1, ...rest }: AnimatedProgressBarProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const theme = useTheme();
  const color = colorScheme ?? theme.components.Progress.defaultProps.colorScheme;

  const fill = getToken('colors', `${color}.500`)(theme);
  const background = getToken('colors', `${color}.50`)(theme);

  useEffect(() => {
    const handle = setTimeout(() => {
      setAnimatedValue(value);
    }, delay * 1000);
    return () => clearTimeout(handle);
  }, [delay, value]);
  return (
    <>
      <Box bg={background} height={4} borderRadius={4} {...rest}>
        <Box
          borderRadius={4}
          sx={{
            width: '100%',
            height: '100%',
            transformOrigin: 'left',
            transition: 'transform 2s',
            transform: `scaleX(${animatedValue / max})`,
            bg: fill,
          }}
        ></Box>
      </Box>
    </>
  );
}
