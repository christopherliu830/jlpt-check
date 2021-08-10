import React from 'react';
import { SlideFade, SlideFadeProps } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';

interface FadeInViewProps extends SlideFadeProps {
  duration?: number;
  delay?: number;
  open?: boolean;
  children: React.ReactNode;
}

export function FadeInView({
  children,
  duration = 0.5,
  delay = 0,
  open = undefined,
  ...props
}: FadeInViewProps): React.ReactElement {
  const { ref, inView } = useInView();

  return (
    <SlideFade
      ref={ref}
      in={open ?? inView}
      transition={{
        enter: {
          duration,
          delay
        }
      }}
      {...props}
    >
      { children }
    </SlideFade>
  )
}