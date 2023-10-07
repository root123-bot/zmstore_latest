import React from 'react';
import {Box, Text} from 'native-base';

type PropTypes = {
  source: string;
  description: string;
};

export function CategoryCard({}: PropTypes) {
  return (
    <Box flexDirection='row' height={70} width={120} marginRight='s'>
      <Text>category card</Text>
    </Box>
  );
}
