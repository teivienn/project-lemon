import { Container, Text, Image } from '@nextui-org/react';
import { ServicesPage } from '../services-page';

import brand from '../../assets/brand.png';

export const HomePage = () => {
  return (
    <Container
      md
      gap={2}
      css={{ paddingBottom: 30 }}
      justify="center"
      alignItems="center"
    >
      <ServicesPage />

      <Container md gap={2} justify="center" alignItems="center">
        <Text h4 css={{ paddingTop: 50 }}>
          Бренды
        </Text>
        <Image src={brand} />
      </Container>
    </Container>
  );
};
