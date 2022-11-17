import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers(['directive', 'question', 'choice', 'multiLineQuestion']);

export const MultipleChoice = helpers.defineMultiStyleConfig({
  baseStyle: {
    directive: {
      textAlign: 'center',
      fontWeight: 'bold',
    },
    question: {
      fontSize: '2xl',
      textAlign: 'center',
      margin: '32px',
      whiteSpace: 'pre-wrap',
      verticalAlign: 'baseline',
    },
    multiLineQuestion: {
      fontSize: 'xl',
      textAlign: 'left',
      margin: '32px',
      whiteSpace: 'pre-wrap',
    },
    choice: {
      marginLeft: 'auto',
      marginRight: 'auto',
      '& > *': {
        display: 'block',
        textAlign: 'center',
      },
    },
  },
});
