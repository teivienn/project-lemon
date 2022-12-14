import { Image } from '@nextui-org/react';
import { Box } from '~/components/helpers';
import draftToHtml from 'draftjs-to-html';
import { isEmpty } from 'lodash';

export const ServicesPageDetail = ({ preview }: any) => {
  if (isEmpty(preview)) {
    return null;
  }

  const markup = draftToHtml(JSON.parse(preview.content));

  return (
    <Box minHeight={500}>
      <Image
        width={500}
        height={210}
        src={preview.picture}
        alt="Default Image"
        objectFit="cover"
        className="service-card"
      />

      <div dangerouslySetInnerHTML={{ __html: markup }} />
    </Box>
  );
};
