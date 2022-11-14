import { NextUIProvider } from '@nextui-org/react';
import { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Compose } from '../components/helpers';

import { LocalizationProvider } from '../lib/localization';

export const Prepare = ({ children }: PropsWithChildren) => (
  <Compose components={[NextUIProvider, BrowserRouter, LocalizationProvider]}>
    {children}
  </Compose>
);
