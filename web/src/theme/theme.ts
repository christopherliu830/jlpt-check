import { extendTheme } from '@chakra-ui/react';
import { violet } from './colors';

// Component Extensions
import { Checkbox } from './components/checkbox';
import { Choice } from './components/choice';
import { Container } from './components/container';
import { MultipleChoice } from './components/multiple-choice';


export const theme = extendTheme({
  colors: {
    violet 
  },
  components: {
    Checkbox,
    Choice,
    Container,
    MultipleChoice
  }
})