import { NextUIProvider } from '@nextui-org/react';
import { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Compose } from '../components/helpers';
import { ClientProvider } from '../lib/client';

import { LocalizationProvider } from '../lib/localization';
import { StoreProvider } from '../lib/store';

export const Prepare = ({ children }: PropsWithChildren) => (
  <Compose
    components={[
      NextUIProvider,
      BrowserRouter,
      LocalizationProvider,
      ClientProvider,
      StoreProvider,
    ]}
  >
    {children}
  </Compose>
);
