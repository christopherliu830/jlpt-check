import { Box, chakra, Flex, Icon, ScaleFade, shouldForwardProp, Text, useMultiStyleConfig } from '@chakra-ui/react';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isValidMotionProp, motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import Sun from '../Sun/Sun';

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

export function QuizResponse({ response, onTimeout }: { response?: string; onTimeout?: () => void }) {
  const [showSun, setShowSun] = useState(false);
  const styles = useMultiStyleConfig('QuizResponse');

  let scale, opacity: number;

  switch (response) {
    case 'success':
      scale = 1;
      opacity = 1;
      break;
    default:
      scale = 0;
      opacity = 0;
      break;
  }

  useEffect(() => {
    const reset = () => {
      onTimeout && onTimeout();
      setShowSun(false);
    };

    if (response && onTimeout) {
      const routine = setTimeout(reset, 2000);
      setShowSun(true);
      return () => {
        clearTimeout(routine);
        setShowSun(false);
      };
    }
  }, [response, onTimeout]);

  return (
    <Flex __css={styles.container}>
      <ChakraBox
        pos="absolute"
        as={motion.div}
        borderRadius="50%"
        bg="white"
        boxShadow="md"
        animate={{ scale, opacity }}
        // @ts-ignore
        transition={{ duration: 0.5, ease: 'backInOut' }}
      >
        <Icon __css={styles.iconbox} as={FontAwesomeIcon} icon={faCheckCircle} size="6x" />
      </ChakraBox>
      <Sun show={showSun} />
    </Flex>
  );
}
