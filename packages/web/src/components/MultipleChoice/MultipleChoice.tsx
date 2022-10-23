import { useState } from 'react';

import { Box, Button, Center, Container, Text, useMultiStyleConfig } from '@chakra-ui/react';
import { Choice, ChoiceBody, ChoiceHeader } from '../Choice/Choice';
import { Prisma } from '@prisma/client';
import { MultipleChoiceExercise } from '../../../pages/api/exercise';

import SanitizedHTML from '../SanitizedHTML/SanitizedHTML';

export type MultipleChoiceProps = {
  exercise: MultipleChoiceExercise;
  onSubmit: (selected: string[]) => void;
};

function MultipleChoice({ exercise, onSubmit }: MultipleChoiceProps) {
  const [selected, setSelected] = useState(new Set<number>());
  const styles = useMultiStyleConfig('MultipleChoice');

  const { options, choices } = exercise.content;

  const handleSelect = (index: number) => {
    setSelected((old) => {
      const copy = new Set(old);
      // Clear all options
      if (!options['multiple']) {
        copy.clear();
      }

      if (copy.has(index)) {
        copy.delete(index);
      } else {
        copy.add(index);
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
              <SanitizedHTML html={exercise.prompt} />
            </Text>
          </Center>
        </Box>
        {choices.map((choice, idx) => (
          <Choice key={idx} selected={selected.has(idx)} onClick={() => handleSelect(idx)} __css={styles.choice}>
            <ChoiceHeader flex="0 0 10%">{idx + 1}</ChoiceHeader>
            <ChoiceBody>{choice?.toString()}</ChoiceBody>
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
