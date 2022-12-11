import { useQuery } from '@tanstack/react-query';
import { api } from '~/api';
import {
  Avatar,
  Col,
  Loading,
  Row,
  Table,
  Text,
  Tooltip
} from '@nextui-org/react';
import { Box } from '~/components/helpers';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';
import { IconButton } from '~/modules/admin/services/ListServices';

const columns = [
  { name: 'Превью', uid: 'picture' },
  { name: 'название', uid: 'name' },
  { name: 'Цена', uid: 'price' },
  { name: 'Действия', uid: 'actions' },
];
export const CatalogList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['catalog'],
    queryFn: async () => api.catalog.getAll(),
  });

  const renderCell = (service: any, columnKey: any) => {
    const cellValue = service[columnKey];
    switch (columnKey) {
      case 'name':
        return (
          <Box width={100}>
            <Text>{service.name}</Text>
          </Box>
        );
      case 'price':
        return (
          <Box width={100}>
            <Text>{service.price}</Text>
          </Box>
        );
      case 'picture':
        return <Avatar src={service.picture} />;
      case 'actions':
        return (
          <Row justify="flex-end" align="center">
            <Col style={{ width: 50 }}>
              <Tooltip
                content="Edit"
                onClick={() => []}
              >
                <IconButton>
                  <FiEdit3 size={20} color="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col style={{ width: 50 }}>
              <Tooltip content="Delete" color="error" onClick={() => []}>
                <IconButton>
                  <FiTrash2 size={20} color="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <>
      <Box pt={20}>
        <Table selectionMode="none">
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column
                key={column.uid}
                align={column.uid === 'actions' ? 'center' : 'start'}
              >
                {column.name}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body items={data}>
            {(item) => (
              <Table.Row>
                {(columnKey) => <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Box>
    </>
  );
};
