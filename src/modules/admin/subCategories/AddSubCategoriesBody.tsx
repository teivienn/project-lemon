import { Button, Dropdown, Input, Loading, Modal } from '@nextui-org/react';
import { useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Box } from '../../../components/helpers';
import { api } from '../../../api';

export const AddSubCategoriesBody = ({ close }: any) => {
  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: api.categories.getAll,
  });

  const [title, setTitle] = useState('');
  const client = useQueryClient();
  const [selected, setSelected] = useState<any>(new Set([]));

  const selectedValue = useMemo(
    () => Array.from(selected).join(', ').replaceAll('_', ' '),
    [selected],
  );

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      await api.subCategories.create(title, selectedValue);
      client.invalidateQueries({ queryKey: ['subCategories'] });
      return close();
    },
  });

  const name = data?.find((el) => el?.id === selectedValue);

  return (
    <>
      <Modal.Body>
        <Box id="modal-description">
          <Dropdown>
            <Dropdown.Button
              auto
              flat
              color="secondary"
              css={{ tt: 'capitalize', width: '350px' }}
            >
              {name?.name || 'выбрать категорию'}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selected}
              onSelectionChange={setSelected}
            >
              {
                data?.map((ct) => (
                  <Dropdown.Item key={ct.id}>{ct.name}</Dropdown.Item>
                )) as any
              }
            </Dropdown.Menu>
          </Dropdown>

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
