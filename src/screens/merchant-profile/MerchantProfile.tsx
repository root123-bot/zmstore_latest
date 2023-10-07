import React, { useState } from 'react';
import {
  Box,
  ScrollView,
  StatusBar,
  Text,
  VStack,
  useToast,
} from 'native-base';
import { ProfileAccordion } from './profile-accordion';
import { strings } from '@i18n';
import { customTheme as theme } from '@src/theme';
import {
  DemographicDetailsForm,
  MerchantDetailsForm,
  BusinessDetailsForm,
  BankDetailsForm,
} from '@components/forms';
import { profileUpdatePayloadType } from '../../types';
import { useStoreUpdate, useUserUpdate } from '@queries';
import { useAuth } from '../../context/AuthContext';

type CollapsedType =
  | 'demographic-details'
  | 'business-details'
  | 'merchant-details'
  | 'bank-details'
  | 'settings';

export function MerchantProfile() {
  const toast = useToast();
  const { authUser } = useAuth();
  const [collapsed, setCollapsed] = useState<CollapsedType>(null);
  const { mutateAsync: updateStore } = useStoreUpdate();
  const { mutateAsync: updateUser } = useUserUpdate();

  async function handleUpdate(values: profileUpdatePayloadType) {
    if (values.firstName) {
      const res = await updateUser({ user: values, id: authUser.id });
      res.status === 200 && toast.show({ description: 'Updated successfully' });
    } else {
      const res = await updateStore({ store: values, id: authUser.storeId });
      res.status === 200 && toast.show({ description: 'Updated successfully' });
    }
  }

  function handleCancel() {
    setCollapsed(null);
  }

  const handleChange = (menu: CollapsedType) => () => {
    setCollapsed(menu);
    menu === collapsed && setCollapsed(null);
  };

  return (
    <>
      <StatusBar
        backgroundColor='white'
        translucent={false}
        barStyle='dark-content'
      />
      <Box flex={1} bgColor='white'>
        <Box
          backgroundColor='white'
          h={10}
          alignItems='center'
          borderBottomColor={theme.colors.gray['1300']}
          borderBottomWidth={1}>
          <Text
            fontFamily='body'
            color={theme.colors.gray['1000']}
            fontSize={16}>
            {strings.profile}
          </Text>
        </Box>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box px={5} py={5} bgColor='white'>
            <VStack space={5}>
              <ProfileAccordion
                collapsed={collapsed === 'demographic-details'}
                onChange={handleChange('demographic-details')}
                user={authUser}>
                <Box
                  bg='white'
                  p={4}
                  borderRadius={8}
                  borderColor='gray.100'
                  borderWidth={1}>
                  <DemographicDetailsForm
                    onCancel={handleCancel}
                    onSubmit={handleUpdate}
                    initialValues={authUser}
                  />
                </Box>
              </ProfileAccordion>
              <ProfileAccordion
                label='Business Details'
                iconName='business-extra-large'
                collapsed={collapsed === 'business-details'}
                onChange={handleChange('business-details')}>
                <Box
                  bg='white'
                  p={4}
                  borderRadius={8}
                  borderColor='gray.100'
                  borderWidth={1}>
                  <BusinessDetailsForm
                    onCancel={handleCancel}
                    onSubmit={handleUpdate}
                  />
                </Box>
              </ProfileAccordion>
              <ProfileAccordion
                label='Address'
                iconName='home-large'
                collapsed={collapsed === 'merchant-details'}
                onChange={handleChange('merchant-details')}>
                <Box
                  bg='white'
                  p={4}
                  borderRadius={8}
                  borderColor='gray.100'
                  borderWidth={1}>
                  <MerchantDetailsForm
                    onCancel={handleCancel}
                    onSubmit={handleUpdate}
                  />
                </Box>
              </ProfileAccordion>
              <ProfileAccordion
                label='Bank Details'
                iconName='bank-large'
                collapsed={collapsed === 'bank-details'}
                onChange={handleChange('bank-details')}>
                <Box
                  bg='white'
                  p={4}
                  borderRadius={8}
                  borderColor='gray.100'
                  borderWidth={1}>
                  <BankDetailsForm
                    onCancel={handleCancel}
                    onSubmit={handleUpdate}
                  />
                </Box>
              </ProfileAccordion>
              <ProfileAccordion
                label='Settings'
                iconName='settings-large'
                collapsed={collapsed === 'settings'}
                onChange={handleChange('settings')}>
                <Text textAlign='center'>settings</Text>
              </ProfileAccordion>
            </VStack>
          </Box>
        </ScrollView>
      </Box>
    </>
  );
}
