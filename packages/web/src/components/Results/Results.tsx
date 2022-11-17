import { Box, Button, Container, Progress, Text } from '@chakra-ui/react';
import { FadeInView } from 'components/FadeInView/FadeInView';
import { animate, useMotionValue } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

export function Results() {
  const ref = useRef<HTMLDivElement>(null);
  const level = useMotionValue(0);
  const [animatedJlpt, setAnimatedJlpt] = useState(5);

  useEffect(() => {
    const bar = ref.current?.children[0] as HTMLDivElement;
    if (bar.style) {
      const unsub = level.onChange(() => {
        bar.style.width = `${level.get()}%`;
        const jlpt = Math.max(Math.ceil((100 - level.get()) / 20), 1);
        if (jlpt !== animatedJlpt) setAnimatedJlpt(jlpt);
      });
      const controls = animate(level, 100, {
        delay: 0.6,
        duration: 2,
      });

      return () => {
        unsub();
        controls.stop();
      };
    }
  }, [ref]);

  return (
    <Container maxW="4xl" centerContent alignItems="stretch">
      <Text fontSize="4xl" fontWeight="bold" m={6} textAlign="center">
        Results
      </Text>
      <FadeInView open delay={0.2}>
        <Text fontSize="6xl" fontWeight="bold" m={12} textAlign="center">
          JLPT {animatedJlpt}
        </Text>
        <FadeInView open delay={0.4}>
          <Progress max={5} ref={ref} isAnimated size="lg" />
        </FadeInView>
        <FadeInView open delay={2.2}>
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
        <section>
          Would you like to see more question types? Better questions? Please feel free to leave any comments,
          questions, inquiries, bug reports (and so on). As this is a solo hobby project any feedback is greatly
          appreciated.
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
