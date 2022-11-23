import { Text, Loading } from '@nextui-org/react';
import { Box } from '../../components/helpers';
import { useStore } from '../../lib/store';
import { ProfileView } from './ProfileView';

export const Profile = () => {
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

  return <ProfileView profile={profile} />;
};
