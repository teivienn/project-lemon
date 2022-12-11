import { Box } from '~/components/helpers';
import { Input, Text, Grid, Card, Row, Modal, Button } from '@nextui-org/react';
import { useCatContext } from '~/modules/catalog-page/context';
import { useQuery } from '@tanstack/react-query';
import { api } from '~/api';
import { isEmpty } from 'lodash';
import { ProductDetails } from './ProductDetails';
import { useState } from 'react';
import { useBucket } from '~/lib/Bucket/BucketProvider';

export const ListWithSearch = () => {
  const { search, setSearch, selectedCategoryIdValue, selectedSubCategoryIdValue } = useCatContext();
  const [preview, setPreview] = useState<any>({});
  const { setProductIds } = useBucket();

  const { data, isLoading } = useQuery({
    queryKey: ['catalog', search, selectedCategoryIdValue, selectedSubCategoryIdValue],
    queryFn: async () => api.catalog.getAll(search, selectedCategoryIdValue, selectedSubCategoryIdValue),
  });

  console.log(data, 'data')

  return (
    <Box ml={20}>
      <Box>
        <Input value={search} onChange={e => setSearch(e.target.value)} style={{ width: 700 }} placeholder="поиск" />
      </Box>

      <Grid.Container gap={2} justify="flex-start">
        {data?.map((item) => (
          <Grid xs={6} sm={3} key={item.id}>
            <Card isPressable onClick={() => setPreview(item)}>
              <Card.Body css={{ p: 0 }}>
                <Card.Image
                  src={item.picture}
                  objectFit="cover"
                  width="100%"
                  height={140}
                  alt={item.name}
                />
              </Card.Body>
              <Card.Footer css={{ justifyItems: "flex-start" }}>
                <Row wrap="wrap" justify="space-between" align="center">
                  <Text b>{item.name}</Text>
                  <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                    {item.price} BYN
                  </Text>
                </Row>
              </Card.Footer>
            </Card>
          </Grid>
        ))}
      </Grid.Container>

      <Modal
        closeButton
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        scroll
        width="600px"
        open={!isEmpty(preview)}
        onClose={() => setPreview({})}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {preview?.name}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div id="modal-description" style={{ minHeight: '500px' }}>
            <ProductDetails data={preview} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={() => setPreview({})}>
            Close
          </Button>
          <Button auto flat onClick={() => setProductIds(preview.id)}>
            Добавить в корзину
          </Button>
        </Modal.Footer>
      </Modal>
    </Box>
  );
};
