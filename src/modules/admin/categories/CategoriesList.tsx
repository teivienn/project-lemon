/* eslint-disable no-promise-executor-return */
import {
  Col,
  Loading,
  Row,
  Text,
  Tooltip,
  Table,
  Avatar,
  styled,
} from '@nextui-org/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiTrash2, FiEdit3 } from 'react-icons/fi';
import { api } from '../../../api';
import { Box } from '../../../components/helpers';

// IconButton component will be available as part of the core library soon
export const IconButton = styled('button', {
  'dflex': 'center',
  'border': 'none',
  'outline': 'none',
  'cursor': 'pointer',
  'padding': '0',
  'margin': '0',
  'bg': 'transparent',
  'transition': '$default',
  '&:hover': {
    opacity: '0.8',
  },
  '&:active': {
    opacity: '0.6',
  },
});

const columns = [
  { name: 'Превью', uid: 'picture' },
  { name: 'название', uid: 'name' },
  { name: 'Действия', uid: 'actions' },
];

export const CategoriesList = () => {
  const client = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: api.categories.getAll,
  });

  const { mutate } = useMutation({
    mutationFn: async (id: string) => api.categories.delete(id),
    onSuccess: () => client.invalidateQueries({ queryKey: ['categories'] }),
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
      case 'picture':
        return <Avatar src={service.picture} />;
      case 'actions':
        return (
          <Row justify="flex-end" align="center">
            <Col style={{ width: 50 }}>
              <Tooltip content="Edit">
                <IconButton onClick={() => console.log('Edit user', service.id)}>
                  <FiEdit3 size={20} color="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col style={{ width: 50 }}>
              <Tooltip content="Delete" color="error" onClick={() => mutate(service.id)}>
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
  );
};
