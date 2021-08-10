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
    if (leaving) history.push('/assessment');
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
          <FadeInView open={!leaving} reverse={false}>
            <Logo fontSize="6xl" />
            <FadeInView delay={0.5}>
              <Text fontSize="xl" color="gray.600">
                A diagnostic quiz for Japanese learners.
              </Text>
            </FadeInView>
          </FadeInView>
          <SlideFade
            in={!leaving}
            initial={true}
            offsetY="-8px"
            reverse
            onAnimationComplete={handleAnimationDone}
          >
            <Button
              size="lg"
              margin="24px"
              onClick={handleStartTest}
            >
              Start A Test
            </Button>
          </SlideFade>
        </Flex>
        <Center margin="24px">
          <Text color="gray.400" marginTop="auto">
            Christopher Liu and Aarif Razak
          </Text>
        </Center>
      </Container>
  )
}