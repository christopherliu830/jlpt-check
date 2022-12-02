import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers(['container', 'iconbox', 'iconbackground']);

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
    iconbackground: {
      bg: 'white',
      shadow: 'md',
      pos: 'absolute',
      borderRadius: '50%',
    },
    iconbox: {
      stroke: 'white',
      filter: 'drop-shadow(0 0 1px rgba(0, 0, 0, 0.2)',
    },
  },
});
