import { useState } from 'react';

import { Box, Button, Center, Container, Text, useMultiStyleConfig } from '@chakra-ui/react';
import { Choice, ChoiceBody, ChoiceHeader } from '../Choice/Choice';
import { Prisma } from '@prisma/client';
import { MultipleChoiceExercise } from '../../../pages/api/exercise';

import SanitizedHTML from '../SanitizedHTML/SanitizedHTML';

export type MultipleChoiceProps = {
  exercise: MultipleChoiceExercise;
  onSubmit: (selected: number[]) => void;
};

function MultipleChoice({ exercise, onSubmit }: MultipleChoiceProps) {
  const [selected, setSelected] = useState<Record<number, boolean>>({});
  const styles = useMultiStyleConfig('MultipleChoice');

  const { options, choices } = exercise.content;

  const handleSelect = (index: number) => {
    // Clear all options
    if (!options['multiple']) {
      setSelected({});
    }

    setSelected((old) => ({ ...old, [index]: !selected[index] }));
  };

  const handleSubmit = () => {
    onSubmit &&
      onSubmit(
        Object.entries(selected)
          .filter(([_, selected]) => selected)
          .map((entry) => Number(entry))
      );
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
          <Choice key={idx} selected={selected[idx]} onClick={() => handleSelect(idx)} __css={styles.choice}>
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
