import React from 'react';
import {
  Box,
  Text,
  Image,
  InputGroup,
  InputLeftAddon,
  Input,
  IInputProps,
} from 'native-base';

const CodeNumber = () => (
  <Box flex={1} flexDirection='row' alignItems='center'>
    <Image
      source={{ uri: 'https://i.ibb.co/V2mdVqq/tanzania-flag.png' }}
      alt='Tanzania flag'
      width='6'
      height='4'
      accessibilityRole='image'
    />
    <Text marginLeft='2'>+255</Text>
  </Box>
);

export function PhoneField({ ...props }: IInputProps) {
  const { onChangeText, value, ...rest } = props;

  const handleChange = (valueArg: string) => {
    onChangeText(`+255${valueArg}`);
  };
  return (
    <InputGroup w='full'>
      <InputLeftAddon
        children={<CodeNumber />}
        backgroundColor='white'
        w='30%'
      />
      <Input
        placeholder='Enter phone number'
        fontFamily='body'
        fontWeight='400'
        fontSize='md'
        padding='4'
        w='70%'
        onChangeText={handleChange}
        value={value && value.slice(4)}
        {...rest}
      />
    </InputGroup>
  );
}
