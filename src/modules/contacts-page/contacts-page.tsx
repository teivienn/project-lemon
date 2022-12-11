import { Container, Text } from '@nextui-org/react';
import { Box } from '~/components/helpers';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';

export const ContactsPage = () => (
  <Container>
    <Box height={20} />
    <Text h3 b>
      Контакты
    </Text>

    <Box display="flex" flexDirection="row">
      <Text h5 b style={{ width: 300 }}>
        РАЗМЕЩЕНИЕ ЗАКАЗОВ
      </Text>

      <Box>
        <Text h5 b>
          АДРЕС
        </Text>

        <Text>
          ООО «Профикарлайн» 220036, г. Минск, ул. К. Либкнехта, 66-150 (7 этаж, левое
          крыло)
        </Text>
      </Box>
    </Box>

    <Box display="flex" flexDirection="row" mt={30}>
      <Text b style={{ width: 300 }}>
        E-Mail:
      </Text>

      <Box>
        <Text>zakaz@pcline.by info@pcline.by</Text>
      </Box>
    </Box>

    <Box display="flex" flexDirection="row" mt={30}>
      <Text b style={{ width: 300 }}>
        Время работы офиса:
      </Text>

      <Box>
        <Text>
          Понедельник-Четверг 09:00-18:00
          <br /> Пятница 09:00-17:00 Суббота,
          <br /> Воскресенье - Выходные
        </Text>
      </Box>
    </Box>

    <Box display="flex" flexDirection="row" mt={30}>
      <Text b style={{ width: 300 }}>
        Телефон:
      </Text>

      <Box>
        <Text>
          +375 (17) 221 11 02
          <br /> +375 (29) 122 11 24
        </Text>
      </Box>
    </Box>

    <Box mt={30}>
      <MapContainer
        center={[53.8974941, 27.5288189]}
        zoom={13}
        style={{ height: 300, width: 800 }}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[53.8974941, 27.5288189]} />
      </MapContainer>
    </Box>
  </Container>
);
