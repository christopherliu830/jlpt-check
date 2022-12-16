import { useTheme } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SunTheme } from '../../theme/components/sun';

export default function Sun({ show }: { show: boolean }) {
  const theme = useTheme();
  const [sunPhase, setSunPhase] = useState<'in' | 'out'>('in');
  const sunAnimation = useAnimation();
  const sunTheme = SunTheme({ colorScheme: 'green', theme });

  // Reverse the line if the sunPhase is going out, so that it shrinks from the
  // other side.
  const getPoints = (i: number) => {
    const x1 = sunTheme.offset * Math.cos(2 * Math.PI * (i / 6)) + 150;
    const y1 = sunTheme.offset * Math.sin(2 * Math.PI * (i / 6)) + 150;
    const x2 = (sunTheme.offset + sunTheme.width) * Math.cos(2 * Math.PI * (i / 6)) + 150;
    const y2 = (sunTheme.offset + sunTheme.width) * Math.sin(2 * Math.PI * (i / 6)) + 150;

    if (sunPhase === 'in') {
      return [x1, y1, x2, y2];
    } else {
      return [x2, y2, x1, y1];
    }
  };

  const enter = async () => {
    setSunPhase('in');
    sunAnimation.start({
      opacity: 1,
      transition: {
        delay: sunTheme.delay,
        duration: 0.1,
      },
    });
    await sunAnimation.start({
      pathLength: 1,
      transition: {
        delay: sunTheme.delay,
        duration: sunTheme.duration / 2,
      },
    });
  };

  const exit = async () => {
    setSunPhase('out');
    await sunAnimation.start({
      pathLength: 0,
      transition: {
        duration: sunTheme.duration / 2,
      },
    });
    sunAnimation.start({
      opacity: 0,
      transition: { duration: 0.1 },
    });
  };

  useEffect(() => {
    (async () => {
      if (show) {
        await enter();
        exit();
      } else {
        exit();
      }
    })();
  }, [show]);

  return (
    <motion.svg width="300px" height="300px">
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const [x1, y1, x2, y2] = getPoints(i);
        return (
          <motion.line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            animate={sunAnimation}
            initial={{ pathLength: 0, opacity: 0 }}
            stroke={sunTheme.stroke}
            strokeWidth={sunTheme.strokeWidth}
            strokeLinecap="round"
            filter={sunTheme.filter}
          />
        );
      })}
    </motion.svg>
  );
}
