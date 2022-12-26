import React, { ReactNode, createContext, useContext, useState, SetStateAction, Dispatch } from 'react';
import { QuizHistory } from './util';

type QuizProviderContext = {
  quizHistory: QuizHistory;
  setQuizHistory: Dispatch<SetStateAction<QuizHistory>>;
};

export const QuizContext = createContext<QuizProviderContext>({
  quizHistory: [],
  setQuizHistory: () => [],
});

export function useQuiz() {
  return useContext(QuizContext);
}

export function QuizProvider({ children }: { children: ReactNode }) {
  const [quizHistory, setQuizHistory] = useState<QuizHistory>([]);

  return <QuizContext.Provider value={{ quizHistory, setQuizHistory }}>{children}</QuizContext.Provider>;
}
