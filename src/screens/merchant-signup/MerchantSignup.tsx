import React, { useState } from 'react';
import { Icon } from '@components/icon';
import { Stepper } from '@components/stepper';
import { Box, Text, VStack, StatusBar, Image } from 'native-base';
import { ScrollView } from 'react-native';
import { customTheme } from '@src/theme';
import { BankDetails } from './bank-details';
import { BusinessDetails } from './business-details';
import { DemographicDetails } from './demographic-details';
import { MerchantDetails } from './merchant-details';
import { FormValueType, FormValuesType } from '../../types';
import { strings } from '../../../i18n/supportedLanguages';
import { useMerchantSignUp } from '@queries';
import { createContext } from 'react';

type Props = {
  navigation?: any;
};

export type MerchantSignupContextType = {
  onSubmit(values: FormValueType, currentStep: number): void;
  onBack?(): void;
};

export const MerchantSignupContext =
  createContext<MerchantSignupContextType>(null);

export function MerchantSignUp({ navigation }: Props) {
  const color = customTheme.colors;
  const [step, setStep] = useState(0);
  const [formValues, setFormValues] = useState<FormValuesType>(null);
  const mutation = useMerchantSignUp();

  function updateFormValues(values: FormValueType) {
    setFormValues(currentValues => {
      return { ...currentValues, ...values };
    });
  }

  async function onSubmit(values: FormValueType, currentStep: number) {
    switch (currentStep) {
      case 0:
        setStep(1);
        updateFormValues(values);
        break;
      case 1:
        setStep(2);
        updateFormValues(values);
        break;
      case 2:
        setStep(3);
        updateFormValues(values);
        break;
      case 3:
        const res = await mutation.mutateAsync({ ...formValues, ...values });
        res.status === 201 && navigation.navigate('HomeTabs');
    }
  }
  function onBack() {
    setStep(currentStep => currentStep - 1);
  }

  const contextData: MerchantSignupContextType = {
    onSubmit,
    onBack,
  };

  const steps = [
    <DemographicDetails />,
    <BusinessDetails />,
    <MerchantDetails />,
    <BankDetails />,
  ];

  return (
    <>
      <StatusBar
        backgroundColor={color.primary[400]}
        barStyle='light-content'
      />
      <Box flex={1} bg='white' safeArea position='relative'>
        <Image
          source={{ uri: require('../../../assets/images/register.png') }}
          alt='background image'
          h={300}
          w='full'
          borderTopRadius={4}
        />
        <Box
          mx={5}
          position='absolute'
          top={0}
          left={0}
          right={0}
          bottom={0}
          mb={10}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack pt={10} alignItems='center' space={3} mb={10}>
              <Icon
                name='zeromoja'
                size={50}
                color='#fff'
                testID='zeromoja-icon'
              />
              <Text
                fontSize={20}
                color='white'
                fontFamily='body'
                fontWeight={600}>
                {strings.welcomeZeromoja}
              </Text>
              <Text
                fontSize={16}
                color='white'
                fontFamily='body'
                fontWeight={400}>
                {strings.merchantSignUpScreen.createAccountStartSelling}
              </Text>
            </VStack>
            <Box
              bg='white'
              p={4}
              borderRadius={8}
              borderColor='gray.100'
              borderWidth={1}>
              <MerchantSignupContext.Provider value={contextData}>
                <Stepper active={step} content={steps} showButton={false} />
              </MerchantSignupContext.Provider>
            </Box>
          </ScrollView>
        </Box>
      </Box>
    </>
  );
}
