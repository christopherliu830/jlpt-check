import { Box, chakra, Flex, Icon, ScaleFade, shouldForwardProp, Text, useMultiStyleConfig } from '@chakra-ui/react';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isValidMotionProp, motion, TargetAndTransition, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import Sun from '../Sun/Sun';

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

export function QuizResponse({ response, onTimeout }: { response?: string; onTimeout?: () => void }) {
  const [showSun, setShowSun] = useState(false);
  const [animation, setAnimation] = useState<TargetAndTransition>({});
  const styles = useMultiStyleConfig('QuizResponse');

  useEffect(() => {
    const reset = () => {
      onTimeout && onTimeout();
      setAnimation({ scale: 0, opacity: 0 });
      setShowSun(false);
    };

    if (response && onTimeout) {
      const routine = setTimeout(reset, 2000);
      setAnimation({ scale: 1, opacity: 1 });
      setShowSun(true);
      return () => {
        reset();
        clearTimeout(routine);
      };
    }
  }, [response, onTimeout]);

  return (
    <Flex __css={styles.container}>
      <ChakraBox
        __css={styles.iconbackground}
        as={motion.div}
        animate={animation}
        // @ts-ignore
        transition={{ duration: 0.5, ease: 'backInOut' }}
      >
        <Icon __css={styles.iconbox} as={FontAwesomeIcon} icon={faCheckCircle} size="6x" />
      </ChakraBox>
      <Sun show={showSun} />
    </Flex>
  );
}
