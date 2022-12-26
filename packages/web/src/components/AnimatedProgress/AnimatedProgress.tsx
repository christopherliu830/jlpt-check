import { Box, BoxProps, getToken, useTheme } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Divisions } from './Divisions';

export type AnimatedProgressBarProps = BoxProps & {
  value: number;
  animate?: boolean;
  delay?: number;
  max?: number;
  divisions?: number;
  time?: string;
  colorScheme?: string;
};

export function AnimatedProgressBar({
  value,
  animate = true,
  colorScheme,
  delay = 0,
  max = 1,
  time = '2s',
  divisions,
  ...rest
}: AnimatedProgressBarProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const theme = useTheme();
  const color = colorScheme ?? theme.components.Progress.defaultProps.colorScheme;

  const fill = getToken('colors', `${color}.500`)(theme);
  const background = getToken('colors', `${color}.50`)(theme);

  useEffect(() => {
    if (animate) {
      const handle = setTimeout(() => {
        setAnimatedValue(value);
      }, delay * 1000);
      return () => clearTimeout(handle);
    }
  }, [delay, value]);

  const currentValue = animate ? animatedValue : value;

  return (
    <>
      <Box position="relative" bg={background} height={4} borderRadius={4} {...rest}>
        {divisions && divisions > 1 ? <Divisions count={divisions} /> : null}
        <Box
          borderRadius={4}
          sx={{
            width: '100%',
            height: '100%',
            transformOrigin: 'left',
            transition: animate ? `transform ${time}` : undefined,
            transform: `scaleX(${currentValue / max})`,
            bg: fill,
          }}
        ></Box>
      </Box>
    </>
  );
}
