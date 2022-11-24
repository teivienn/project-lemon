import { Button, Modal, useModal, Text } from '@nextui-org/react';
import { useState } from 'react';
import { Box } from '../../../components/helpers';
import { AddServicesBody } from './AddServicesBody';

export const AddServices = () => {
  const { setVisible, bindings } = useModal();

  return (
    <Box justifyContent="flex-end" display="flex">
      <Button color="secondary" onClick={() => setVisible(true)}>
        добавить
      </Button>
      <Modal
        scroll
        fullScreen
        closeButton
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Добавить услугу
          </Text>
        </Modal.Header>
        <AddServicesBody close={() => setVisible(false)} />
      </Modal>
    </Box>
  );
};
