import React from 'react';
import { IInputProps, Text, Input, VStack } from 'native-base';

type Props = {
  invalidMessage?: string;
};

export function ZText({ invalidMessage, ...props }: Props & IInputProps) {
  return (
    <VStack space={1}>
      <Input
        w='full'
        backgroundColor='white'
        // _focus={{
        //   borderColor: 'gray.100',
        // }}
        _invalid={{
          borderColor: 'warning.500',
        }}
        borderColor={props.isInvalid ? 'warning.500' : 'gray.100'}
        height={12}
        borderRadius={4}
        fontSize={16}
        fontFamily='body'
        {...props}
      />
      {props.isInvalid && (
        <Text color='warning.500' fontFamily='body' fontSize={12}>
          {invalidMessage}
        </Text>
      )}
    </VStack>
  );
}
