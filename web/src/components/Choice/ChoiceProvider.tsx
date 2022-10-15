import { createStylesContext, SystemStyleObject } from '@chakra-ui/react';
import React from 'react';

type ChoiceProviderContext = {
  selected: boolean;
  variant: string;
};

const [StylesProvider, useStylesFunc] = createStylesContext('Choice');

export const useStyles = useStylesFunc;
export const ChoiceContext = React.createContext<ChoiceProviderContext>({
  selected: false,
  variant: 'base',
});

export function useChoice() {
  return React.useContext(ChoiceContext);
}

type ChoiceProviderProps = React.PropsWithChildren & {
  selected: boolean;
  variant: string;
  styles: Record<string, SystemStyleObject>;
};

export function ChoiceProvider({ children, selected, variant, styles }: ChoiceProviderProps) {
  return (
    <StylesProvider value={styles}>
      <ChoiceContext.Provider value={{ selected, variant }}>{children}</ChoiceContext.Provider>
    </StylesProvider>
  );
}
