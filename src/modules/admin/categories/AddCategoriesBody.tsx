import { Button, Card, Input, Loading, Modal } from '@nextui-org/react';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Box } from '../../../components/helpers';
import { useSelectImage } from '../../../hooks/useSelectImage';
import { api } from '../../../api';

export const AddCategoriesBody = ({ close }: any) => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState('');
  const client = useQueryClient();

  const { getInputProps, getRootProps } = useSelectImage({
    maxHeight: 500,
    maxWidth: 500,
    onSuccess: (image) => setImage(image),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      await api.categories.create(title, image!);
      client.invalidateQueries({ queryKey: ['categories'] });
      return close();
    },
  });

  return (
    <>
      <Modal.Body>
        <Box id="modal-description">
          <Box width={'100%'} height={300} {...getRootProps()} center display="flex">
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
            fullWidth
            value={title}
            label="Название"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={close}>
          закрыть
        </Button>
        <Button auto disabled={isLoading} onClick={() => [mutate()]}>
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
