import { Prepare } from './prepare';

import { RootNavigator } from '../navigation/navigators';
import { ModalBuck } from '~/lib/Bucket/Modal/Modal';

export const App = () => (
  <Prepare>
    <RootNavigator />
    <ModalBuck />
  </Prepare>
);
