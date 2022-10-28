import { NextUIProvider } from '@nextui-org/react';
import { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const Prepare = ({ children }: PropsWithChildren) => (
  <NextUIProvider>
    <BrowserRouter>{children}</BrowserRouter>
  </NextUIProvider>
);
