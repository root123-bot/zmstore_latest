import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  HStack,
  Pressable,
  Text,
  VStack,
  FlatList,
} from 'native-base';
import { SearchField } from '@components/inputs';
import { TopbarNavigator } from '../../components/topbar-navigator';
import { EmptyProductList } from './empty-product-list';
import { strings } from '@i18n';
import { useGetProducts } from '@src/queries';
import { useAuth } from '@src/context/AuthContext';
import { LoadingSpinner } from '@src/components/loading-spinner';
import { Icon } from '@src/components/icon';
import { ProductListItem } from './ProductListItem';

export function SellerProductList({ navigation }) {
  const { authUser } = useAuth();
  const [pageNumber, setPageNumber] = useState(1);
  const [reachedEnd, setReachedEnd] = useState(false);

  const { data: payload, isLoading } = useGetProducts({
    storeId: authUser.storeId,
    page: pageNumber,
    limit: 10,
  });

  const [mt, setMt] = useState({
    oldPage: 0,
    data: [],
  });

  useEffect(() => {
    if (pageNumber > mt.oldPage && !isLoading) {
      if (payload.data.length > 0) {
        setMt(prevState => ({
          ...prevState,
          data: [...prevState.data, ...payload.data],
        }));
      }
      setReachedEnd(false);
    }
  }, [pageNumber, mt.oldPage, isLoading, payload]);

  const handleOnAddProductPress = () => {
    navigation.navigate('AddProduct');
  };

  const handleSelectProduct = product => () => {
    navigation.navigate('ViewProduct', { productId: product.id });
  };

  return (
    <Box flex={1} bg='white' safeArea>
      <TopbarNavigator />
      <VStack px={2} mb={3}>
        <Box my={4}>
          <SearchField placeholder={strings.productScreen.searchProducts} />
        </Box>
        <Box>
          <Button
            variant='solid'
            onPress={handleOnAddProductPress}
            leftIcon={<Icon name='add-large' color='white' />}>
            {strings.product_listing.add_new_product_text}
          </Button>
        </Box>
      </VStack>
      {!isLoading && payload.total === 0 ? (
        <EmptyProductList />
      ) : (
        <VStack px={2} flex={1}>
          <HStack
            justifyContent='space-between'
            borderBottomWidth={1}
            borderBottomColor='gray.300'>
            <Text lineHeight='3xl' fontSize={16} color={'gray.600'}>
              {strings.product_listing.product_listing_header}
            </Text>
          </HStack>
          <FlatList
            data={mt.data}
            renderItem={({ item }) => (
              <Box px={0} key={item.id}>
                <Pressable onPress={handleSelectProduct(item)}>
                  <ProductListItem
                    isDrafted={item.publishedAt ? true : false}
                    metadata={item}
                  />
                </Pressable>
              </Box>
            )}
            keyExtractor={item => item.id}
            ListFooterComponent={
              isLoading || reachedEnd
                ? () => <LoadingSpinner h='50' />
                : () => <></>
            }
            onEndReached={() => {
              setReachedEnd(true);
              setPageNumber(prevState => prevState + 1);
            }}
            onEndReachedThreshold={0}
          />
        </VStack>
      )}
    </Box>
  );
}
