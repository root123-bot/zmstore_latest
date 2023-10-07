import React, { useEffect } from 'react';
import { Box, Text, Pressable } from 'native-base';
import { ZButton } from '@components/z-button';
import { ZCheckbox, ZPassword } from '@components/inputs';
import { Icon } from '@components/icon';
import { strings } from '../../../i18n/supportedLanguages';
import { Formik } from 'formik';
import { PhoneField } from '@components/inputs';
import { StatusBar, ImageBackground } from 'react-native';
import * as yup from 'yup';
import { useLogin } from '@queries';
import { useAuth } from '../../context/AuthContext';

const loginValidationSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  phone: yup.string().required('Password is required'),
});

export const Login = ({ navigation }) => {
  const { isLoading, data, error, mutate: auth } = useLogin();
  const { setAuth } = useAuth();

  const onSubmit = async (values: { phone: string; password: string }) => {
    const payload = { username: values.phone, password: values.password };
    auth(payload);
  };

  useEffect(() => {
    if (data) {
      const { accessToken, ...rest } = data;
      setAuth(rest, accessToken);
    }
  }, [data, setAuth]);

  return (
    <Box flex={1}>
      <StatusBar backgroundColor='transparent' translucent={true} />
      <ImageBackground
        source={{ uri: 'https://i.ibb.co/0J0V0ZN/signup-bg.png' }}
        resizeMode='cover'
        /* eslint-disable-next-line react-native/no-inline-styles */
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
          {strings.loginToAccount}
        </Text>
      </ImageBackground>

      <Box
        background='white'
        marginTop='-10'
        marginX='5'
        padding='4'
        borderRadius={8}>
        <Text fontFamily='body' fontWeight='400' fontSize='sm' color='gray.800'>
          {strings.enterDetails}
        </Text>
        <Formik
          initialValues={{ phone: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={onSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isValid,
            dirty,
          }) => (
            <Box>
              <Box marginY='4'>
                <PhoneField
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  testID='phone-number-input'
                />
              </Box>
              <Box>
                <ZPassword
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder='Password'
                />
              </Box>

              {error ? (
                <Text color='warning.500' my='2' testID='error-message'>
                  {(error as { message: string }).message}
                </Text>
              ) : null}
              <Box
                flexDirection='row'
                alignItems='center'
                justifyContent='space-between'
                marginTop='3'
                marginBottom='5'>
                <ZCheckbox value='login'>
                  <Text color='gray.700' fontSize='xs'>
                    {strings.keepLogin}
                  </Text>
                </ZCheckbox>
                <Text color='primary.500' fontSize='xs'>
                  {strings.forgotPassword}
                </Text>
              </Box>
              <ZButton
                variant='solid'
                onPress={handleSubmit}
                disabled={!(dirty && isValid)}
                isLoading={isLoading}
                testID='LOGIN'>
                {strings.buttonLogin}
              </ZButton>
            </Box>
          )}
        </Formik>
      </Box>

      <Box marginTop='8' flexDirection='row' justifyContent='center'>
        <Text color='gray.700' fontFamily='body' fontWeight='400' fontSize='md'>
          {strings.dontHaveAccount}
        </Text>
        <Pressable
          onPress={() => navigation.navigate('Signup')}
          marginTop={-0.5}>
          <Text
            color='primary.500'
            fontFamily='body'
            fontWeight='700'
            fontSize='lg'>
            {' '}
            {strings.signup}
          </Text>
        </Pressable>
      </Box>
    </Box>
  );
};
