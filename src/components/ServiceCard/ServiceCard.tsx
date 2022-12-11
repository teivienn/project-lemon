import { Text, Image } from '@nextui-org/react';
import { Box } from '../helpers';
import './style.css';

export const ServiceCard = (props: any) => (
  <Box width={210} height={210} className="service-card" m={10} onClick={props?.onClick}>
    <Box className="service-card-con">
      <Text
        b
        size={16}
        css={{ width: '200px', textShadow: '0 0 2px #000' }}
        color="white"
      >
        {props.name}
      </Text>
    </Box>
    <Image
      width={210}
      height={210}
      src={props.picture}
      alt="Default Image"
      objectFit="cover"
      className="service-card"
    />
  </Box>
);
