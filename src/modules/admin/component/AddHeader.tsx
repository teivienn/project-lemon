import { Button, Text } from '@nextui-org/react';
import { Box } from '../../../components/helpers';

interface AddHeaderProps {
  title: string;
  buttonText: string;
  click: () => void;
}

export const AddHeader = ({ title, buttonText, click }: AddHeaderProps) => {
  return (
    <Box justifyContent="space-between" display="flex">
      <Box display="flex" center flex={1}>
        <Text h3>{title}</Text>
      </Box>
      <Button color="secondary" onClick={click}>
        {buttonText}
      </Button>
    </Box>
  );
};
