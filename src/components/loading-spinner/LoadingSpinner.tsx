import { Box, Spinner, Text } from 'native-base';
import React from 'react';

interface PropsType {
  text: string;
  size: string;
  h: string;
}

const LoadingSpinner = ({
  text = 'Loading...',
  size = 'large',
  h = '10',
}: Partial<PropsType>) => (
  <Box display='flex' justifyContent='center' alignItems='center' h={h}>
    <Spinner accessibilityLabel='Loading variants' size={size} mb={3} />
    <Text>{text}</Text>
  </Box>
);

export { LoadingSpinner };
