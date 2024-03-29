import React, { useReducer, useState } from 'react';
import { Center, Text, Container } from '@chakra-ui/layout';
import { FadeInView } from '../FadeInView/FadeInView';
import { WrittenChoice, ListeningChoice, MultipleChoice } from './QuizChoice';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

type QuizState = Record<string, boolean>;

function quizReducer(state: QuizState, action: { type: string }) {
  return {
    ...state,
    [action.type]: !state[action.type],
  };
}

export function Quiz() {
  const [state, dispatch] = useReducer(quizReducer, {});
  const [leaving, setLeaving] = useState(false);
  const router = useRouter();

  const handleLeave = () => {
    setLeaving(true);
  };

  const handleAnimationDone = () => {
    if (leaving) {
      router.push('/quiz');
    }
  };

  return (
    <Container h="75%" size="sm">
      <FadeInView in={!leaving} onAnimationComplete={handleAnimationDone}>
        <Center margin="10%">
          <Text fontSize={['3xl', '4xl', '5xl']}>Select question types</Text>
        </Center>
        <WrittenChoice selected={state.written} onClick={() => dispatch({ type: 'written' })} />
        <ListeningChoice selected={state.listening} onClick={() => dispatch({ type: 'listening' })} />
        <MultipleChoice selected={state.multiple} onClick={() => dispatch({ type: 'multiple' })} />
        <Button boxShadow="sm" margin="36px 0" width="full" onClick={handleLeave}>
          Start
        </Button>
      </FadeInView>
    </Container>
  );
}
