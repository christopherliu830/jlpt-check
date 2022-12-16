import { Box, Button, Container, getToken, Progress, Text, useTheme } from '@chakra-ui/react';
import { FadeInView } from 'components/FadeInView/FadeInView';
import { animate, motion, useMotionValue } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { AnimatedProgressBar } from 'components/AnimatedProgress/AnimatedProgress';

export function Results() {
  const jlptMotionValue = useMotionValue(0);
  const [jlpt, setJlpt] = useState(5);

  useEffect(() => {
    const controls = animate(jlptMotionValue, 5, {
      delay: 0.5,
      duration: 2,
      onUpdate: (v) => {
        setJlpt(6 - Math.ceil(v));
      },
    });
    return controls.stop;
  }, []);

  return (
    <Container maxW="4xl" centerContent alignItems="stretch">
      <Text fontSize="4xl" fontWeight="bold" m={6} textAlign="center">
        Results
      </Text>
      <FadeInView open delay={0.2}>
        <Text fontSize="6xl" fontWeight="bold" m={12} textAlign="center">
          JLPT {jlpt}
        </Text>
        <FadeInView open delay={0.4}>
          <AnimatedProgressBar my={2} value={1} delay={0.6} />
          <Box>1/1 correct</Box>
        </FadeInView>
        <FadeInView open delay={0.6}>
          <AnimatedProgressBar colorScheme="salmon" my={2} value={1} delay={0.8} />
          <Box>1/1 correct</Box>
        </FadeInView>
        <FadeInView open delay={0.8}>
          <AnimatedProgressBar colorScheme="yellow" my={2} value={1} delay={1.0} />
          <Box>1/1 correct</Box>
        </FadeInView>
        <FadeInView open delay={1.2}>
          <AnimatedProgressBar colorScheme="green" my={2} value={1} delay={1.2} />
          <Box>1/1 correct</Box>
        </FadeInView>
        <FadeInView open delay={1.4}>
          <AnimatedProgressBar colorScheme="gray" my={2} value={1} delay={1.4} />
          <Box>1/1 correct</Box>
        </FadeInView>
        <FadeInView open delay={1.6}>
          <Box fontSize="lg" textAlign="center" m={2}>
            {'12/15 questions correct'}
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
