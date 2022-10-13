import React from 'react';
import { Flex, Spacer, useBreakpoint, useBreakpointValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { Logo } from '../Logo/Logo';

export function Navbar(): React.ReactElement {
  const router = useRouter();
  const collapsed = useBreakpointValue({base: true, md: false });

  const handleLogoClick = () => {
    router.push('/');
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
      {!collapsed && 
        <>
          <Spacer />
        </>
      }
    </Flex>
  );
}
