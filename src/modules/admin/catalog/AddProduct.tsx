import { Modal, Text, useModal } from '@nextui-org/react';
import { AddHeader } from '~/modules/admin/component/AddHeader';
import { AddProductBody } from '~/modules/admin/catalog/AddProductBody';

export const AddProduct = () => {
  const { setVisible, bindings } = useModal();

  return (
    <>
      <AddHeader title="Товар" buttonText="добавить" click={() => setVisible(true)} />
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
            Добавить Товар
          </Text>
        </Modal.Header>
        <AddProductBody close={() => setVisible(false)} />
      </Modal>
    </>
  )
};
