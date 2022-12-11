import { isEmpty } from 'lodash';
import { Modal, Text } from '@nextui-org/react';
import { EditProductBody } from '~/modules/admin/catalog/EditProductBody';

export const EditProduct = ({ servi, onClose, bindings }: any) => {
  return (
    <>
      <Modal
        scroll
        fullScreen
        closeButton
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        onClose={onClose}
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Редактировать Товар
          </Text>
        </Modal.Header>
        {!isEmpty(servi) && <EditProductBody servi={servi} onClose={onClose} />}
      </Modal>
    </>
  );
};
