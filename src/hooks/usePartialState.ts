import { useState, useCallback } from 'react';

export const usePartialState = <S>(
  initialState: S,
): [S, (payload: Partial<S>) => void] => {
  const [state, update] = useState(initialState);

  const setState = useCallback((value: Partial<S>) => {
    update((prev) => ({
      ...prev,
      ...value,
    }));
  }, []);

  return [state, setState];
};
