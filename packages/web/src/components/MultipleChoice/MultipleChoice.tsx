import React, { useEffect, useState } from 'react';

import { Box, Button, Container, Text, useMultiStyleConfig } from '@chakra-ui/react';
import { Choice, ChoiceBody } from 'components/Choice/Choice';

import { ExerciseText } from 'components/ExerciseText/ExerciseText';
import { useExercise } from 'components/ExerciseProvider/ExerciseProvider';

export type MultipleChoiceProps = {
  onSubmit: (selected: string[]) => void;
  disabled?: boolean
};

function MultipleChoice({ onSubmit, disabled }: MultipleChoiceProps) {
  const { exercise, selected, setSelected } = useExercise();
  const [submitted, setSubmitted] = useState(false);
  const styles = useMultiStyleConfig('MultipleChoice');

  useEffect(() => {
    setSubmitted(false);
  }, [exercise]);

  if (!exercise) {
    return <></>;
  }

  const { choices, correct } = exercise;

  const handleSelect = (item: number) => {
    setSelected((old) => {
      if (correct.length === 1) {
        return old[0] === item ? [] : [item];
      }

      const copy = [...old];
      if (copy.indexOf(item) !== -1) {
        copy.splice(copy.indexOf(item), 1);
      } else {
        copy.push(item);
      }

      return copy;
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit && onSubmit(Array.from(selected.values()).map((x) => choices[x]));
  };

  return (
    <Container maxW="100%" m={0} p={0}>
      <>
        <Box __css={styles.directive}>
          <Text as="div" fontSize="xl" mt={12}>
            <ExerciseText>{exercise.directive.prompt}</ExerciseText>
          </Text>
        </Box>
        <Box __css={exercise.prompt.includes('\n') ? styles.multiLineQuestion : styles.question}>
          <ExerciseText fillBlanks>{exercise.prompt}</ExerciseText>
        </Box>
        {choices.map((choice, idx) => (
          <Choice
            key={choice}
            selected={selected.indexOf(idx) !== -1}
            onClick={() => handleSelect(idx)}
            __css={styles.choice}
          >
            <ChoiceBody>
              <div>
                <ExerciseText>{choice}</ExerciseText>
              </div>
            </ChoiceBody>
          </Choice>
        ))}
        <Button
          sx={styles.button}
          width="full"
          onClick={handleSubmit}
          disabled={disabled || selected.length !== correct.length}
        >
          {submitted ? 'Next' : 'Submit'}
        </Button>
      </>
    </Container>
  );
}

export default MultipleChoice;
