import React, { useEffect, useRef } from 'react';
import { Box, BoxProps } from '@chakra-ui/layout';
import {
  Flex,
  FlexProps,
  IconProps as ChakraIconProps,
  Icon as ChakraIcon,
  useMultiStyleConfig,
  useTheme,
} from '@chakra-ui/react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { motion } from 'framer-motion';
import { animateBody, animateHeader } from '../../theme/components/choice';
import { ChoiceProvider, useChoice, useStyles } from './ChoiceProvider';
import Interactable from '../Interactable/Interactable';

export interface IconProps extends Omit<FontAwesomeIconProps, keyof ChakraIconProps>, ChakraIconProps {}
const Icon = (props: IconProps): React.ReactElement => <ChakraIcon as={FontAwesomeIcon} {...props} />;

export interface ChoiceProps extends BoxProps {
  selected?: boolean;
  fullWidth?: boolean;
  variant?: string;
}

export function Choice({
  fullWidth = false,
  selected = false,
  children,
  onClick,
  __css,
  ...props
}: ChoiceProps): React.ReactElement {
  return (
    <Interactable>
      {(interaction) => {
        const styles = useMultiStyleConfig('Choice', { variant: interaction });
        return (
          <ChoiceProvider selected={selected} variant={interaction} styles={styles}>
            <Flex
              as={motion.div}
              onMouseDown={onClick}
              __css={{ ...styles.container, ...__css }}
              w={fullWidth ? '100%' : 'auto'}
              {...props}
            >
              {children}
            </Flex>
          </ChoiceProvider>
        );
      }}
    </Interactable>
  );
}

export interface ChoiceHeaderProps extends FlexProps {
  icon?: IconProp;
}

export function ChoiceHeader({ icon, children, ...props }: ChoiceHeaderProps): React.ReactElement {
  const { header: styles } = useStyles();
  const { variant, selected } = useChoice();
  const theme = useTheme();

  const animations = animateHeader(theme, { ...theme.components.Choice.defaultProps, ...props });
  const animation = `${selected ? 'selected' : 'unselected'}-${variant}`;

  return (
    <Flex as={motion.div} animate={animation} __css={styles} {...props} {...animations}>
      {icon && <Icon icon={icon} margin="0 8px" alignSelf="center" />}
      {children}
    </Flex>
  );
}

export function ChoiceBody(props: BoxProps): React.ReactElement {
  const { __css, children, ...rest } = props;
  const theme = useTheme();
  const { variant, selected } = useChoice();
  const styles = useStyles();
  const ref = useRef<HTMLDivElement>(null);

  const animationProps = { ...theme.components.Choice.defaultProps, ...props };
  const animations = animateBody(theme, animationProps);
  const animation = `${selected ? 'selected' : 'unselected'}-${variant}`;

  const style = {
    ...__css,
    ...styles.body,
  };

  return (
    <Box as={motion.div} ref={ref} animate={animation} __css={style} {...rest} {...animations}>
      {children}
    </Box>
  );
}
