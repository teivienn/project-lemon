import { Button, Modal } from '@nextui-org/react';
import { Box } from '../../../components/helpers';
import { AddServices } from './AddServices';
import { ListServices } from './ListServices';

export const Services = () => {
  return (
    <Box>
      <AddServices />
      <ListServices />
    </Box>
  );
};
