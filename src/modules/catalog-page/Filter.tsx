import { Box } from '~/components/helpers';
import { Dropdown, Text } from '@nextui-org/react';
import { useCatContext } from '~/modules/catalog-page/context';
import { useQuery } from '@tanstack/react-query';
import { api } from '~/api';
import { isEmpty } from 'lodash';

export const Filter = () => {
  const { categoryId, setCategoryId, subCategoryId, selectedCategoryIdValue, selectedSubCategoryIdValue, setSubCategoryId } = useCatContext();
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: api.categories.getAll,
  });

  const { data: subCategories, isLoading: subCategoriesLoading } = useQuery({
    queryKey: ['subCategories'],
    queryFn: api.subCategories.getAll,
  });

  const sub = subCategories?.filter((el: any) => el.category_id === selectedCategoryIdValue);

  if (isLoading || subCategoriesLoading) {
    return null;
  }

  return (
    <Box width={300}>
      <Text b>фильтр</Text>

      <Box height={30} />
      <Dropdown>
        <Dropdown.Button
          auto
          flat
          color="secondary"
          css={{ tt: 'capitalize', width: '250px' }}
        >
          {data?.find((el: any) => el.id === selectedCategoryIdValue)?.name || 'выбрать категорию'}
        </Dropdown.Button>
        <Dropdown.Menu
          aria-label="Single selection actions"
          color="secondary"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={categoryId}
          onSelectionChange={setCategoryId}
        >
          {data?.map((ct) => <Dropdown.Item key={ct.id}>{ct.name}</Dropdown.Item>) as any}
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
    </Box>
  );
};
