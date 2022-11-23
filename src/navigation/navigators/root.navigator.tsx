import { Routes, Route } from 'react-router-dom';

import { Header } from '../components/header';
import { Footer } from '../components/footer';

import { HomePage } from '../../modules/home-page';
import { CatalogPage } from '../../modules/catalog-page';
import { ContactsPage } from '../../modules/contacts-page';
import { ServicesPage } from '../../modules/services-page';
import { withPage } from '../../hoc/with-page';
import { Profile } from '../../modules/Profile';
import { UserConfirned } from '../components/UserConfirned';

const Home = withPage(HomePage);
const ProfilePage = withPage(Profile);

export const RootNavigator = () => {
  return (
    <>
      <Header />
      <UserConfirned />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </>
  );
};
