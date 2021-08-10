import React from 'react';
import { SlideFade } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';

interface FadeInViewProps {
  duration?: number;
  delay?: number;
  children: React.ReactNode;
}

export function FadeInView({
  children,
  duration = 0.5,
  delay = 0,
}: FadeInViewProps): React.ReactElement {
  const { ref, inView } = useInView();

  return (
    <SlideFade
      ref={ref}
      in={inView}
      transition={{
        enter: {
          duration,
          delay
        }
      }}
    >
      { children }
    </SlideFade>
  )
}