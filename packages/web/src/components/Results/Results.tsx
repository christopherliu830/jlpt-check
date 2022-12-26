import { Box, Button, Container, Flex, Text } from '@chakra-ui/react';
import { FadeInView } from 'components/FadeInView/FadeInView';
import { animate, useMotionValue } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';

import Link from 'next/link';
import { AnimatedProgressBar } from 'components/AnimatedProgress/AnimatedProgress';
import { useQuiz } from 'components/Quiz/QuizProvider';
import { toLookup } from 'utils/array';
import { checkCorrect, getRating } from 'components/Quiz/util';
import { clamp } from 'utils/math';

const config: Record<number, { color: string; delay: number }> = {
  1: { color: 'violet', delay: 0.4 },
  2: { color: 'salmon', delay: 0.6 },
  3: { color: 'yellow', delay: 0.8 },
  4: { color: 'green', delay: 1.0 },
  5: { color: 'gray', delay: 1.2 },
};

export function Results() {
  const { quizHistory } = useQuiz();
  const jlptMotionValue = useMotionValue(1);
  const [currentRating, setRating] = useState(1);
  const targetRating = clamp(getRating(quizHistory), 1, 5);

  const ratingtoJlpt = (v: number) => clamp(6 - Math.floor(v), 1, 5);

  const results = useMemo(() => {
    const lookup = toLookup(quizHistory, (entry) => entry.exercise.difficulty);
    const bars = Object.entries(lookup).map(([difficulty, entries]) => [
      parseInt(difficulty),
      entries.filter(checkCorrect).length,
      entries.length,
    ]);

    return {
      bars,
      total: [quizHistory.filter(checkCorrect).length, quizHistory.length],
    };
  }, [quizHistory]);

  useEffect(() => {
    const controls = animate(jlptMotionValue, targetRating, {
      delay: 0.5,
      duration: 2,
      onUpdate: (v) => {
        setRating(v);
      },
    });
    return controls.stop;
  }, []);

  return (
    <Container maxW="4xl" centerContent alignItems="stretch">
      <Text fontSize="4xl" fontWeight="bold" m={3} textAlign="center">
        Results
      </Text>
      <FadeInView open delay={0.2}>
        <Text fontSize="6xl" fontWeight="bold" mb={8} textAlign="center">
          JLPT N{ratingtoJlpt(currentRating)}
        </Text>

        <Flex justifyContent="space-evenly" pos="relative">
          <Text pos="absolute" fontSize="2xl" left="0">
            N5
          </Text>
          <Text fontSize="2xl">N4</Text>
          <Text fontSize="2xl">N3</Text>
          <Text fontSize="2xl">N2</Text>
          <Text pos="absolute" fontSize="2xl" right="0">
            N1
          </Text>
        </Flex>

        <AnimatedProgressBar
          animate={false} // Follow the currentRating
          divisions={4}
          mb={12}
          colorScheme="gray"
          value={(currentRating - 1) / 4}
          delay={0.5}
        ></AnimatedProgressBar>

        {results.bars.map(([difficulty, correct, total]) => (
          <FadeInView key={difficulty} open delay={config[difficulty].delay}>
            <Flex justifyContent="space-between">
              <span>
                <b>N{ratingtoJlpt(difficulty)}</b>
              </span>
              <Text color="gray.500">
                {correct}/{total}
              </Text>
            </Flex>
            <AnimatedProgressBar
              colorScheme={config[difficulty].color}
              mb={2}
              value={correct / total}
              delay={config[difficulty].delay + 0.2}
            ></AnimatedProgressBar>
            <Box></Box>
          </FadeInView>
        ))}

        <FadeInView open delay={1.6}>
          <Box fontSize="lg" textAlign="center" m={2}>
            {results.total[0]} / {results.total[1]} Correct
          </Box>
        </FadeInView>
      </FadeInView>
      <Box my={12} fontSize="lg" alignSelf="center">
        <section>
          Congratulations on finishing the JLPTCheck quiz! Please note that this website only tests a portion of the
          true JLPT exam, which contains sections on reading comprehension as well as listening. The results should only
          be used as a starting point to guide your studies.
        </section>
      </Box>
      <Link href="https://gogonihon.com/en/blog/preparing-for-the-jlpt/">
        <Button size="lg" mt={4}>
          How to prepare for the JLPT
        </Button>
      </Link>
      <Link href="/contact">
        <Button size="lg" mt={4}>
          Leave feedback
        </Button>
      </Link>
    </Container>
  );
}
