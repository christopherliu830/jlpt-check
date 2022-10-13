import React from 'react';
import { Box, BoxProps } from '@chakra-ui/layout';
import { 
  Flex,
  FlexProps,
  IconProps as ChakraIconProps,
  Icon as ChakraIcon,
  useMultiStyleConfig,
  createStylesContext,
} from '@chakra-ui/react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const [StylesProvider, useStyles] = createStylesContext('Choice');

export interface IconProps extends Omit<FontAwesomeIconProps, keyof ChakraIconProps>, ChakraIconProps {}
const Icon = (props: IconProps): React.ReactElement => (
  <ChakraIcon as={FontAwesomeIcon} {...props} />
);

export interface ChoiceProps extends BoxProps {
  selected?: boolean;
  fullWidth?: boolean;
  variant?: string;
}


export function Choice({
  fullWidth = false,
  selected = false,
  variant = 'base',
  children,
  __css,
  ...props
}: ChoiceProps): React.ReactElement {

  const styles = useMultiStyleConfig('Choice', { variant: selected ? 'selected' : 'base' });

  return (
    <Flex
      __css={{...styles.container, ...__css}}
      role="group"
      w={fullWidth ? '100%' : 'auto'}
      {...props}
    >
      <StylesProvider value={styles}>
        { children }
      </StylesProvider>
    </Flex>
  )
}

export interface ChoiceHeaderProps extends FlexProps {
  icon?: IconProp;
}

export function ChoiceHeader({
  icon,
  children,
  ...props
}: ChoiceHeaderProps): React.ReactElement {
  const styles = useStyles();

  return (
    <Flex
      __css={styles.header}
      {...props}
    >
      { icon && <Icon icon={icon} margin="0 8px" alignSelf="center" /> }
      { children }
    </Flex>
  )
}

export function ChoiceBody(props: BoxProps): React.ReactElement {
  const styles = useStyles();

  const { __css, ...rest } = props;
  const style = {
    ...__css,
    ...styles.body
  };

  return (
    <Box
      __css={style}
      {...rest}
    />
  )
}