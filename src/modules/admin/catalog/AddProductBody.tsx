import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import { useSelectImage } from '~/hooks/useSelectImage';
import {
  Button,
  Card,
  Dropdown,
  Input,
  Loading,
  Modal
} from '@nextui-org/react';
import { Box } from '~/components/helpers';
import { EditText } from '~/components/EditText';
import { api } from '~/api';
import { isEmpty } from 'lodash';

export const AddProductBody = (props: any) => {
  const client = useQueryClient();
  const [image, setImage] = useState<string | undefined>(undefined);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editorState, onChange] = useState(() => EditorState.createEmpty());

  const [categoryId, setCategoryId] = useState<any>(new Set([]));
  const [subCategoryId, setSubCategoryId] = useState<any>(new Set([]));

  const selectedCategoryIdValue = useMemo(
    () => Array.from(categoryId).join(', ').replaceAll('_', ' '),
    [categoryId],
  );

  const selectedSubCategoryIdValue = useMemo(
    () => Array.from(subCategoryId).join(', ').replaceAll('_', ' '),
    [subCategoryId],
  );

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: api.categories.getAll,
  });

  const { data: subCategories } = useQuery({
    queryKey: ['subCategories'],
    queryFn: api.subCategories.getAll,
  });

  const sub = subCategories?.filter((el: any) => el.category_id === selectedCategoryIdValue);


  const { getInputProps, getRootProps } = useSelectImage({
    maxHeight: 800,
    maxWidth: 900,
    onSuccess: (image) => setImage(image),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const raw = convertToRaw(editorState.getCurrentContent());

      await api.catalog.create(name, image!, JSON.stringify(raw), price, selectedCategoryIdValue, selectedSubCategoryIdValue);
      await client.invalidateQueries({queryKey: ['catalog']});
      return props.close();
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
            label="Название"
            value={name}
            style={{ width: '400px' }}
            onChange={(e) => setName(e.target.value)}
          />

          <Box height={20} />


          <Input
            label="Цена"
            value={price}
            type="number"
            style={{ width: '400px' }}
            onChange={(e) => setPrice(e.target.value)}
          />

          <Box height={20} />

          <Dropdown>
            <Dropdown.Button
              auto
              flat
              color="secondary"
              css={{ tt: 'capitalize', width: '250px' }}
            >
              {categories?.find((el: any) => el.id === selectedCategoryIdValue)?.name || 'выбрать категорию'}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={categoryId}
              onSelectionChange={setCategoryId}
            >
              {categories?.map((ct) => <Dropdown.Item key={ct.id}>{ct.name}</Dropdown.Item>) as any}
            </Dropdown.Menu>
          </Dropdown>

          <Box height={20} />

          {!isEmpty(sub) && (
            <Dropdown>
              <Dropdown.Button
                auto
                flat
                color="secondary"
                css={{ tt: 'capitalize', width: '250px' }}
              >
                {sub?.find((el: any) => el.id === selectedSubCategoryIdValue)?.name || 'выбрать под категорию'}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Single selection actions"
                color="secondary"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={subCategoryId}
                onSelectionChange={setSubCategoryId}
              >
                {sub?.map((ct) => <Dropdown.Item key={ct.id}>{ct.name}</Dropdown.Item>) as any}
              </Dropdown.Menu>
            </Dropdown>
          )}
          <EditText editorState={editorState} onChange={onChange} />
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button flat color="error" onClick={props.close}>
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
  )
}
