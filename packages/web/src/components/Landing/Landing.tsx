import React, { useState } from 'react';
import { Button, Center, Container, Flex, Text } from '@chakra-ui/react';

import { Logo } from '../Logo/Logo';
import { FadeInView } from '../FadeInView/FadeInView';
import { useRouter } from 'next/router';
import Head from 'next/head';

export function Landing(): React.ReactElement {
  const [leaving, setLeaving] = useState(false);
  const router = useRouter();

  const handleStartTest = () => {
    setLeaving(true);
  };

  const handleAnimationDone = () => {
    if (leaving) router.push('/quiz');
  };

  return (
    <Container h="100%" display="flex" flexDirection="column" justifyContent="space-between">
      <Head>
        <title>JLPTCheck: Test your Japanese</title>
      </Head>
      <Flex h="66.66%" direction="column" textAlign="center" alignItems="center" justifyContent="space-around">
        <FadeInView open={!leaving}>
          <Logo fontSize="6xl" />
          <FadeInView>
            <Text fontSize="xl" color="gray.600">
              A short JLPT placement assessment for Japanese learners.
            </Text>
            <Text fontSize="xl" my={8}>
              Want to start studying for the JLPT but aren&rsquo;t sure of your
              level? Take a short 5-10 minute quiz that adjusts its difficulty
              to your performance and, at the end, gives an estimate of your
              Japanese ability. Free and no sign ups required!
            </Text>
          </FadeInView>
        </FadeInView>
        <FadeInView open={!leaving} onAnimationComplete={handleAnimationDone} delay={0.2}>
          <Button size="lg" margin="24px" onClick={handleStartTest}>
            Start A Test
          </Button>
        </FadeInView>
      </Flex>
      <Center margin="24px">
        <Text color="gray.400" marginTop="auto">
          <a href="https://twitter.com/christopherliu_">Christopher Liu</a>
        </Text>
      </Center>
    </Container>
  );
}
