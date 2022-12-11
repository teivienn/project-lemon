import {
  Button,
  Card,
  Dropdown,
  Input,
  Loading,
  Modal
} from '@nextui-org/react';
import { Box } from '~/components/helpers';
import { useMemo, useState } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { EditText } from '~/components/EditText';
import { useSelectImage } from '~/hooks/useSelectImage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '~/api';
import { isEmpty } from 'lodash';

export const EditProductBody = (props: any) => {
  const client = useQueryClient();

  const [image, setImage] = useState<string | undefined>(props.servi.picture);
  const [title, setTitle] = useState(props.servi.name);
  const [price, setPrice] = useState(props.servi.price);

  const [categoryId, setCategoryId] = useState<any>(() => {
    const s = new Set([])

    // @ts-ignore
    s.add(props.servi.categoryId)
    return s;
  });
  const [subCategoryId, setSubCategoryId] = useState<any>(() => {
    const s = new Set([])

    // @ts-ignore
    s.add(props.servi.subCategoryId)
    return s;
  });

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

      await api.catalog.update(
        title,
        image!,
        JSON.stringify(raw),
        price,
        selectedCategoryIdValue,
        selectedSubCategoryIdValue,
        props.servi.id,
      );

      await client.invalidateQueries({queryKey: ['catalog']});
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
            label="Название"
            value={title}
            style={{ width: '400px' }}
            onChange={(e) => setTitle(e.target.value)}
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
