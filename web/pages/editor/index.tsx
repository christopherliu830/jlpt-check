import { Box, Button, Center, Container, Flex } from '@chakra-ui/react';

export default function Editor() {
  const handleCreate = () => {
    fetch('/api/editor/exercise');
  };

  return (
    <Container size="sm" h="100%">
      <Flex justifyContent="center" alignItems="center" h="100%">
        <Button onClick={handleCreate}>Create Demo Question Set</Button>
      </Flex>
    </Container>
  );
}
