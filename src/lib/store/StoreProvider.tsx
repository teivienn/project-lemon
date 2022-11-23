import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { useSession } from './useSession';
import { Store } from './types';

const StoreContext = createContext<Store>({} as never);

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const { profile, session, setProfile } = useSession();

  const value = useMemo<Store>(
    () => ({ profile, setProfile, session }),
    [profile, session, setProfile],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
