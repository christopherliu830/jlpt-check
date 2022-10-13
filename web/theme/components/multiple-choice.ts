import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const helpers = createMultiStyleConfigHelpers(['question', 'choice']);

export const MultipleChoice = helpers.defineMultiStyleConfig({
  baseStyle: {
    question: {
      fontSize: '2xl',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    choice: {
    }
  }
});
