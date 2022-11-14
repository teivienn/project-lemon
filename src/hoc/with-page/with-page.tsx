import React, { useState } from 'react';
import { Loading } from '@nextui-org/react';
import { Box } from '../../components/helpers';

const height = 'calc(100vh - 70px)';

export interface WithPageProps {
  setLoading: (value: boolean) => void;
}

export const withPage =
  <P extends JSX.IntrinsicAttributes>(
    Component: React.ComponentType<P & WithPageProps>,
  ) =>
  (props: P) => {
    const [loading, setLoading] = useState(true);

    if (loading) {
      return (
        <Box flex={1} display="flex" minHeight={height} center>
          <Loading />
        </Box>
      );
    }

    return (
      <Box flex={1} minHeight={height} display="flex">
        <Component {...props} setLoading={setLoading} />
      </Box>
    );
  };
