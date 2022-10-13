import { Container } from "@chakra-ui/react";
import { Choice, ChoiceBody } from "../components/Choice/Choice";
import MultipleChoice from "../components/MultipleChoice/MultipleChoice";

function Question() {
  return (
    <Container size="sm">
      <MultipleChoice />
    </Container>
  )
}

export default Question;