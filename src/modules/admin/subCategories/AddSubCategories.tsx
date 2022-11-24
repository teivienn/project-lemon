import { Modal, useModal, Text } from '@nextui-org/react';
import { AddHeader } from '../component/AddHeader';
import { AddSubCategoriesBody } from './AddSubCategoriesBody';

export const AddSubCategories = () => {
  const { setVisible, bindings } = useModal();

  return (
    <>
      <AddHeader
        title="Под-Категории"
        buttonText="добавить"
        click={() => setVisible(true)}
      />
      <Modal
        scroll
        closeButton
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Добавить под-категорию
          </Text>
        </Modal.Header>
        <AddSubCategoriesBody close={() => setVisible(false)} />
      </Modal>
    </>
  );
};
