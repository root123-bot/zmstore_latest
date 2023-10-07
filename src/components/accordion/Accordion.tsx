import React, { ReactNode, useState } from 'react';
import { HStack, Text, VStack, Pressable } from 'native-base';
import { Icon } from '../icon';
import { customTheme as theme } from '../../theme';

type ZAccordion = {
  label: string;
  children: ReactNode;
};

export function ZAccordion({ label, children }: ZAccordion) {
  const [visible, setVisible] = useState(false);
  return (
    <VStack w='full' space={4}>
      <Pressable onPress={() => setVisible(!visible)}>
        <HStack
          justifyContent='space-between'
          borderBottomColor='gray.200'
          borderBottomWidth={1}
          h={10}>
          <Text
            fontSize={20}
            fontWeight={500}
            color={theme.colors.gray['1000']}>
            {label}
          </Text>
          {visible ? (
            <Icon name='chevron-up' size={24} color='#000' testID='arrowIcon' />
          ) : (
            <Icon
              name='arrow-extra-large'
              size={24}
              color='#000'
              testID='arrowIcon'
            />
          )}
        </HStack>
      </Pressable>
      {visible && children}
    </VStack>
  );
}
