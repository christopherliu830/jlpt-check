import { Box, BoxProps, getToken, useTheme } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Divisions } from './Divisions';

export type AnimatedProgressBarProps = BoxProps & {
  value: number;
  animate?: boolean;
  colorScheme?: string;
  fill?: string;
  delay?: number;
  max?: number;
  bars?: number | number[];
  time?: string;
};

export function AnimatedProgressBar({
  value,
  animate = true,
  colorScheme,
  fill: fillProp,
  delay = 0,
  max = 1,
  time = '2s',
  bars,
  ...rest
}: AnimatedProgressBarProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const theme = useTheme();
  const color = colorScheme ?? theme.components.Progress.defaultProps.colorScheme;

  const fill = fillProp ?? getToken('colors', `${color}.500`)(theme);
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
        {bars && <Divisions bars={bars} />}
        <Box
          borderRadius={4}
          sx={{
            width: '100%',
            height: '100%',
            transformOrigin: 'left',
            transition: animate ? `background-color .4s, transform ${time}` : `background-color .4s`,
            transform: `scaleX(${currentValue / max})`,
            backgroundColor: fill,
          }}
        ></Box>
      </Box>
    </>
  );
}
