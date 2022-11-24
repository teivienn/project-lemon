import { Button, Card, Input, Loading, Modal } from '@nextui-org/react';
import { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditText } from '../../../components/EditText';
import { useSelectImage } from '../../../hooks/useSelectImage';
import { Box } from '../../../components/helpers';
import { api } from '../../../api';

export const AddServicesBody = ({ close }: any) => {
  const client = useQueryClient();

  const [image, setImage] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState('');
  const [editorState, onChange] = useState(() => EditorState.createEmpty());

  const { getInputProps, getRootProps } = useSelectImage({
    maxHeight: 500,
    maxWidth: 500,
    onSuccess: (image) => setImage(image),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const raw = convertToRaw(editorState.getCurrentContent());

      await api.services.create(title, image!, JSON.stringify(raw));
      client.invalidateQueries({ queryKey: ['services'] });
      return close();
    },
  });

  return (
    <>
      <Modal.Body>
        <Box id="modal-description">
          <Box width={300} height={300} {...getRootProps()}>
            <Card.Image
              style={{ width: 300, height: 300 }}
              src={
                image ||
                'https://cubeonline.by/wp-content/uploads/2022/05/placeholder-2.png'
              }
            />
            <input {...getInputProps()} />
          </Box>
          <Input
            label="Заголовок"
            value={title}
            style={{ width: '400px' }}
            onChange={(e) => setTitle(e.target.value)}
          />
          <EditText editorState={editorState} onChange={onChange} />
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={close}>закрыть</Button>
        <Button disabled={isLoading} onClick={() => [mutate()]}>
          {isLoading ? (
            <Loading type="spinner" color="currentColor" size="sm" />
          ) : (
            'Сохранить'
          )}
        </Button>
      </Modal.Footer>
    </>
  );
};
