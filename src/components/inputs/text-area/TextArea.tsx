import React from 'react';
import { ITextAreaProps, Text, TextArea, VStack } from 'native-base';

type Props = {
  invalidMessage?: string;
};

export function ZTextArea({
  invalidMessage,
  ...props
}: Props & ITextAreaProps) {
  return (
    <VStack space={1}>
      <TextArea
        w='full'
        backgroundColor='white'
        _focus={{
          borderColor: 'gray.100',
        }}
        _invalid={{
          borderColor: 'warning.500',
        }}
        borderColor={props.isInvalid ? 'warning.500' : 'gray.100'}
        borderRadius={4}
        fontSize={16}
        fontFamily='body'
        autoCompleteType='name'
        totalLines={16}
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
