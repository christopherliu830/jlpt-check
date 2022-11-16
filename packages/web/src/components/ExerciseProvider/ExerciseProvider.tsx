import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Exercise } from 'utils/prisma';

type ExerciseProviderContext = {
  exercise?: Exercise;
  selected: number[];
  setSelected: Dispatch<SetStateAction<number[]>>;
};

export const ExerciseContext = React.createContext<ExerciseProviderContext>({
  selected: [],
  setSelected: () => {
    /* nothing */
  },
});

export function useExercise() {
  return React.useContext(ExerciseContext);
}

type ExerciseProviderProps = React.PropsWithChildren & {
  exercise: Exercise;
};

export function ExerciseProvider(props: ExerciseProviderProps) {
  const [selected, setSelected] = useState<number[]>([]);

  const { children, exercise } = props;

  useEffect(() => {
    setSelected([]);
  }, [exercise]);

  return <ExerciseContext.Provider value={{ exercise, selected, setSelected }}>{children}</ExerciseContext.Provider>;
}
