import { Routes, Route } from 'react-router-dom';

import { Header } from '../components/header';
import { Footer } from '../components/footer';

import { HomePage } from '~/modules/home-page';
import { withPage } from '~/hoc/with-page';
import { Profile } from '~/modules/Profile';
import { UserConfirned } from '../components/UserConfirned';
import { AdminPage } from '~/modules/admin';
import { ContactsPage } from '~/modules/contacts-page';
import { CatalogPage } from '~/modules/catalog-page';
import { CompanyPage } from '~/modules/Company';

const Home = withPage(HomePage);
const ProfilePage = withPage(Profile);
const Admin = withPage(AdminPage);
const Contacts = withPage(ContactsPage);
const Catalog = withPage(CatalogPage);
const Company = withPage(CompanyPage);

export const RootNavigator = () => {
  return (
    <>
      <Header />
      <UserConfirned />
      <Routes>
        <Route index element={<Home />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="company" element={<Company />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
      <Footer />
    </>
  );
};
