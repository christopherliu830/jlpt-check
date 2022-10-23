import React from 'react';
import { Button, Container, Flex, Select } from '@chakra-ui/react';
import { Directive } from '@prisma/client';
import { useQuery } from 'react-query';

export default function Editor() {
  const { data: directives } = useQuery(['test'], () =>
    fetch('/api/editor/directive')
      .then((r) => r.json())
      .then((d) => d as Directive[])
  );

  const handleCreate = () => {
    fetch('/api/editor/exercise');
  };

  return (
    <Container size="sm" h="100%">
      <Flex justifyContent="center" alignItems="center" h="100%">
        <Select>
          {directives?.map((directive) => (
            <option key={directive.id}>{directive.prompt}</option>
          ))}
        </Select>
        <Button onClick={handleCreate}>Create Demo Question Set</Button>
      </Flex>
    </Container>
  );
}
