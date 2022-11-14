import { Routes, Route } from 'react-router-dom';

import { AppNavigator } from './app.navigator';

export const RootNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<AppNavigator />} />
      <Route path="/admin" />
    </Routes>
  );
};
