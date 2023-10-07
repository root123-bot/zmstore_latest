import React, { useState } from 'react';
import {
  Box,
  Button,
  HStack,
  ScrollView,
  Spinner,
  Text,
  VStack,
  getColor,
  useTheme,
} from 'native-base';
import {
  useDeleteVariant,
  useGetProductVariantsByProductId,
} from '@src/queries';
import { Icon } from '@components/icon';
import { LoadingSpinner } from '@src/components/loading-spinner';
import { strings } from '@i18n';
import { DetailsFormModal } from './details-form-modal';
import { useConfirm } from '@src/context/ConfirmContext';

const Variants = ({ productId }) => {
  const { data: variants, isLoading: isLoadingVariants } =
    useGetProductVariantsByProductId(productId);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { confirm } = useConfirm();
  const { mutate: deleteVariant, isLoading: isDeletingVariant } =
    useDeleteVariant();
  const grayResolvedColor = getColor('gray.400', useTheme().colors, useTheme());

  if (isLoadingVariants) {
    return <LoadingSpinner />;
  }

  if (!variants || !variants.length) {
    return null;
  }

  const closeForm = () => {
    setShowForm(false);
    setSelected(null);
  };

  const openForm = variant => () => {
    setShowForm(true);
    setSelected(variant);
  };

  const handleDelete = variant => async () => {
    setSelected(variant);
    const payload = {
      title: `${strings.general.delete_text} ${variant.variations}`,
      description: strings.formatString(
        strings.add_product.variant_form.remove_variant_confirm_text,
        variant.variations,
      ) as string,
    };
    const isConfirmed = await confirm(payload);
    if (isConfirmed) {
      deleteVariant(variant.id);
    }
  };

  return (
    <Box flex={1}>
      <Box px={3} py={2}>
        <Text fontSize={15}>Showing {variants.length} variants</Text>
      </Box>
      <ScrollView>
        <Box>
          {variants.map(variant => (
            <HStack
              bg='white'
              p={3}
              display='flex'
              key={variant.id}
              alignItems='center'>
              <Box
                borderColor='gray.400'
                borderStyle='dashed'
                borderWidth={1}
                p={2}>
                <Icon
                  name='photo-outline'
                  size={20}
                  color={grayResolvedColor}
                />
              </Box>
              <Box flex='1' px={2}>
                <Text fontWeight='500'>{variant.variations}</Text>
              </Box>
              <Box pr={2}>
                <Button
                  px={0}
                  variant='unstyled'
                  isDisabled={isDeletingVariant}
                  onPress={openForm(variant)}>
                  {!variant.price && !variant.inventory ? (
                    <HStack alignItems='center' space={1}>
                      <Icon name='pencil' />
                      <Text>{strings.general.edit_text}</Text>
                    </HStack>
                  ) : (
                    <VStack>
                      <HStack>
                        <Text pr={2}>{variant.price.currency}</Text>
                        <Text>{variant.price.amount}</Text>
                      </HStack>
                      <HStack>
                        <Text pr={2}>{variant.inventory.quantity}</Text>
                        <Text>{strings.general.units_text}</Text>
                      </HStack>
                    </VStack>
                  )}
                </Button>
              </Box>
              {isDeletingVariant && variant.id === selected.id ? (
                <Spinner size='small' />
              ) : (
                <Box borderLeftWidth={1} borderLeftColor='gray.300' pl={1}>
                  <Button
                    px={0}
                    py={0}
                    variant='unstyled'
                    isDisabled={isDeletingVariant}
                    onPress={handleDelete(variant)}>
                    <Icon name='trash' size={20} />
                  </Button>
                </Box>
              )}
            </HStack>
          ))}
        </Box>
      </ScrollView>
      <DetailsFormModal
        variant={selected}
        onDismiss={closeForm}
        show={showForm}
      />
    </Box>
  );
};

export { Variants };
