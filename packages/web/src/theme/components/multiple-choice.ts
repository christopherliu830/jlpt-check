import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers(['directive', 'question', 'choice', 'multiLineQuestion', 'button']);

export const MultipleChoice = helpers.defineMultiStyleConfig({
  baseStyle: {
    directive: {
      textAlign: 'center',
      fontWeight: 'bold',
    },
    question: {
      fontSize: ['md', 'lg', '2xl'],
      textAlign: 'center',
      padding: [2, 4],
      marginX: [0, 2],
      marginY: 2,
      whiteSpace: 'pre-wrap',
      verticalAlign: 'baseline',
      background: `#fff5ec`,
    },
    multiLineQuestion: {
      fontSize: ['sm', 'md', 'lg', 'xl'],
      textAlign: 'left',
      padding: [2, 4],
      marginX: [0, 2],
      marginY: 2,
      whiteSpace: 'pre-wrap',
      background: `#fff5ec`,
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
  },
});
