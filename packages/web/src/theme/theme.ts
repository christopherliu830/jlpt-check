import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import { green, salmon, violet, yellow } from './colors';

// Component Extensions
import { BlankSpace } from './components/blank-space';
import { Checkbox } from './components/checkbox';
import { Choice } from './components/choice';
import { Container } from './components/container';
import { MultipleChoice } from './components/multiple-choice';
import { QuizResponse } from './components/quiz-response';

export const theme = extendTheme(
  {
    colors: {
      violet,
      salmon,
      yellow,
      green,
    },
    fonts: {
      body: `'Atkinson Hyperlegible', "ヒラギノ角ゴ Pro W3","Hiragino Kaku Gothic Pro","ＭＳ Ｐゴシック", "MS Gothic", sans-serif`,
    },
    components: {
      BlankSpace,
      Checkbox,
      Choice,
      Container,
      MultipleChoice,
      QuizResponse,
    },
  },
  withDefaultColorScheme({ colorScheme: 'violet' })
);
