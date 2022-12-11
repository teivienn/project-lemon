import { Image, Text } from '@nextui-org/react';
import { Box } from '~/components/helpers';
import draftToHtml from 'draftjs-to-html';
import { isEmpty } from 'lodash';

export const ProductDetails = ({ data }) => {
  if (isEmpty(data)) {
    return null;
  }

  const markup = draftToHtml(JSON.parse(data.content));


  return (
    <Box minHeight={500}>
      <Image
        width={500}
        height={210}
        src={data.picture}
        alt="Default Image"
        objectFit="cover"
        className="service-card"
      />

      <Text>цена: {data.price}</Text>

      <div dangerouslySetInnerHTML={{ __html: markup }} />
    </Box>
  );
};
