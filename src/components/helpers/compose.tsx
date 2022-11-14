import React, { PropsWithChildren } from 'react';

interface ComposeProps {
  components: React.ComponentType<PropsWithChildren>[];
  children: React.ReactNode;
}

export const Compose: React.FC<ComposeProps> = ({ components = [], children }) => {
  return (
    <>
      {components.reduceRight(
        (acc, Component) => (
          <Component>{acc}</Component>
        ),
        children,
      )}
    </>
  );
};
