import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Box, HStack, Text, Image, VStack, Pressable } from 'native-base';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ImageBackground } from 'react-native';
import { customTheme as theme } from '@src/theme';
import { Icon } from '@components/icon';
import { SearchField } from '@components/inputs';
import { strings } from '../../../i18n/supportedLanguages';

interface PropTypes {
  navigation?: NavigationProp<ParamListBase>;
}
export const Home = ({ navigation }: PropTypes) => {
  const color = theme.colors;
  const shopByCategories = ['Bedsheets', 'Towels'];
  const newArrivals = [
    'Cotton Bedsheet',
    'Spa Towels',
    'Cleanup Towels',
    'Polyster Bedsheets',
    'Satin Bedsheets',
  ];
  const shopByProducts = [
    {
      name: 'Single Bedsheets',
      price: 14000,
    },
    {
      name: 'Hand Towels',
      price: 99999,
    },
    {
      name: 'Face Towels',
      price: 80600,
    },
  ];
  const towelCollection = [
    {
      name: 'Spa Towels',
      price: 14000,
    },
    {
      name: 'Hand Towels',
      price: 99999,
    },
    {
      name: 'Satin Towels',
      price: 99999,
    },
  ];
  const bedSheetCollection = [
    {
      name: 'Satin Bedsheets',
      price: 59000,
    },
    {
      name: 'Cotton Bedsheets',
      price: 80500,
    },
    {
      name: 'Hand Bedsheets',
      price: 70200,
    },
  ];
  const comboOffer = [
    {
      name: 'Set of Hand Towels',
      discount: 10,
      previousPrice: 30000,
      currentPrice: 25000,
    },
    {
      name: 'Set of Spa Towels',
      discount: 15,
      previousPrice: 90000,
      currentPrice: 80000,
    },
    {
      name: 'Set of Satin Towels',
      discount: 20,
      previousPrice: 45000,
      currentPrice: 22000,
    },
  ];
  return (
    <SafeAreaView>
      <Box backgroundColor='white' minHeight='full'>
        <HStack
          justifyContent='space-between'
          px={5}
          py={3}
          borderBottomWidth={0.5}
          borderBottomColor='gray.200'>
          <Icon
            name='hamburger-large'
            size={24}
            color={color.gray[1000]}
            testID='hambergerIcon'
          />
          <Pressable onPress={() => navigation.navigate('MerchantSignUp')}>
            <HStack
              h={26}
              borderColor='primary.500'
              borderWidth={1}
              rounded='md'>
              <Text
                fontSize='sm'
                color='primary.500'
                mx={2}
                fontFamily='body'
                fontWeight={400}>
                {strings.homeScreen.becomeAMerchant}
              </Text>
              <Box
                backgroundColor='primary.500'
                w={27}
                alignItems='center'
                justifyContent='center'>
                <Icon
                  name='arrow-small'
                  size={16}
                  color='white'
                  testID='chevronRightIcon'
                />
              </Box>
            </HStack>
          </Pressable>
        </HStack>

        <Box mx={5} my={5}>
          <SearchField placeholder='Search products' />
        </Box>

        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack mx={5} pb={80} space={6}>
            <VStack space={3}>
              <HStack
                justifyContent='space-between'
                fontFamily='body'
                fontWeight={400}>
                <Text fontSize={16} color='gray.900'>
                  {strings.homeScreen.shopByCategory}
                </Text>
                <Text
                  fontSize={14}
                  color='primary.500'
                  testID='categoryViewAll'>
                  {strings.homeScreen.viewAll}
                </Text>
              </HStack>
              <HStack space={5} fontFamily='body' fontWeight={400}>
                {shopByCategories.map(product => (
                  <ImageBackground
                    source={require('../../../assets/images/onboard3.png')}
                    resizeMode='cover'
                    key={product}
                    borderRadius={8}>
                    <Box width={160} height={117} position='relative'>
                      <HStack
                        position='absolute'
                        bottom={-16}
                        left={0}
                        right={0}
                        justifyContent='center'>
                        <Box
                          backgroundColor={color.gray[1000]}
                          rounded='sm'
                          py={1}
                          px={4}>
                          <Text color='white'>{product}</Text>
                        </Box>
                      </HStack>
                    </Box>
                  </ImageBackground>
                ))}
              </HStack>
            </VStack>

            <VStack space={3} pt={5}>
              <HStack
                justifyContent='space-between'
                fontFamily='body'
                fontWeight={400}>
                <Text fontSize={16} color='gray.900'>
                  {strings.homeScreen.newArrivals}
                </Text>
                <Text
                  fontSize={14}
                  color='primary.500'
                  testID='newArrivalsViewAll'>
                  {strings.homeScreen.viewAll}
                </Text>
              </HStack>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <HStack space='5' fontFamily='body' fontWeight={400}>
                  {newArrivals.map(product => (
                    <ImageBackground
                      source={require('../../../assets/images/onboard1.png')}
                      resizeMode='cover'
                      key={product}
                      borderRadius={4}>
                      <Box width={144} height={170} position='relative'>
                        <HStack
                          position='absolute'
                          bottom={2}
                          left={0}
                          right={0}
                          justifyContent='center'>
                          <Box
                            borderColor='white'
                            borderWidth='1'
                            rounded='sm'
                            px={2}>
                            <Text color='white'>{product}</Text>
                          </Box>
                        </HStack>
                      </Box>
                    </ImageBackground>
                  ))}
                </HStack>
              </ScrollView>
            </VStack>

            <VStack space={3}>
              <HStack
                justifyContent='space-between'
                fontFamily='body'
                fontWeight={400}>
                <Text fontSize={16} color='gray.900'>
                  {strings.homeScreen.shopByProduct}
                </Text>
                <Text
                  fontSize={14}
                  color='primary.500'
                  testID='productsViewAll'>
                  {strings.homeScreen.viewAll}
                </Text>
              </HStack>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <HStack space='5' fontFamily='body' fontWeight={400}>
                  {shopByProducts.map(product => (
                    <Box
                      key={product.name}
                      w={150}
                      h={188}
                      borderColor='gray.200'
                      borderWidth={1}
                      borderRadius={4}>
                      <Image
                        source={require('../../../assets/images/onboard2.png')}
                        alt={product.name}
                        h={140}
                        w='full'
                        borderTopRadius={4}
                      />
                      <Text
                        color={color.gray[1000]}
                        textAlign='center'
                        fontSize='sm'>
                        {product.name}
                      </Text>
                      <HStack space={2} justifyContent='center' fontSize='xs'>
                        <Text color={color.gray[600]}>Under</Text>
                        <Text color='primary.500'>TZS {product.price}</Text>
                      </HStack>
                    </Box>
                  ))}
                </HStack>
              </ScrollView>
            </VStack>

            <VStack space={3}>
              <HStack
                justifyContent='space-between'
                fontFamily='body'
                fontWeight={400}>
                <Text fontSize={16} color='gray.900'>
                  {strings.homeScreen.towelCollection}
                </Text>
                <Text
                  fontSize={14}
                  color='primary.500'
                  testID='collectionViewAll'>
                  {strings.homeScreen.viewAll}
                </Text>
              </HStack>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <HStack space='5'>
                  {towelCollection.map(product => (
                    <Box
                      key={product.name}
                      w={180}
                      h={228}
                      borderColor='gray.200'
                      borderWidth={1}
                      borderRadius={4}>
                      <ImageBackground
                        source={require('../../../assets/images/onboard3.png')}
                        borderTopLeftRadius={4}
                        borderTopRightRadius={4}>
                        <Box h={180} w='full' position='relative'>
                          <Box
                            p={2}
                            position='absolute'
                            bottom={3}
                            right={3}
                            backgroundColor='white'
                            rounded='full'
                            w={30}
                            h={30}>
                            <Icon
                              name='cart-medium'
                              size={16}
                              testID='cartIcon'
                            />
                          </Box>
                        </Box>
                      </ImageBackground>
                      <Text
                        color={color.gray[1000]}
                        ml={2}
                        fontSize='sm'
                        fontFamily='body'
                        fontWeight={500}>
                        {product.name}
                      </Text>
                      <HStack
                        space={2}
                        ml={2}
                        fontSize='xs'
                        fontFamily='body'
                        fontWeight={400}>
                        <Text color={color.gray[600]}>Starting At</Text>
                        <Text color='primary.500'>TZS {product.price}</Text>
                      </HStack>
                    </Box>
                  ))}
                </HStack>
              </ScrollView>
            </VStack>

            <VStack space={3}>
              <HStack
                justifyContent='space-between'
                fontFamily='body'
                fontWeight={400}>
                <Text fontSize={16} color='gray.900'>
                  {strings.homeScreen.bedsheetCollection}
                </Text>
                <Text
                  fontSize={14}
                  color='primary.500'
                  testID='bedsheetViewAll'>
                  {strings.homeScreen.viewAll}
                </Text>
              </HStack>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <HStack space='5'>
                  {bedSheetCollection.map(product => (
                    <Box
                      key={product.name}
                      w={180}
                      h={228}
                      borderColor='gray.200'
                      borderWidth={1}
                      borderRadius={4}>
                      <ImageBackground
                        source={require('../../../assets/images/onboard1.png')}
                        borderTopLeftRadius={4}
                        borderTopRightRadius={4}>
                        <Box h={180} w='full' position='relative'>
                          <Box
                            p={2}
                            position='absolute'
                            bottom={3}
                            right={3}
                            backgroundColor='white'
                            rounded='full'
                            w={30}
                            h={30}>
                            <Icon
                              name='cart-medium'
                              size={16}
                              testID='cartIcon'
                            />
                          </Box>
                        </Box>
                      </ImageBackground>
                      <Text
                        color={color.gray[1000]}
                        ml={2}
                        fontSize='sm'
                        fontFamily='body'
                        fontWeight={500}>
                        {product.name}
                      </Text>
                      <HStack
                        space={2}
                        ml={2}
                        fontSize='xs'
                        fontFamily='body'
                        fontWeight={400}>
                        <Text color={color.gray[600]}>Starting At</Text>
                        <Text color='primary.500'>TZS {product.price}</Text>
                      </HStack>
                    </Box>
                  ))}
                </HStack>
              </ScrollView>
            </VStack>

            <VStack space={3}>
              <HStack
                justifyContent='space-between'
                fontFamily='body'
                fontWeight={400}>
                <Text fontSize={16} color='gray.900'>
                  {strings.homeScreen.comboSetOffers}
                </Text>
                <Text fontSize={14} color='primary.500' testID='comboViewAll'>
                  {strings.homeScreen.viewAll}
                </Text>
              </HStack>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <HStack space='5' fontFamily='body' fontWeight={400}>
                  {comboOffer.map(product => (
                    <Box
                      key={product.name}
                      w={180}
                      h={228}
                      borderColor='gray.200'
                      borderWidth={1}
                      borderRadius={4}>
                      <ImageBackground
                        source={require('../../../assets/images/onboard3.png')}
                        borderTopLeftRadius={4}
                        borderTopRightRadius={4}>
                        <Box h={180} w='full' position='relative'>
                          <HStack
                            position='absolute'
                            top={3}
                            left={0}
                            right={0}
                            justifyContent='center'>
                            <Box
                              backgroundColor='white'
                              rounded='sm'
                              py={1}
                              px={2}>
                              <Text color={color.gray[1000]}>
                                {product.name}
                              </Text>
                            </Box>
                          </HStack>
                          <Box
                            p={2}
                            position='absolute'
                            bottom={3}
                            right={3}
                            backgroundColor='white'
                            rounded='full'
                            w={30}
                            h={30}>
                            <Icon
                              name='cart-medium'
                              size={16}
                              testID='cartIcon'
                            />
                          </Box>
                        </Box>
                      </ImageBackground>
                      <Text color={color.gray[1000]} ml={2} fontSize='sm'>
                        Up To {product.discount}% Off
                      </Text>
                      <HStack space={2} ml={2} fontSize='xs'>
                        <Text color='primary.500'>
                          TZS {product.currentPrice}
                        </Text>
                        <Text color={color.gray[600]} strikeThrough>
                          TZS {product.previousPrice}
                        </Text>
                      </HStack>
                    </Box>
                  ))}
                </HStack>
              </ScrollView>
            </VStack>
          </VStack>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};
