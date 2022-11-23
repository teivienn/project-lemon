import { Button, Modal, Text } from '@nextui-org/react';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const UserConfirned = () => {
  const [visible, setVisible] = useState(false);
  const { hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setVisible(hash.includes('access_token'));
  }, [hash]);

  return (
    <Modal aria-labelledby="modal-title" open={visible} onClose={() => setVisible(false)}>
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Welcome to
          <Text b size={18}>
            {' '}
            PORIFiCARLINE
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text b size={16} style={{ textAlign: 'center' }}>
          Пользователь подтвержден, можете войти в свой аккаунт
        </Text>
      </Modal.Body>
      <Modal.Footer
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Button onClick={() => [setVisible(false), navigate('/', { replace: true })]}>
          Продолжить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
