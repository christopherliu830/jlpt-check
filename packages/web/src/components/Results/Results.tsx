import { Box, Button, Container, Flex, Text } from '@chakra-ui/react';
import { FadeInView } from 'components/FadeInView/FadeInView';
import { animate, useMotionValue } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';

import Link from 'next/link';
import { AnimatedProgressBar } from 'components/AnimatedProgress/AnimatedProgress';
import { useQuiz } from 'components/Quiz/QuizProvider';
import { toLookup } from 'utils/array';
import { checkCorrect, getRating, mockRating } from 'components/Quiz/util';
import { clamp, lerp } from 'utils/math';
import Head from 'next/head';

const colors: Record<number, { color: string; delay: number }> = {
  1: { color: 'violet', delay: 0.4 },
  2: { color: 'salmon', delay: 0.6 },
  3: { color: 'yellow', delay: 0.8 },
  4: { color: 'green', delay: 1.0 },
  5: { color: 'gray', delay: 1.2 },
};

const config: { thresholds: number[], fills: { [key: number]: string }} = {
  thresholds: [ -2, -1, 0, 1, 2 ],
  fills: {
    5: '#006f51',
    4: '#008f68',
    3: '#00c08b',
    2: '#0ccf99',
    1: '#38d1a7',
  }
}



export function Results() {
  const { quizHistory } = useQuiz();

  // The displayed value (rises during animations, etc.)
  const [animatedRating, setRating] = useState(1);

  // Used in framer animation, this sets animatedRating on update.
  const jlptMotionValue = useMotionValue(0);

  /**
   * Ratings come back on a scale from [-3, 3].
   * We want to rescale to [0,1] for bar display and [5, 1] integer for JLPT
   */
  const thresholds = config.thresholds.map((t) => (t + 3) / 6);

  useEffect(() => {
    const rating = getRating(quizHistory);
    const normalizedRating = clamp((rating + 3) / 6, 0, 1);

    const controls = animate(jlptMotionValue, normalizedRating, {
      delay: 0.5,
      duration: 2,
      onUpdate: (v) => {
        setRating(v);
      },
    });
    return controls.stop;
  }, [quizHistory]);

  const ratingtoJlpt = (v: number) => Math.ceil(clamp(lerp(6, 0, v), 1, 5));
  const difficultyToJlpt = (v: number) => [0, 5, 4, 3, 2, 1][v];

  function JLPTBarLabel({ level, label }: { level: number; label: string }) {
    return (
      <>
        <Box position="absolute" left={`${thresholds[level] * 100}%`} w="0" h="100%" overflow="visible">
          <Box transform="translateX(-50%)" width="fit-content">{label}</Box>
        </Box>
      </>
    );
  }

  useEffect(() => {
    if (quizHistory.length > 0) {
      fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizHistory.map((v) => ({ exercise: v.exercise.id, answers: v.answers }))),
      });
    }
  }, []);

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


  return (
    <Container maxW="4xl" centerContent alignItems="stretch">
      <Head>
        <title>JLPTCheck Results</title>
      </Head>
      <Text fontSize="4xl" fontWeight="bold" m={3} textAlign="center">
        Results
      </Text>
      <FadeInView open delay={0.2}>
        <Text fontSize="6xl" fontWeight="bold" mb={8} textAlign="center">
          JLPT N{ratingtoJlpt(animatedRating)}
        </Text>

        <Box pos="relative" height="1.5em">
          <JLPTBarLabel level={0} label="N5" />
          <JLPTBarLabel level={1} label="N4" />
          <JLPTBarLabel level={2} label="N3" />
          <JLPTBarLabel level={3} label="N2" />
          <JLPTBarLabel level={4} label="N1" />
          <Box flexGrow={1} />
        </Box>

        <AnimatedProgressBar
          animate={false} // Follow the animatedRating
          bars={thresholds}
          mb={12}
          fill={config.fills[ratingtoJlpt(animatedRating)]}
          value={animatedRating}
          delay={0.5}
        ></AnimatedProgressBar>

        {results.bars.map(([difficulty, correct, total]) => (
          <FadeInView key={difficulty} open delay={colors[difficulty].delay}>
            <Flex justifyContent="space-between">
              <span>
                <b>N{difficultyToJlpt(difficulty)}</b>
              </span>
              <Text color="gray.500">
                {correct}/{total}
              </Text>
            </Flex>
            <AnimatedProgressBar
              colorScheme={colors[difficulty].color}
              mb={2}
              value={correct / total}
              delay={colors[difficulty].delay + 0.2}
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
        <Button size="lg" my={4}>
          Leave feedback
        </Button>
      </Link>
    </Container>
  );
}
