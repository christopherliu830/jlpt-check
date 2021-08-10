import React from 'react';
import { Text, useTheme } from '@chakra-ui/react';
import { NavLink, NavLinkProps } from 'react-router-dom';

export function Link({ children, ...props}: NavLinkProps ): React.ReactElement {
  const theme = useTheme();

  const hoverStyle = {
    color: theme.colors.violet[200],
  }

  const activeStyle = {
    color: theme.colors.violet[100],
  }

  return (
    <NavLink {...props} activeStyle={activeStyle}>
      <Text
        _hover={hoverStyle}
        fontSize="2xl"
        margin="0 8px"
      >
        { children }
      </Text>
    </NavLink>
  )
}