import React, { useState, useEffect, PropsWithChildren } from 'react';

interface DelayComponentProps extends PropsWithChildren {
  ms?: number;
  fallback?: React.ReactNode;
}

export const DelayComponent: React.FC<DelayComponentProps> = ({
  children,
  ms = 300,
  fallback,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, ms);

    return () => {
      clearTimeout(timeout);
    };
  }, [ms]);

  return visible ? <>{children}</> : <>{fallback}</>;
};
