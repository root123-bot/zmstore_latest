import React from 'react';
import { ZText, ZRadio, ZSelect } from '@components/inputs';
import { ZButton } from '@components/z-button';
import { Text, VStack, HStack, Radio, Pressable } from 'native-base';
import { Formik } from 'formik';
import { businessDetailsSchema } from '@src/schemas';
import { strings } from '@i18n';
import { MerchantFormProps } from '@src/types';

export type BusinessDetailsFormValues = {
  businessName: string;
  phone: string;
  accountType: string;
  storeCategory: string;
  tinNumber: string;
};

export function BusinessDetailsForm({
  onBack,
  onCancel,
  onSubmit,
  initialValues,
}: MerchantFormProps) {
  const storeCategories = [
    {
      label: 'Electronics',
      value: 'Electronics',
    },
  ];

  function submit(values: BusinessDetailsFormValues) {
    onSubmit(values);
  }

  function getStoreCategory(): string {
    return 'Electronics';
  }

  return (
    <Formik
      initialValues={{
        businessName: initialValues?.name ?? '',
        phone: initialValues?.phone ?? '',
        accountType: initialValues?.accountType ?? '',
        storeCategory: getStoreCategory() ?? '',
        tinNumber: initialValues?.tinNumber ?? '',
      }}
      validationSchema={
        initialValues?.id
          ? businessDetailsSchema.omit(['businessName'])
          : businessDetailsSchema
      }
      onSubmit={submit}>
      {({ handleChange, handleSubmit, values, isValid, errors, touched }) => (
        <VStack space={6}>
          <Text fontSize={14} color='gray.800'>
            {strings.merchantSignUpScreen.enterBusinessDetails}
          </Text>
          <VStack space={2}>
            <Text fontSize={14} color='gray.800'>
              {strings.accountType}
            </Text>
            <Radio.Group
              name='accountType'
              onChange={handleChange('accountType')}
              value={values.accountType}>
              <HStack
                space={8}
                alignItems='center'
                bg='primary.300'
                h={10}
                px={2}
                w='full'
                borderRadius={4}>
                <ZRadio
                  label={strings.individual}
                  value='Individual'
                  isInvalid={errors.accountType && touched.accountType}
                />
                <ZRadio
                  label={strings.corporate}
                  value='Corporate'
                  isInvalid={errors.accountType && touched.accountType}
                />
              </HStack>
            </Radio.Group>
          </VStack>
          {!initialValues?.id && (
            <ZText
              placeholder={strings.businessName}
              invalidMessage={errors.businessName}
              isInvalid={errors.businessName && touched.businessName}
              value={values.businessName}
              onChangeText={handleChange('businessName')}
            />
          )}
          <ZText
            placeholder={strings.phone}
            invalidMessage={errors.phone}
            isInvalid={errors.phone && touched.phone}
            value={values.phone}
            onChangeText={handleChange('phone')}
          />
          <VStack space={2}>
            <Text fontSize={14} color='gray.800'>
              {strings.merchantSignUpScreen.selectStoreCategory}
            </Text>
            <ZSelect
              selectionItems={storeCategories}
              placeholder={strings.storeCategory}
              onValueChange={handleChange('storeCategory')}
              selectedValue={values.storeCategory}
              invalidMessage={errors.storeCategory}
              isInvalid={errors.storeCategory && touched.storeCategory}
            />
          </VStack>
          <ZText
            placeholder={strings.merchantSignUpScreen.tinNumber}
            value={values.tinNumber}
            onChangeText={handleChange('tinNumber')}
            invalidMessage={errors.tinNumber}
            isInvalid={errors.tinNumber && touched.tinNumber}
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
