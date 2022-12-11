import { Context } from './context';
import { Container } from '@nextui-org/react';
import { Box } from '~/components/helpers';
import { Filter } from '~/modules/catalog-page/Filter';
import { ListWithSearch } from '~/modules/catalog-page/ListWithSearch';

export const CatalogPage = () => {
  return (
    <Container>
      <Context>
        <Box mt={30} display="flex" flexDirection="row">
          <Filter />

          <ListWithSearch />
        </Box>
      </Context>
    </Container>
  );
};
