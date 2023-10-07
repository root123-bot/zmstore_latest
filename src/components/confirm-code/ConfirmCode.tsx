/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Box, Text, useTheme, Center, Modal } from 'native-base';
import { ZButton } from '@components/z-button';
import { strings } from '../../../i18n/supportedLanguages';
import { useNavigation } from '@react-navigation/native';

const CELL_COUNT = 4;

export const ConfirmCode = (lastDigits: { lastDigits: string }) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const { colors } = useTheme();

  const [showModal, setShowModal] = useState<boolean>(false);

  const { navigate } = useNavigation();

  const handleVerification = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      navigate('MerchantSignUp');
    }, 5000);
  };

  return (
    <>
      <Text fontFamily='body' fontWeight='400' fontSize='sm' color='gray.800'>
        {strings.enterOTP + `${lastDigits.lastDigits}`}
      </Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={{
          marginTop: 20,
          width: 280,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        keyboardType='number-pad'
        textContentType='oneTimeCode'
        renderCell={({ index, symbol, isFocused }) => (
          <Box
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[
              {
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: colors.gray[100],
                borderBottomWidth: 1,
              },
              isFocused && {
                borderBottomColor: colors.secondary[500],
                borderBottomWidth: 2,
              },
            ]}>
            <Text
              color='gray.700'
              fontFamily='body'
              fontWeight='400'
              fontSize='sm'>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </Box>
        )}
      />

      <Box marginTop='4' fontFamily='body' fontWeight='400' fontSize='xs'>
        {value.length === 4 ? (
          <Text color='gray.700'>{strings.valid}</Text>
        ) : (
          <Text color='gray.700'>
            {strings.noOTP}
            <Text color='primary.500' fontWeight='500'>
              {' '}
              {strings.resendOTP}
            </Text>
          </Text>
        )}
      </Box>

      <Center>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content width={335} height={315} paddingY='5' paddingX='10'>
            <Modal.Body padding='0'>
              <Box height={135} />
              <Text
                color='primary.500'
                fontFamily='body'
                fontWeight='600'
                fontSize='xl'
                textAlign='center'
                lineHeight={30}
                marginTop='4'>
                {strings.PhoneVerificationSuccess}
              </Text>
              <Text
                color='gray.800'
                fontFamily='body'
                fontWeight='400'
                fontSize='sm'
                textAlign='center'
                lineHeight={26}
                marginTop='2.5'>
                {strings.PhoneVerificationSuccessNotice}
              </Text>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>

      <ZButton
        variant='solid'
        marginTop='9'
        marginBottom='3'
        disabled={value.length === 4 ? false : true}
        onPress={handleVerification}>
        {strings.verify}
      </ZButton>
    </>
  );
};
