import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

type Interaction = 'base' | 'hover' | 'active';

export default function Interactable({ children }: { children: (currentInteraction: Interaction) => JSX.Element }) {
  const [currentInteraction, setCurrentInteraction] = useState<Interaction>('base');
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const handleHover = (isHovering: boolean) => {
    if (isHovering) {
      setHover(true);
    } else {
      setHover(false);
      // Can't be active on an object if we aren't hovering over it
      setActive(false);
    }
  };

  const handleTouch = (isTouching: boolean) => {
    setActive(isTouching);
  };

  useEffect(() => {
    if (active) {
      setCurrentInteraction('active');
    } else if (hover) {
      setCurrentInteraction('hover');
    } else {
      setCurrentInteraction('base');
    }
  }, [active, hover]);

  return (
    <Box
      onTouchStart={() => handleTouch(true)}
      onMouseDown={() => handleTouch(true)}
      onTouchEnd={() => handleTouch(false)}
      onMouseUp={() => handleTouch(false)}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      {children(currentInteraction)}
    </Box>
  );
}
