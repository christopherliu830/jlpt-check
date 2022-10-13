import { useState } from 'react';

import { Box, Button, Center, Container, Text, useMultiStyleConfig } from '@chakra-ui/react';
import { Choice, ChoiceBody, ChoiceHeader } from '../Choice/Choice';

function MultipleChoice() {
  const [selected, setSelected] = useState<Record<number, boolean>>({});
  const styles = useMultiStyleConfig('MultipleChoice');

  return (
    <Container size="sm">
      <>
      <Box __css={styles.question}>
        <Center margin="10%">
          <Text>去年より<u>利益</u>がわずかに増えた。</Text>
        </Center>
      </Box>
      {
        ['りし', 'りそく', 'りえき', 'りじゅん'].map((choice, idx) => (
          <Choice
            key={idx}
            selected={selected[idx]}
            onClick={() => setSelected(s => ({...s, [idx]: !selected[idx]}))}
            __css={styles.choice}
          >
            <ChoiceHeader flex="0 0 10%">
              {idx + 1}
            </ChoiceHeader>
            <ChoiceBody>
              {choice} 
            </ChoiceBody>
          </Choice>
        ))
      }
      <Button margin="36px 0" width="full">Submit</Button>
      </>
    </Container>
  )
}

export default MultipleChoice;