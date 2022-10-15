import { Box, chakra, Flex, Icon, ScaleFade, shouldForwardProp, Text, useMultiStyleConfig } from '@chakra-ui/react';
import { faCheckCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
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
  const [faIcon, setFaIcon] = useState(faCheckCircle);
  const [color, setColor] = useState('green');
  const styles = useMultiStyleConfig('QuizResponse');

  useEffect(() => {
    const reset = () => {
      onTimeout && onTimeout();
      setAnimation({ scale: 0, opacity: 0 });
      setShowSun(false);
    };

    if (response) {
      if (response === 'success') {
        setFaIcon(faCheckCircle);
        setShowSun(true);
        setColor('green');
      }

      if (response === 'fail') {
        setFaIcon(faCircleXmark);
        setColor('red');
      }

      const routine = setTimeout(reset, 2000);
      setAnimation({ scale: 1, opacity: 1 });
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
        initial={{ scale: 0, opacity: 0 }}
        // @ts-ignore
        transition={{ duration: 0.5, ease: 'backInOut' }}
      >
        <Icon __css={styles.iconbox} color={color} as={FontAwesomeIcon} icon={faIcon} size="6x" />
      </ChakraBox>
      <Sun show={showSun} />
    </Flex>
  );
}
