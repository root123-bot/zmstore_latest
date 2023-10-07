import React from 'react';
import { HStack, Text, Pressable } from 'native-base';
import { Icon } from '@components/icon';

interface PropTypes {
  label: string;
  key?: string;
  onPressX?: (value: string) => void;
}
const VariantTypeTag = ({ onPressX, label, key }: PropTypes) => {
  const handlePress = (value: string) => () => {
    onPressX(value);
  };
  return (
    <HStack
      px={2}
      space={1}
      alignItems='center'
      mb={2}
      py={1}
      bg='gray.300'
      borderColor='gray.300'
      key={key}
      borderWidth={1}
      borderRadius={'15'}>
      <Text>{label}</Text>
      {onPressX ? (
        <Pressable onPress={handlePress(label)}>
          <Icon name='x-mark' size={20} />
        </Pressable>
      ) : null}
    </HStack>
  );
};

export { VariantTypeTag };
