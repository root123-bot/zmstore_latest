import React, { ReactNode } from 'react';
import { Button, Text, IButtonProps } from 'native-base';

type PropTypes = {
  children: ReactNode;
};

export function ZButton({ children, ...props }: PropTypes & IButtonProps) {
  return (
    <>
      {props.variant === 'solid' && (
        <Button
          bg={props.disabled ? 'gray.400' : 'primary.500'}
          _pressed={{
            bg: 'primary.500',
          }}
          borderRadius={4}
          {...props}>
          <Text fontSize='md' color='white'>
            {children}
          </Text>
        </Button>
      )}
      {props.variant === 'outline' && (
        <Button
          borderRadius={4}
          _pressed={{
            bg: 'white',
          }}
          borderColor='gray.800'
          variant='outline'
          {...props}>
          <Text fontSize='md' color='gray.800'>
            {children}
          </Text>
        </Button>
      )}
    </>
  );
}
