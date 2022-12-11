import { isEmpty } from 'lodash';
import { Modal, Text } from '@nextui-org/react';
import { EditServiceBody } from '~/modules/admin/services/EditServiceBody';

export const EditService = ({ servi, onClose, bindings }: any) => {
  console.log(!isEmpty(servi), 'servi');

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
            Редактировать услугу
          </Text>
        </Modal.Header>
        {!isEmpty(servi) && <EditServiceBody servi={servi} onClose={onClose} />}
      </Modal>
    </>
  );
};
