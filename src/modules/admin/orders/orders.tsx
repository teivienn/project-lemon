import { useQuery } from '@tanstack/react-query';
import { api } from '~/api';
import {
  Avatar,
  Col,
  Loading,
  Row,
  Table,
  Text,
  User
} from '@nextui-org/react';
import { Box } from '~/components/helpers';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';
import { IconButton } from '~/modules/admin/categories/CategoriesList';

const columns = [
  { name: 'Пользователь', uid: 'username' },
  { name: 'Продукты', uid: 'products' },
];

export const Orders = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: api.orders.getAll,
  });

  console.log(data, 'data')

  const renderCell = (service: any, columnKey: any) => {
    const cellValue = service[columnKey];

    console.log({
      service,
      cellValue,
    })

    switch (columnKey) {
      case 'username':
        return (
          <User squared src={service.avatar} name={service.username} css={{ p: 0 }}>
            {service.full_name}
          </User>
        );
      case 'products': {
        return (
          <Row justify="center" align="center">
            {cellValue?.map((item) => (
              <Col css={{ d: "flex" }}>
                <Text>{item.name}, </Text>
              </Col>
            ))}
          </Row>
        )
      }
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
