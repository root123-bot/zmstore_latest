import React from 'react';
import { VariantTypesForm } from './variant-types-form';
import { Variants } from './variants/Variants';
import { VStack } from 'native-base';

const VariantsForm = ({ productId }) => {
  return (
    <VStack space={2} flex={1}>
      <VariantTypesForm productId={productId} />
      <Variants productId={productId} />
    </VStack>
  );
};

export { VariantsForm };
