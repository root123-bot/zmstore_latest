import React from 'react';
import {
  VStack,
  Text,
  StatusBar,
  HStack,
  Avatar,
  Box,
  Spinner,
} from 'native-base';
import { Icon } from '@components/icon';
import { ZAccordion } from '@components/accordion';
import { strings } from '@i18n';
import { ScrollView } from 'react-native';
import { useGetProductCategories } from '@queries';

type Props = {
  label: string;
};

export function ProductCategoryAvatar({ label }: Props) {
  return (
    <VStack w='90px' h='122px' alignItems='center' space={2}>
      <Box>
        <Avatar
          source={{
            uri: 'https://images.unsplash.com/photo-1600369672770-985fd30004eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dG93ZWxzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
          }}
          w='72px'
          h='72px'
          borderWidth={1}
          borderColor='tertiary.500'
          p={0.5}
          bg='white'
        />
      </Box>
      <Text textAlign='center'>{label}</Text>
    </VStack>
  );
}

export function Categories() {
  const { data, isLoading } = useGetProductCategories();
  const categories = [];
  const map = new Map();

  if (data) {
    const formatted = data.reduce((acc, obj) => {
      if (!obj.parentId) {
        acc[obj.id] = [];
      } else {
        acc[obj.parentId] = [...acc[obj.parentId], obj];
      }
      return acc;
    }, {});

    Object.keys(formatted).forEach(key => {
      const parent = data.find(item => Number(item.id) === Number(key));
      map.set(parent, formatted[key]);
    });

    map.forEach((value, key) => {
      categories.push(
        <ZAccordion label={key.name} key={key.name}>
          <HStack space={5} flexWrap='wrap'>
            {value.map(val => (
              <Box key={val.id} mb={2}>
                <ProductCategoryAvatar label={val.name} />
              </Box>
            ))}
          </HStack>
        </ZAccordion>,
      );
    });
  }

  return (
    <>
      <StatusBar
        backgroundColor='white'
        translucent={false}
        barStyle='dark-content'
      />
      <Box backgroundColor='white' shadow={9}>
        <VStack h='56px' justifyContent='center' shadow={9}>
          <HStack mx={5} justifyContent='space-between'>
            <Icon
              name='hamburger-large'
              size={24}
              color='#000'
              testID='hambergerIcon'
            />
            <Text fontFamily='body' color='black' fontSize={15}>
              {strings.category}
            </Text>
            <Icon
              name='notification'
              size={24}
              color='#000'
              testID='notificationIcon'
            />
          </HStack>
        </VStack>
      </Box>
      {isLoading ? (
        <VStack justifyContent='center' flex={1} alignItems='center' space={2}>
          <Spinner size='lg' color='primary.500' />
          <Text fontFamily='body' color='black'>
            Fetching categories ...
          </Text>
        </VStack>
      ) : (
        <Box backgroundColor='#F9F9F9' flex={1}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack space={4} alignItems='center' mx={5} my={5}>
              {categories}
            </VStack>
          </ScrollView>
        </Box>
      )}
    </>
  );
}
