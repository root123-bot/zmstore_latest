import React from 'react';
import {Box, Text} from 'native-base';

type PropTypes = {
  source: string;
  description: string;
  sale: boolean;
};

export function ProductCard({}: PropTypes) {
  return (
    <Box flexDirection='row' height={70} width={120} marginRight='s'>
      <Text>product Card card</Text>
    </Box>
  );
}
