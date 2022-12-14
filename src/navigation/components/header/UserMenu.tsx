import { Dropdown, Navbar, Avatar, Loading, Button, Badge } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { Key, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api';
import { useStore } from '../../../lib/store';
import { FiShoppingCart } from 'react-icons/fi';
import { useBucket } from '~/lib/Bucket/BucketProvider';

export const UserMenu = () => {
  const { profile, setProfile } = useStore();
  const navigate = useNavigate();
  const { productIds, setVisible, clean } = useBucket();

  const { mutate } = useMutation({
    mutationFn: api.profile.logout,
    onSuccess: () => [setProfile(null), clean()],
  });

  const onAction = (actionKey: Key) => {
    switch (actionKey) {
      case 'logout': {
        mutate();
        break;
      }
      case 'settings': {
        navigate('/profile');
        break;
      }
      case 'admin': {
        navigate('/admin');
        break;
      }
      default: {
        break;
      }
    }
  };

  const items = useMemo(
    () => [
      ...[
        profile?.admin ? <Dropdown.Item key="admin">Админ Панель</Dropdown.Item> : null,
      ],
      <Dropdown.Item key="settings">Редактировать Профиль</Dropdown.Item>,
      <Dropdown.Item key="logout" withDivider color="error">
        Выйти
      </Dropdown.Item>,
    ],
    [profile?.admin],
  );

  return (
    <Navbar.Content
      css={{
        '@xs': {
          w: '12%',
          jc: 'flex-end',
        },
      }}
    >
      <Badge color="error" content={productIds?.length || 0}>
        <Button
          auto
          color={'#fffff' as any}
          icon={<FiShoppingCart fill="currentColor" />}
          onClick={() => setVisible(true)}
        />
      </Badge>
      {!profile ? (
        <Loading />
      ) : (
        <Dropdown placement="bottom-right">
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar bordered as="button" size="md" text="U" src={profile.avatar_url} />
            </Dropdown.Trigger>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label="User menu actions"
            color="secondary"
            onAction={onAction}
          >
            {items as never}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </Navbar.Content>
  );
};
