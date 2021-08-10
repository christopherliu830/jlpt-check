import React from 'react';
import { Flex, Spacer } from '@chakra-ui/react';
import { Link } from './Link/Link';
import { useHistory } from 'react-router';

import { Logo } from '../Logo/Logo';

export function Navbar(): React.ReactElement {
  const history = useHistory();

  const handleLogoClick = () => {
    history.push('/')
  }

  return (
    <Flex
      w="100%" 
      bg="violet.700" 
      color="white"
      padding="4px 8px"
      boxShadow="0 0 16px 0 rgba(0, 0, 0, 0.2)"
      alignItems="center"
    >
      <Logo fontSize="4xl" onClick={handleLogoClick}/>
      <Spacer />
      <Link to="/assessment">Test</Link>
      <Link to="/practice">Practice</Link>
      <Link to="/about">About</Link>
    </Flex>
  );
}
