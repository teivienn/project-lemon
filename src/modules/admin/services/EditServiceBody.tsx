import { Button, Card, Input, Loading, Modal } from '@nextui-org/react';
import { Box } from '~/components/helpers';
import { useState } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { EditText } from '~/components/EditText';
import { useSelectImage } from '~/hooks/useSelectImage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '~/api';

export const EditServiceBody = (props: any) => {
  const client = useQueryClient();

  const [image, setImage] = useState<string | undefined>(props.servi.picture);
  const [title, setTitle] = useState(props.servi.name);
  const [editorState, onChange] = useState(() =>
    EditorState.createWithContent(convertFromRaw(JSON.parse(props.servi.content))),
  );

  const { getInputProps, getRootProps } = useSelectImage({
    maxHeight: 800,
    maxWidth: 900,
    onSuccess: (image) => setImage(image),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const raw = convertToRaw(editorState.getCurrentContent());

      await api.services.update(props.servi.id, title, image!, JSON.stringify(raw));
      client.invalidateQueries({ queryKey: ['services'] });
      return props.onClose();
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
        <Button flat color="error" onClick={props.onClose}>
          закрыть
        </Button>
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
