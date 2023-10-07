import React from 'react';
import {Text} from 'react-native';
import {Flex, Center, Spinner, VStack} from 'native-base';

interface PropTypes {
  error: string;
}
export const Loading = ({error}: PropTypes) => {
  return (
    <Flex
      direction='column'
      backgroundColor='white'
      minHeight='full'
      justifyContent='center'>
      <Center>
        <VStack>
          {error ? (
            <Text>Something went wrong!</Text>
          ) : (
            <Spinner size='lg' color='orange.default' />
          )}
        </VStack>
      </Center>
    </Flex>
  );
};
