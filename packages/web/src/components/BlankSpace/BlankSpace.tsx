import React, { useEffect, useRef } from 'react';
import { Box, useStyleConfig } from '@chakra-ui/react';
import { useExercise } from 'components/ExerciseProvider/ExerciseProvider';
import { ExerciseText } from 'components/ExerciseText/ExerciseText';
import { motion, useAnimation } from 'framer-motion';
import { animation } from 'theme/components/blank-space';
import { useTheme } from '@chakra-ui/react';

export function BlankSpace({ index, fill }: { index: number; fill?: boolean }) {
  const { exercise, selected } = useExercise();

  const controls = useAnimation();
  const theme = useTheme();
  const styles = useStyleConfig('BlankSpace');

  const text = exercise?.choices[selected[index]];

  useEffect(() => {
    if (fill && text) {
      controls.start(animation(theme, theme.components.BlankSpace.defaultProps));
    }
  }, [selected[index]]);

  return (
    <Box initial={{ background: styles.background as string }} as={motion.div} animate={controls} __css={styles}>
      {/* Needs a dummy element to align baseline with prompt, otherwise margin bottom is used */}
      {fill && text ? <ExerciseText>{text}</ExerciseText> : <Box visibility="hidden">_</Box>}
    </Box>
  );
}
