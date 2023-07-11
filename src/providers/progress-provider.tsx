import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const ProgressContext = createContext({
  progressIsShown: false,
  setProgressIsShownHandler: (isShown: boolean) => {},
});

export function ProgressProvider({ children }: PropsWithChildren) {
  const [progressIsShown, setProgressIsShown] = useState<boolean>(false);

  const setProgressIsShownHandler = useCallback((isShown: boolean) => {
    setProgressIsShown(isShown);
  }, []);

  const value = useMemo(
    () => ({
      setProgressIsShownHandler,
      progressIsShown,
    }),
    [progressIsShown, setProgressIsShownHandler]
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => useContext(ProgressContext);
