/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ImageBackground, StatusBar } from 'react-native';
import { Box, Center, Image, Pressable, Text } from 'native-base';
import { Icon } from '@components/icon';
import { ZButton } from '@components/z-button';
import { Formik } from 'formik';
import { ConfirmCode } from '@components/confirm-code';
import { PhoneField } from '@components/inputs';
import { signup } from '@queries';
import { strings } from '@i18n';

export const Signup = ({ navigation }) => {
  const [showConfirmPhone, setShowConfirmPhone] = useState(false);
  const [lastDigits, setLastDigits] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  const phoneNumberValidation = (values: { phone: string }) => {
    if (values.phone.length === 9 && values.phone[0] !== '0') {
      setDisabled(false);
    } else if (values.phone.length === 10 && values.phone[0] === '0') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const onSubmit = async (values: { phone: string }) => {
    const payload = { phone: values.phone, userType: 'Consumer' };
    // interact with signup api to get user data
    const data = await signup(payload);

    setLastDigits(data.phone.slice(-2));
    setShowConfirmPhone(true);
  };

  return (
    <Box flex={1}>
      <StatusBar backgroundColor='transparent' translucent={true} />
      <ImageBackground
        source={{ uri: 'https://i.ibb.co/0J0V0ZN/signup-bg.png' }}
        resizeMode='cover'
        style={{
          width: '100%',
          height: 300,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        accessibilityRole='image'>
        <Icon name='zeromoja' size={50} color='white' testID='zeromoja-01' />
        <Text
          fontFamily='body'
          fontWeight='600'
          fontSize='xl'
          color='white'
          marginTop='5'
          marginBottom='1'>
          {strings.welcomeZeromoja}
        </Text>
        <Text fontFamily='body' fontWeight='400' fontSize='md' color='white'>
          {strings.getVerifiedByPhone}
        </Text>
      </ImageBackground>

      <Box
        background='white'
        marginTop='-10'
        marginX='5'
        paddingX='5'
        paddingBottom='3'
        borderRadius={8}>
        <Center marginTop='6' marginBottom='10'>
          <Image
            source={{ uri: 'https://i.ibb.co/LNDznLF/mobile.png' }}
            size='lg'
            alt='mobile'
            accessibilityRole='image'
          />
        </Center>
        <Text fontFamily='body' fontWeight='400' fontSize='sm' color='gray.800'>
          {!showConfirmPhone && strings.enterMobileNumber}
        </Text>

        {!showConfirmPhone ? (
          <Formik
            initialValues={{ phone: '' }}
            validate={phoneNumberValidation}
            onSubmit={onSubmit}>
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <Box>
                <Box marginTop='2.5' marginBottom='8'>
                  <PhoneField
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    testID='phone-number-input'
                  />
                </Box>
                <ZButton
                  onPress={handleSubmit}
                  disabled={disabled}
                  testID='send-OTP'
                  variant='solid'>
                  {strings.sendOTP}
                </ZButton>
              </Box>
            )}
          </Formik>
        ) : (
          <ConfirmCode lastDigits={lastDigits} />
        )}
      </Box>

      <Box marginTop='8' flexDirection='row' justifyContent='center'>
        <Text color='gray.700' fontFamily='body' fontWeight='400' fontSize='md'>
          {strings.haveAccount}
        </Text>
        <Pressable
          onPress={() => navigation.navigate('Login')}
          marginTop={-0.5}>
          <Text
            color='primary.500'
            fontFamily='body'
            fontWeight='700'
            fontSize='lg'>
            {' '}
            {strings.login}
          </Text>
        </Pressable>
      </Box>
    </Box>
  );
};
