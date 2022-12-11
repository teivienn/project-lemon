import { Card, Modal, Row, Text, Button } from '@nextui-org/react';
import { Box } from '~/components/helpers';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '~/api';
import { useBucket } from '~/lib/Bucket/BucketProvider';
import { useStore } from '~/lib/store';

export const ModalBody = ({ close }) => {
  const { productIds, setProductIds, deleteId, clean } = useBucket();
  const { profile } = useStore();

  const { data } = useQuery({
    queryKey: ['catalog'],
    queryFn: async () => api.catalog.getAll(),
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      await api.orders.create(profile?.id!, productIds)

      close();
      clean();
    },
  })

  const cont = data?.filter(el => productIds?.includes(el.id));

  return (
    <>
      <Modal.Body>
        <Box id="modal-description">
          {cont?.map(item => (
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              <Card style={{ width: 300 }}>
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
              <Box>
                <Button color="error" onClick={() => deleteId(item.id)}>убрать</Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => [mutate()]}>заказать</Button>
      </Modal.Footer>
    </>
  )
}
