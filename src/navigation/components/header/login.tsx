import { Button, Navbar, Modal, Text } from '@nextui-org/react';
import { useState } from 'react';
import { Auth as SupaAuth, ThemeSupa } from '@supabase/auth-ui-react';
import { supabase } from '../../../lib/supabase';

export const Login = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Navbar.Content>
        <Navbar.Item>
          <Button auto flat onClick={() => setVisible(true)}>
            Sign Up
          </Button>
        </Navbar.Item>
      </Navbar.Content>

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={() => setVisible(false)}
      >
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
          <SupaAuth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
            }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
