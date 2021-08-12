import React, { useState } from 'react';
import { Button, Center, Container, Flex, SlideFade, Text } from '@chakra-ui/react';

import { Logo } from '../Logo/Logo';
import { FadeInView } from '../FadeInView/FadeInView';
import { useHistory } from 'react-router-dom';

export function Landing(): React.ReactElement {
  const [ leaving, setLeaving ] = useState(false);
  const history = useHistory();

  const handleStartTest = () => {
    setLeaving(true);
  }

  const handleAnimationDone = () => {
    if (leaving) history.push('/quiz');
  }

  return (
      <Container h="100%" display="flex" flexDirection="column" justifyContent="space-between">
        <Flex 
          h="66.66%"
          direction="column"
          textAlign="center"
          alignItems="center"
          justifyContent="space-around"
        >
          <FadeInView open={!leaving}>
            <Logo fontSize="6xl" />
            <FadeInView>
              <Text fontSize="xl" color="gray.600">
                A diagnostic quiz for Japanese learners.
              </Text>
            </FadeInView>
          </FadeInView>
          <FadeInView open={!leaving} onAnimationComplete={handleAnimationDone} delay={0.5}>
            <Button
              size="lg"
              margin="24px"
              onClick={handleStartTest}
            >
              Start A Test
            </Button>
          </FadeInView>
        </Flex>
        <Center margin="24px">
          <Text color="gray.400" marginTop="auto">
            Christopher Liu and Aarif Razak
          </Text>
        </Center>
      </Container>
  )
}