import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers(['directive', 'question', 'choice', 'multiLineQuestion', 'button']);

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
    button: {
      margin: '36px 0',
      transition: 'background-color, border-color, fill, stroke, opacity',
      '&:active:enabled': {
        transform: 'translate(0, 2px)',
        boxShadow: 'inset 0px 8px 12px 0 rgba(0, 0, 0, 0.2)',
      },
    },
  }),
});
