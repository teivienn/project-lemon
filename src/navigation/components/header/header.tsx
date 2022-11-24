import { Navbar, Text, Link } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { Icons } from '../../../assets';
import { AuthGate } from '../../../components';
import { UpdateProfileNotify } from '../../../components/UpdateProfileNotify';
import { Login } from './login';
import { UserMenu } from './UserMenu';

const collapseItems = [
  {
    name: 'home',
  },
  {
    name: 'catalog',
  },
  {
    name: 'contacts',
  },
  {
    name: 'services',
  },
];

export const Header = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar variant="floating" isCompact style={{ zIndex: 999 }}>
        <Navbar.Toggle showIn="xs" />
        <Navbar.Brand>
          <Icons.Logo />
          <Text b color="inherit">
            {t('app-name')}
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          <Navbar.Link href="/">Главная</Navbar.Link>
          <Navbar.Link href="#">Каталог</Navbar.Link>
          <Navbar.Link href="#">Компания</Navbar.Link>
          <Navbar.Link href="#">Услуги</Navbar.Link>
          <Navbar.Link href="#">Контакты</Navbar.Link>
        </Navbar.Content>

        <AuthGate fallback={<Login />}>
          <UserMenu />
        </AuthGate>
        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem
              key={item.name}
              activeColor="warning"
              css={{
                color: index === collapseItems.length - 1 ? '$error' : '',
              }}
              isActive={index === 2}
            >
              <Link
                color="inherit"
                css={{
                  minWidth: '100%',
                }}
                href="#"
              >
                {item.name}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>

      <UpdateProfileNotify />
    </>
  );
};
