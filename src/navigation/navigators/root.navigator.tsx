import { Routes, Route } from 'react-router-dom';

import { Header } from '../components/header';
import { Footer } from '../components/footer';

import { HomePage } from '../../modules/home-page';
import { withPage } from '../../hoc/with-page';
import { Profile } from '../../modules/Profile';
import { UserConfirned } from '../components/UserConfirned';
import { AdminPage } from '../../modules/admin';
import { ServicesPage } from '../../modules/services-page';
import { ServicesPageDetail } from '../../modules/services-page/ServicesPageDetail';

const Home = withPage(HomePage);
const ProfilePage = withPage(Profile);
const Admin = withPage(AdminPage);
const Services = withPage(ServicesPage);
const SerDat = withPage(ServicesPageDetail);

export const RootNavigator = () => {
  return (
    <>
      <Header />
      <UserConfirned />
      <Routes>
        <Route index element={<Home />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:id" element={<SerDat />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
      <Footer />
    </>
  );
};
