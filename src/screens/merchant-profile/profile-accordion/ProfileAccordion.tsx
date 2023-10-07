import React, { ReactNode } from 'react';
import { HStack, VStack, Pressable, Text, Box, Avatar } from 'native-base';
import { Icon } from '@components/icon';
import { customTheme as theme } from '@src/theme';
import { UserType } from '@src/types';
import { strings } from '@i18n';

type ProfileAccordion = {
  user?: UserType;
  label?: string;
  iconName?: string;
  children: ReactNode;
  collapsed: boolean;
  onChange(): void;
};

export function ProfileAccordion({
  user,
  label,
  iconName,
  children,
  collapsed,
  onChange,
}: ProfileAccordion) {
  const gray = theme.colors.gray;

  function formatName(name: string) {
    return `${name.charAt(0).toUpperCase()}${name.substring(1)}`;
  }

  function formatInitials(firstName: string, lastName: string) {
    return `${firstName.charAt(0).toUpperCase()}${lastName
      .charAt(0)
      .toUpperCase()}`;
  }
  return (
    <VStack w='full' space={4}>
      <Pressable onPress={onChange}>
        <HStack
          justifyContent='space-between'
          alignItems='center'
          shadow={2}
          h={18}
          bgColor='white'
          borderRadius={8}
          px={5}>
          {user ? (
            <HStack alignItems='center' space={4}>
              <Box position='relative'>
                <Avatar bg={gray['1400']} height='60px' width='60px'>
                  <Text color='white' fontSize={16} fontWeight={600}>
                    {formatInitials(user.firstName, user.lastName)}
                  </Text>
                </Avatar>
                <Avatar
                  bg='primary.500'
                  height={5}
                  width={5}
                  position='absolute'
                  right={0}
                  bottom={0}>
                  <Icon name='add-small' color={theme.colors.white} size={20} />
                </Avatar>
              </Box>
              <VStack space={1}>
                <Text fontSize={16} fontWeight={600} color={gray['1000']}>
                  {formatName(user.firstName)} {formatName(user.lastName)}
                </Text>
                <Text
                  fontSize={14}
                  fontWeight={500}
                  color={theme.colors.pending['500']}
                  bg={theme.colors.pending['400']}
                  px={2}
                  borderRadius={4}>
                  {strings.requestPending}
                </Text>
              </VStack>
            </HStack>
          ) : (
            <HStack alignItems='center' space={3}>
              <Box
                w={10}
                h={10}
                bg='primary.200'
                rounded='full'
                justifyContent='center'
                alignItems='center'>
                <Icon
                  name={iconName}
                  size={24}
                  color={theme.colors.primary['500']}
                />
              </Box>
              <Text
                fontSize={14}
                fontWeight={400}
                color={theme.colors.gray['800']}>
                {label}
              </Text>
            </HStack>
          )}
          {collapsed ? (
            <Icon
              name='chevron-up'
              size={28}
              color={gray['1200']}
              testID='arrowIcon'
            />
          ) : (
            <Icon
              name='arrow-extra-large'
              size={28}
              color={gray['1200']}
              testID='arrowIcon'
            />
          )}
        </HStack>
      </Pressable>
      {collapsed && children}
    </VStack>
  );
}
