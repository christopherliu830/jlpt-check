import { useEffect, useState } from 'react';
import { Container, Text } from '@chakra-ui/react';
import MultipleChoice from '../src/components/MultipleChoice/MultipleChoice';
import { MultipleChoiceExercise } from './api/exercise';
import { QuizResponse } from '../src/components/Quiz/QuizResponse';

function Question() {
  const [exercise, setExercise] = useState<MultipleChoiceExercise[] | undefined>();
  const [result, setResult] = useState<string | undefined>(undefined);

  const fetchQuestion = async () => {
    (async () => {
      const response = await fetch('/api/exercise', {
        method: 'POST',
      });
      const data = (await response.json()) as MultipleChoiceExercise[];
      setExercise(data);
    })();
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleSubmit = (answers: string[]) => {
    if (result) {
      setResult(undefined);
      fetchQuestion();
    } else {
      if (answers[0] === exercise![0].content.choices[exercise![0].content.correct]) setResult('success');
      else setResult('fail');
    }
  };

  if (!exercise) {
    return <Container />;
  }

  return (
    <Container maxW="2xl" centerContent pos="relative">
      <Text fontSize="2xl" mt={12}>
        {exercise[0].directive.prompt}
      </Text>
      <MultipleChoice exercise={exercise[0]} onSubmit={handleSubmit} />
      <QuizResponse response={result} onTimeout={() => setResult(undefined)} />
    </Container>
  );
}

export default Question;
