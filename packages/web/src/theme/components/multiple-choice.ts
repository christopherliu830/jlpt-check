import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers(['directive', 'question', 'choice']);

export const MultipleChoice = helpers.defineMultiStyleConfig({
  baseStyle: ({ colorScheme: c }) => ({
    directive: {
      test: `${console.log(c)}`,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    question: {
      textAlign: 'center',
      fontSize: '3xl',
      margin: '32px',
      whiteSpace: 'pre-wrap',
      background: `rgba(0, 0, 0, gray.100)`,
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
