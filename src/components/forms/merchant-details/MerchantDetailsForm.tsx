import React from 'react';
import { ZText, ZSelect } from '@components/inputs';
import { ZButton } from '@components/z-button';
import { Text, VStack, HStack, Pressable } from 'native-base';
import { Formik } from 'formik';
import { merchantDetailsSchema } from '@src/schemas';
import { strings } from '@i18n';
import { MerchantFormProps } from '@src/types';

export type MerchantDetailsFormValues = {
  area: string;
  city: string;
  country: string;
};

export function MerchantDetailsForm({
  onBack,
  onCancel,
  onSubmit,
  initialValues,
}: MerchantFormProps) {
  const countries = [
    {
      label: 'Tanzania',
      value: 'Tanzania',
    },
  ];

  function submit(values: MerchantDetailsFormValues) {
    onSubmit(values);
  }

  return (
    <Formik
      initialValues={{
        area: initialValues?.area ?? '',
        city: initialValues?.city ?? '',
        country: initialValues?.country ?? '',
      }}
      validationSchema={merchantDetailsSchema}
      onSubmit={submit}>
      {({ handleChange, handleSubmit, values, isValid, errors, touched }) => (
        <VStack space={4}>
          <Text fontSize={14} color='gray.800'>
            {strings.merchantSignUpScreen.fillTheAddress}
          </Text>
          <ZText
            placeholder={strings.streetName}
            invalidMessage={errors.area}
            isInvalid={errors.area && touched.area}
            value={values.area}
            onChangeText={handleChange('area')}
          />
          <ZText
            placeholder={strings.cityName}
            invalidMessage={errors.city}
            isInvalid={errors.city && touched.city}
            value={values.city}
            onChangeText={handleChange('city')}
          />
          <ZSelect
            selectionItems={countries}
            placeholder={strings.country}
            onValueChange={handleChange('country')}
            selectedValue={values.country}
            invalidMessage={errors.country}
            isInvalid={errors.country && touched.country}
          />
          {initialValues?.id ? (
            <HStack alignItems='center' justifyContent='space-between'>
              <ZButton
                onPress={onCancel}
                disabled={!isValid}
                w='2/5'
                variant='outline'>
                {strings.cancel}
              </ZButton>
              <ZButton
                onPress={handleSubmit}
                disabled={!isValid}
                w='2/5'
                variant='solid'>
                {strings.update}
              </ZButton>
            </HStack>
          ) : (
            <HStack alignItems='center' justifyContent='space-between'>
              <Pressable onPress={onBack}>
                <Text fontSize={16} color='black'>
                  {strings.back}
                </Text>
              </Pressable>
              <ZButton
                onPress={handleSubmit}
                disabled={!isValid}
                w='1/2'
                variant='solid'>
                {strings.proceed}
              </ZButton>
            </HStack>
          )}
        </VStack>
      )}
    </Formik>
  );
}
