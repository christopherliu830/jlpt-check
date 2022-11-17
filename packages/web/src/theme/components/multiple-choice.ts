import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers(['directive', 'question', 'choice', 'multiLineQuestion']);

export const MultipleChoice = helpers.defineMultiStyleConfig({
  baseStyle: ({ colorScheme: c }) => ({
    directive: {
      textAlign: 'center',
      fontWeight: 'bold',
    },
    question: {
      fontSize: '2xl',
      textAlign: 'center',
      padding: 4,
      margin: 2,
      whiteSpace: 'pre-wrap',
      verticalAlign: 'baseline',
      background: `${c}.50`,
    },
    multiLineQuestion: {
      fontSize: 'xl',
      textAlign: 'left',
      padding: 4,
      margin: 2,
      whiteSpace: 'pre-wrap',
      background: `${c}.50`,
    },
    choice: {
      marginLeft: 'auto',
      marginRight: 'auto',
      '& > *': {
        justifyContent: 'center',
      },
    },
  }),
});
