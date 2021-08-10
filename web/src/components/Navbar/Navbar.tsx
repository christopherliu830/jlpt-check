import React from 'react';
import { Box } from '@chakra-ui/react';
import { Logo } from '../Logo/Logo';
import { useHistory } from 'react-router';

export function Navbar(): React.ReactElement {
  const history = useHistory();

  const handleLogoClick = () => {
    history.push('/')
  }

  return (
    <Box
      w="100%" 
      bg="violet.700" 
      color="white"
      padding="4px 8px"
      boxShadow="0 0 16px 0 rgba(0, 0, 0, 0.2)"
    >
      <Logo fontSize="4xl" onClick={handleLogoClick}/>
    </Box>
  );
}
