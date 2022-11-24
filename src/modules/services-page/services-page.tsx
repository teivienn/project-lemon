import { useQuery } from '@tanstack/react-query';
import { Card, Container, Text, Loading, Grid } from '@nextui-org/react';
import { api } from '../../api';
import { Box } from '../../components/helpers';

export const Card1 = (props: any) => (
  <Card isPressable css={{ width: 340, minWidth: 420 }}>
    <Card.Header>
      <Text h4>{props.name}</Text>
    </Card.Header>
    <Card.Body css={{ p: 0 }}>
      <Card.Image
        src={props.picture}
        objectFit="cover"
        width="100%"
        height={340}
        alt="Card image background"
      />
    </Card.Body>
  </Card>
);

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
    <Container justify="center">
      <Grid.Container gap={2} justify="flex-start">
        {data?.map((item) => (
          <Grid key={item.id}>
            <Card1 {...item} />
          </Grid>
        ))}
      </Grid.Container>
    </Container>
  );
};
