import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import { violet } from './colors';

// Component Extensions
import { Checkbox } from './components/checkbox';
import { Choice } from './components/choice';
import { Container } from './components/container';
import { MultipleChoice } from './components/multiple-choice';
import { QuizResponse } from './components/quiz-response';

export const theme = extendTheme(
  {
    colors: {
      violet,
    },
    fonts: {
      body: `'Atkinson Hyperlegible', "ヒラギノ角ゴ Pro W3","Hiragino Kaku Gothic Pro","ＭＳ Ｐゴシック", "MS Gothic", sans-serif`,
    },
    components: {
      Checkbox,
      Choice,
      Container,
      MultipleChoice,
      QuizResponse,
    },
  },
  withDefaultColorScheme({ colorScheme: 'violet' })
);
