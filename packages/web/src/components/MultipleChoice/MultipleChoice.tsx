import React from 'react';

import { Box, Button, Center, Container, Text, useMultiStyleConfig } from '@chakra-ui/react';
import { Choice, ChoiceBody, ChoiceHeader } from 'components/Choice/Choice';
import { MultipleChoiceExercise } from 'api/exercise';

import { ExerciseText } from 'components/ExerciseText/ExerciseText';
import { useExercise } from 'components/ExerciseProvider/ExerciseProvider';

export type MultipleChoiceProps = {
  exercise: MultipleChoiceExercise;
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
        <Box __css={styles.question}>
          <Center margin="10%">
            <Text as="div">
              <ExerciseText fillBlanks>{exercise.prompt}</ExerciseText>
            </Text>
          </Center>
        </Box>
        {choices.map((choice, idx) => (
          <Choice
            key={idx}
            selected={selected.indexOf(idx) !== -1}
            onClick={() => handleSelect(idx)}
            __css={styles.choice}
          >
            <ChoiceHeader flex="0 0 10%">{idx + 1}</ChoiceHeader>
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
