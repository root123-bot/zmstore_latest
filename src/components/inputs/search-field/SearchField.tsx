import React from 'react';
import { HStack, Input, IInputProps } from 'native-base';
import { Icon } from '../../icon';
import { customTheme } from '../../../theme';

type Search = {
  placeholder: string;
};

export function SearchField({ placeholder, ...props }: Search & IInputProps) {
  return (
    <HStack
      h={10}
      w='full'
      px={5}
      py={0.5}
      alignItems='center'
      borderColor='gray.300'
      borderWidth={1}
      rounded='md'
      bg='white'>
      <Icon
        name='search-large'
        size={24}
        color={customTheme.colors.primary[500]}
        testID='searchIcon'
      />
      <Input
        placeholder={placeholder}
        h='full'
        w='90%'
        borderWidth={0}
        _focus={{
          backgroundColor: 'white',
        }}
        bg='white'
        fontSize='sm'
        {...props}
      />
    </HStack>
  );
}
