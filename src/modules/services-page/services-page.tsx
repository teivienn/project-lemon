import { useQuery } from '@tanstack/react-query';
import { Container, Text, Loading } from '@nextui-org/react';
import { api } from '../../api';
import { Box } from '../../components/helpers';
import './style.css';
import { ServiceCard } from '../../components/ServiceCard/ServiceCard';

export const ServicesPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: api.services.getAll,
  });

  if (isLoading || !data) {
    return (
      <Box display="flex" flex={1} center>
        <Loading />
      </Box>
    );
  }

  return (
    <Container md gap={2} justify="center" alignItems="center">
      <Text h4 css={{ paddingTop: 20 }}>
        Услуги
      </Text>
      <Box display="flex" justifyContent="flex-start" flexWrap="wrap">
        {data?.map((item) => (
          <ServiceCard key={item.id} {...item} />
        ))}
      </Box>
    </Container>
  );
};
