import React from 'react';
import { VStack, HStack } from 'native-base';
import { Icon } from '../icon';

export const TopbarNavigator = () => {
  return (
    <VStack h='56px' justifyContent='center' shadow={9}>
      <HStack mx={5} justifyContent='space-between'>
        <Icon
          name='hamburger-large'
          size={24}
          color='#000'
          testID='hambergerIcon'
        />
        <Icon
          name='notification'
          size={24}
          color='#000'
          testID='notificationIcon'
        />
      </HStack>
    </VStack>
  );
};
