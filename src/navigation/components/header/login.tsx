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
              style: {
                button: {
                  background: '#0072f5',
                  color: 'white',
                  border: 0,
                  borderRadius: 10,
                },
              },
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email',
                  password_label: 'Пароль',
                  button_label: 'Войти',
                  email_input_placeholder: '',
                  password_input_placeholder: '',
                  link_text: 'Войти',
                },
                sign_up: {
                  email_label: 'Email',
                  password_label: 'Пароль',
                  button_label: 'Зарегестрироваться',
                  email_input_placeholder: '',
                  password_input_placeholder: '',
                  link_text: 'Зарегестрироваться',
                },
                forgotten_password: {
                  email_label: 'Email',
                  password_label: 'Пароль',
                  email_input_placeholder: '',
                  button_label: 'Продолжить',
                  link_text: 'Забыли пароль?',
                },
                update_password: {
                  password_label: 'Пароль',
                  password_input_placeholder: '',
                  button_label: 'Продолжить',
                },
              },
            }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
