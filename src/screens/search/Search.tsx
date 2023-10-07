import React from 'react';
import { VStack, Radio } from 'native-base';
import { ScrollView } from 'react-native';
import { ZPassword, ZText, ZRadio, ZCheckbox } from '@components/inputs';

export function Search() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack space={4} alignItems='center' my='16' px='12'>
        <ZText />
        <ZText invalidMessage='Name is required' isInvalid />
        <ZPassword placeholder='password' />
        <ZPassword
          placeholder='password'
          invalidMessage='Wrong password'
          isInvalid
        />
        <Radio.Group name='options'>
          <ZRadio label='Zeromoja' value='Zeromoja' />
        </Radio.Group>
        <ZCheckbox value='Zeromoja'>Zeromoja</ZCheckbox>
      </VStack>
    </ScrollView>
  );
}
