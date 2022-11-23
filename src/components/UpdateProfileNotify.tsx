import { Text } from '@nextui-org/react';
import { useStore } from '../lib/store';
import { DelayComponent } from './helpers';
import { Box } from './helpers/privitives';

export const UpdateProfileNotify = () => {
  const { profile, session } = useStore();

  if (!session) {
    return null;
  }

  if (profile?.full_name) {
    return null;
  }

  return (
    <DelayComponent ms={3000}>
      <Box
        mt={20}
        justifyContent="center"
        mx={300}
        display="flex"
        alignItems="center"
        bg="red"
        borderRadius={10}
        py={1}
      >
        <Text b style={{ textAlign: 'center', color: 'white' }}>
          Заполните профиль!
        </Text>
      </Box>
    </DelayComponent>
  );
};
