import React from 'react';

import { Text } from '@chakra-ui/react';
import { faHeadphones, faNewspaper, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Choice, ChoiceHeader, ChoiceBody } from '../Choice/Choice';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface QuizChoiceProps {
  selected?: boolean
  onClick?: React.ReactEventHandler;
}

function createChoice(label: string, body: string, icon: IconProp) {
  return function QuizChoice({ onClick, selected }: QuizChoiceProps): React.ReactElement {
    return (
      <Choice onClick={onClick} selected={selected}>
        <ChoiceHeader icon={icon} minWidth="220px">
          <Text>{ label }</Text>
        </ChoiceHeader>
        <ChoiceBody>
          { body }
        </ChoiceBody>
      </Choice>
    )
  }
}

export const WrittenChoice = createChoice(
  'Short Form',
  'Fill in blanks with short Japanese phrases.',
  faPencilAlt
)

export const ListeningChoice = createChoice(
  'Listening',
  'Answer questions based on a provided audio passage.',
  faHeadphones
)

export const MultipleChoice = createChoice(
  'Multiple Choice',
  'Choose one (or a multiple) of four options.',
  faNewspaper
)
