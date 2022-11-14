import { Routes, Route } from 'react-router-dom';

import { Header } from '../components/header';
import { Footer } from '../components/footer';

import { HomePage } from '../../modules/home-page';
import { CatalogPage } from '../../modules/catalog-page';
import { ContactsPage } from '../../modules/contacts-page';
import { ServicesPage } from '../../modules/services-page';
import { withPage } from '../../hoc/with-page';

const Home = withPage(HomePage);

export const AppNavigator = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>
      <Footer />
    </>
  );
};
