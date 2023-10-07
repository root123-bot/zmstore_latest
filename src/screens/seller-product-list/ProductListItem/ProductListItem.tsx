import React from 'react';
import { Text, Checkbox, HStack, VStack, Divider, Box } from 'native-base';
import { Icon } from '@src/components/icon';
import { strings } from '@i18n';

export function ProductListItem({ metadata, isDrafted }) {
  return (
    <Box my={2}>
      <HStack justifyContent={'space-between'} alignItems={'center'}>
        <HStack alignItems='center'>
          <HStack alignItems='center' testID='img-component'>
            <Checkbox value='test' />
            <Box bg={'gray.300'} px={2} py={1} ml={2} mr={3}>
              <Icon name='photo-outline' size={30} />
            </Box>
          </HStack>
          <VStack>
            <Text fontSize={16} bold={true} color={'grey'}>
              {metadata.name}
            </Text>
            <HStack>
              <Text fontSize={13}>
                Stock: {metadata.variants[0].inventory.quantity}
              </Text>
              {isDrafted && (
                <Text fontSize={13} ml={5} color={'red.500'}>
                  {strings.product_listing.drafted_text}
                </Text>
              )}
            </HStack>
          </VStack>
        </HStack>

        <Box testID='action-btn' py={2} pl={3} mx={3}>
          <Icon name='arrow-small' size={22} />
        </Box>
      </HStack>
      <Divider my={2} />
    </Box>
  );
}
