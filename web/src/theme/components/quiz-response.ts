import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers(['container', 'iconbox']);

export const QuizResponse = helpers.defineMultiStyleConfig({
  baseStyle: {
    container: {
      pointerEvents: 'none',
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
    iconbox: {
      color: 'green',
      stroke: 'white',
      filter: 'drop-shadow(0 0 1px rgba(0, 0, 0, 0.2)',
    },
  },
});
