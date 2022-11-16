import React from 'react';

import { Box, Button, Center, Container, Text, useMultiStyleConfig } from '@chakra-ui/react';
import { Choice, ChoiceBody, ChoiceHeader } from 'components/Choice/Choice';

import { ExerciseText } from 'components/ExerciseText/ExerciseText';
import { useExercise } from 'components/ExerciseProvider/ExerciseProvider';

export type MultipleChoiceProps = {
  onSubmit: (selected: string[]) => void;
};

function MultipleChoice({ onSubmit }: MultipleChoiceProps) {
  const { exercise, selected, setSelected } = useExercise();
  const styles = useMultiStyleConfig('MultipleChoice');

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
    onSubmit && onSubmit(Array.from(selected.values()).map((x) => choices[x]));
  };

  return (
    <Container maxW="100%">
      <>
        <Box __css={styles.directive}>
          <Text as="div" fontSize="2xl" mt={12}>
            <ExerciseText>{exercise.directive.prompt}</ExerciseText>
          </Text>
        </Box>
        <Box __css={styles.question}>
          <Text as="div">
            <ExerciseText fillBlanks>{exercise.prompt}</ExerciseText>
          </Text>
        </Box>
        {choices.map((choice, idx) => (
          <Choice
            key={idx}
            selected={selected.indexOf(idx) !== -1}
            onClick={() => handleSelect(idx)}
            __css={styles.choice}
          >
            <ChoiceBody>
              <ExerciseText>{choice}</ExerciseText>
            </ChoiceBody>
          </Choice>
        ))}
        <Button margin="36px 0" width="full" onClick={handleSubmit}>
          Submit
        </Button>
      </>
    </Container>
  );
}

export default MultipleChoice;
