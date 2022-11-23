import { PropsWithChildren, ReactNode } from 'react';
import { useStore } from '../lib/store';

interface AuthGateProps extends PropsWithChildren {
  fallback?: ReactNode;
}

export const AuthGate = ({ children, fallback = null }: AuthGateProps) => {
  const { session } = useStore();

  return session ? <>{children}</> : <>{fallback}</>;
};
