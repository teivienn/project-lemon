import { Container, Text } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { Icons } from '../../../assets';
import { Box } from '../../../components/helpers';

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <Box bg="#000" py="40px">
      <Container
        justify="flex-end"
        alignItems="center"
        display="flex"
        direction="column"
        xl
      >
        <Box
          display="flex"
          justifyContent="space-between"
          flex={1}
          width="100%"
          alignItems="flex-start"
        >
          <Box display="flex" flexDirection="column">
            <Text hideIn="sm" color="$white" b>
              ООО «Профикарлайн»
            </Text>
            <Text hideIn="sm" color="$white">
              220036, г. Минск, ул. К. Либкнехта,
            </Text>
            <Text hideIn="sm" color="$white">
              66-150 (7 этаж, левое крыло)
            </Text>
          </Box>

          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Text hideIn="sm" color="$white">
              Тел./факс: +375 (17) 222-11-02 (многоканальный)
            </Text>
            <Text hideIn="sm" color="$white">
              Тел.: +375 (29) 122-11-24
            </Text>
            <Text hideIn="sm" color="$white">
              Email: info@pcline.by
            </Text>
          </Box>
        </Box>

        <Box center display="flex" flexDirection="column">
          <Box display="flex" alignItems="center" flexDirection="column">
            <Icons.Logo fill="#fff" />
            <Text color="$white" b>
              {t('app-name')}
            </Text>
          </Box>
          <Box>
            <Text color="$white">
              {t('designed-by')}
              <Text color="$white" b>
                {' '}
                {t('author')}
              </Text>
            </Text>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
