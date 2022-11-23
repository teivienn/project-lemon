import { Input, Spacer, Text, Button, Avatar, Loading } from '@nextui-org/react';
import * as yup from 'yup';

import { FiEdit2 } from 'react-icons/fi';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Box } from '../../components/helpers';
import { usePartialState } from '../../hooks';
import { api } from '../../api';
import { useSelectImage } from '../../hooks/useSelectImage';
import { useStore } from '../../lib/store';
import { Profile } from '../../types/profile';

interface ProfileViewProps {
  profile: Profile;
}

const schema = yup.object({
  url: yup.string().required().trim(),
  username: yup.string().required().trim(),
  full_name: yup.string().required().trim(),
});

export const ProfileView = ({ profile }: ProfileViewProps) => {
  const { setProfile } = useStore();
  const [state, setState] = usePartialState<any>({
    url: profile?.avatar_url,
    username: profile?.username,
    full_name: profile?.full_name,
  });

  const [isError, setIsError] = useState(false);

  const { getRootProps, getInputProps } = useSelectImage({
    onSuccess: (image) => setState({ url: image }),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      setIsError(false);
      const isValid = await schema.isValid(state);

      if (!isValid) {
        setIsError(true);
      }
      return api.profile.update({
        ...state,
        id: profile.id,
      });
    },
    onSuccess: (data) => setProfile(data),
  });

  return (
    <Box justifyContent="center" display="flex" flex={1} pt={100}>
      <Box flexDirection="column">
        <Text h1>Редактирование профиля</Text>

        {isError && (
          <Box>
            <Text h5 color="red">
              Все поля являются обязательными!
            </Text>
          </Box>
        )}

        <Box width={100} style={{ position: 'relative' }}>
          <Avatar src={state.url} css={{ size: '$20' }} />

          <Box style={{ position: 'absolute', bottom: 0, zIndex: 999, right: 0 }}>
            <Button
              {...getRootProps()}
              css={{ backgroundColor: '#f0f0f0' }}
              auto
              icon={<FiEdit2 color="black" />}
            />
            <input {...getInputProps()} />
          </Box>
        </Box>

        <Spacer y={0.5} />
        <Input
          value={state.username}
          width="300px"
          label="Никнейм"
          onChange={(e) => setState({ username: e.target.value })}
        />
        <Spacer y={0.5} />
        <Input
          value={state.full_name}
          width="300px"
          label="Имя"
          onChange={(e) => setState({ full_name: e.target.value })}
        />
        <Spacer y={1} />

        <Button disabled={isLoading} onClick={() => mutate()}>
          {isLoading ? (
            <Loading type="spinner" color="currentColor" size="sm" />
          ) : (
            'Сохранить'
          )}
        </Button>
      </Box>
    </Box>
  );
};
