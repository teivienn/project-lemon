import { Modal, useModal, Text } from '@nextui-org/react';
import { AddHeader } from '../component/AddHeader';
import { AddServicesBody } from './AddServicesBody';

export const AddServices = () => {
  const { setVisible, bindings } = useModal();

  return (
    <>
      <AddHeader title="услуги" buttonText="добавить" click={() => setVisible(true)} />
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
    </>
  );
};
