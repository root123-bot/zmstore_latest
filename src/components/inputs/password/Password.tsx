import React, { useState } from 'react';
import { IInputProps, Input, Text, VStack, HStack, Box } from 'native-base';
import { Icon } from '@components/icon';
import { customTheme as theme } from '../../../theme';

type Props = {
  invalidMessage?: string;
};

export function ZPassword({ invalidMessage, ...props }: Props & IInputProps) {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  return (
    <VStack space={1} {...props}>
      <Box w='full'>
        <HStack
          backgroundColor='white'
          borderColor={props.isInvalid ? 'warning.500' : 'gray.100'}
          borderWidth={1}
          height={12}
          borderRadius={4}
          space={2}
          py={2}
          pr={4}
          alignItems='center'
          justifyContent='space-between'>
          <Input
            {...props}
            w='80%'
            fontFamily='body'
            backgroundColor='white'
            borderWidth={0}
            fontSize={16}
            type={passwordVisibility ? 'text' : 'password'}
          />
          {passwordVisibility && (
            <Icon
              name='show-password-medium'
              size={28}
              onPress={() => setPasswordVisibility(false)}
              color={theme.colors.gray['500']}
            />
          )}
          {!passwordVisibility && (
            <Icon
              name='hide-password-mediun'
              size={28}
              onPress={() => setPasswordVisibility(true)}
              color={theme.colors.gray['500']}
            />
          )}
        </HStack>
      </Box>
      {props.isInvalid && (
        <Text color='warning.500' fontFamily='body' fontSize={12}>
          {invalidMessage}
        </Text>
      )}
    </VStack>
  );
}
