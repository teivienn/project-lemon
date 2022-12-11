import { useBucket } from '~/lib/Bucket/BucketProvider';
import { Modal, Text } from '@nextui-org/react';
import { ModalBody } from '~/lib/Bucket/Modal/ModalBody';

export const ModalBuck = () => {
  const { bindings, setVisible } = useBucket();

  return (
    <Modal
      scroll
      closeButton
      width="800px"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      {...bindings}>
      <Modal.Header>
        <Text id="modal-title" size={18}>Корзина</Text>
      </Modal.Header>
      <ModalBody close={() => setVisible(false)} />
    </Modal>
  )
}
