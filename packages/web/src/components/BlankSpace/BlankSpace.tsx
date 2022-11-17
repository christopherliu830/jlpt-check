import React, { useEffect, useRef } from 'react';
import { Box, useStyleConfig } from '@chakra-ui/react';
import { useExercise } from 'components/ExerciseProvider/ExerciseProvider';
import { ExerciseText } from 'components/ExerciseText/ExerciseText';
import { motion, useAnimation } from 'framer-motion';
import { animation } from 'theme/components/blank-space';
import { useTheme } from '@chakra-ui/react';

export function BlankSpace({ index, fill }: { index: number; fill?: boolean }) {
  const { exercise, selected } = useExercise();
  const theme = useTheme();
  const ref = useRef(null);
  const styles = useStyleConfig('BlankSpace');

  const controls = useAnimation();

  useEffect(() => {
    if (ref.current) {
      console.log(window.getComputedStyle(ref.current).fontSize);
    }
  }, [ref]);

  useEffect(() => {
    if (fill && selected[index] !== undefined) {
      controls.start(animation(theme, theme.components.BlankSpace.defaultProps));
    }
  }, [selected[index]]);

  return (
    <Box as={motion.div} ref={ref} animate={controls} __css={styles}>
      {fill && selected[index] !== undefined ? ( // Needs !== undefined here as selected[index] could equal 0, i.e. falsy
        <ExerciseText>{exercise?.choices[selected[index]] ?? ''}</ExerciseText>
      ) : (
        <Box display="inline" visibility="hidden">
          <ruby>
            _<rt>_</rt>
          </ruby>
        </Box>
      )}
    </Box>
  );
}
