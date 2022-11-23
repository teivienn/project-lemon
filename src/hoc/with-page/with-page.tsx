import React from 'react';
import { Box } from '../../components/helpers';

const height = 'calc(100vh - 70px)';

export interface WithPageProps {
  setLoading: (value: boolean) => void;
}

export const withPage =
  <P extends JSX.IntrinsicAttributes>(Component: React.ComponentType<P>) =>
  (props: P) => {
    return (
      <Box flex={1} minHeight={height} display="flex">
        <Component {...props} />
      </Box>
    );
  };
