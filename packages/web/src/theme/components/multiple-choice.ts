import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers(['question', 'choice']);

export const MultipleChoice = helpers.defineMultiStyleConfig({
  baseStyle: {
    question: {
      fontSize: 'lg',
    },
    choice: {},
  },
});
