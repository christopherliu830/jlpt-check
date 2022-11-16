import React, { useState } from 'react';
import { SlideFade, SlideFadeProps } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';

interface FadeInViewProps extends SlideFadeProps {
  duration?: number;
  delay?: number;
  open?: boolean;
  children: React.ReactNode;
}

function flipCss(value: string | number) {
  if (typeof value === 'string') {
    if (value[0] === '-') return value.slice(1);
    else return '-' + value;
  } else return -value;
}

export function FadeInView({
  children,
  duration = 0.5,
  delay = 0,
  open = undefined,
  onAnimationComplete,
  offsetY = 8,
  ...props
}: FadeInViewProps): React.ReactElement {
  const { ref, inView } = useInView();
  const [entered, setEntered] = useState(false);

  const offset = offsetY && (entered ? flipCss(offsetY) : offsetY);

  const handleAnimationComplete = (animationDefinition: string) => {
    if (animationDefinition === 'enter') setEntered(true);
    onAnimationComplete && onAnimationComplete(animationDefinition);
  };

  return (
    <SlideFade
      ref={ref}
      in={open ?? inView}
      transition={{
        enter: {
          duration,
          delay,
        },
      }}
      {...props}
      offsetY={offset}
      onAnimationComplete={handleAnimationComplete}
    >
      {children}
    </SlideFade>
  );
}
