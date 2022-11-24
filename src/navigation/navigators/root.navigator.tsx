import { Routes, Route } from 'react-router-dom';

import { Header } from '../components/header';
import { Footer } from '../components/footer';

import { HomePage } from '../../modules/home-page';
import { withPage } from '../../hoc/with-page';
import { Profile } from '../../modules/Profile';
import { UserConfirned } from '../components/UserConfirned';
import { AdminPage } from '../../modules/admin';

const Home = withPage(HomePage);
const ProfilePage = withPage(Profile);
const Admin = withPage(AdminPage);

export const RootNavigator = () => {
  return (
    <>
      <Header />
      <UserConfirned />
      <Routes>
        <Route index element={<Home />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
      <Footer />
    </>
  );
};
