import { useQuery } from '@tanstack/react-query';
import { Container, Text, Loading, Modal, Input, Button } from '@nextui-org/react';
import { api } from '../../api';
import { Box } from '../../components/helpers';
import './style.css';
import { isEmpty } from 'lodash';
import { ServiceCard } from '~/components/ServiceCard/ServiceCard';
import { useState } from 'react';
import { ServicesPageDetail } from '~/modules/services-page/ServicesPageDetail';

export const ServicesPage = () => {
  const [preview, setPreview] = useState<any>({});
  const { data, isLoading } = useQuery<any>({
    queryKey: ['services'],
    queryFn: api.services.getAll,
  });

  if (isLoading || isEmpty(data)) {
    return (
      <Box display="flex" flex={1} center>
        <Loading />
      </Box>
    );
  }

  return (
    <div>
      <Container md gap={2} justify="center" alignItems="center">
        <Text h4 css={{ paddingTop: 20 }}>
          Услуги
        </Text>
        <Box display="flex" justifyContent="flex-start" flexWrap="wrap">
          {data?.map((item) => (
            <ServiceCard key={item.id} {...item} onClick={() => setPreview(item)} />
          ))}
        </Box>
      </Container>

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
            <ServicesPageDetail preview={preview} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={() => setPreview({})}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
