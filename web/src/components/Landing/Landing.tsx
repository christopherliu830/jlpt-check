import React from 'react';
import { Button, Container, Flex, Text } from '@chakra-ui/react';

import { Logo } from '../Logo/Logo';
import { FadeInView } from '../FadeInView/FadeInView';
import { Link } from 'react-router-dom';

export function Landing(): React.ReactElement {
  return (
    <Container h="100%">
      <Flex 
        h="66.66%"
        direction="column"
        textAlign="center"
        alignContent="center"
        justifyContent="space-around"
      >
        <FadeInView>
          <Logo fontSize="6xl" />
          <FadeInView delay={0.5}>
            <Text fontSize="xl" color="gray.600">
              A diagnostic quiz for Japanese learners.
            </Text>
          </FadeInView>
        </FadeInView>
        <Link to="/assessment">
          <Button size="lg">Start A Test</Button>
        </Link>
      </Flex>
    </Container>
  )
}