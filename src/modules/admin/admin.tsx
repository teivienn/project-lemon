import { Button, Loading, Text } from '@nextui-org/react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Box } from '../../components/helpers';
import { useStore } from '../../lib/store';
import { Services } from './services';

export const AdminPage = () => {
  const navigate = useNavigate();

  const { profile, session } = useStore();

  if (!session) {
    return (
      <Box display="flex" flex={1} center>
        <Text h1>Пожалуйста войдите чтобы продолжить</Text>
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box display="flex" flex={1} center>
        <Loading />
      </Box>
    );
  }

  return (
    <Box display="flex" flex={1} width="100%">
      <Box width={250} height="100%" pt={20} pl={10}>
        <Button onClick={() => navigate('./services')}>Yслуги</Button>
      </Box>
      <Box width="100%" pt={20} pr={20}>
        <Routes>
          <Route
            index
            element={
              <Box
                display="flex"
                center
                flex={1}
                alignItems="center"
                justifyContent="center"
                height="100%"
              >
                <Text h5>Выберите раздел</Text>
              </Box>
            }
          />
          <Route index path="services" element={<Services />} />
        </Routes>
      </Box>
    </Box>
  );
};
