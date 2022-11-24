import { Modal, useModal, Text } from '@nextui-org/react';
import { AddHeader } from '../component/AddHeader';
import { AddCategoriesBody } from './AddCategoriesBody';

export const AddCategories = () => {
  const { setVisible, bindings } = useModal();

  return (
    <>
      <AddHeader title="Категории" buttonText="добавить" click={() => setVisible(true)} />
      <Modal
        scroll
        closeButton
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Добавить категорию
          </Text>
        </Modal.Header>
        <AddCategoriesBody close={() => setVisible(false)} />
      </Modal>
    </>
  );
};
