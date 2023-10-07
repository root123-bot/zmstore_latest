/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { Image, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { Box, useTheme } from 'native-base';
import { Platform } from 'react-native';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Icon } from '@components/icon';

export const Onboard = ({ navigation }: { navigation: any }) => {
  // using useTheme() to access the values from nativeBase theme
  const { colors, fonts } = useTheme();
  const { setItem } = useLocalStorage();

  useEffect(() => {
    setItem('onboarded', 'true');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const NextButton = ({ ...props }) => (
    <TouchableOpacity {...props}>
      <Box
        width={54}
        height={54}
        marginX='18'
        borderRadius='120'
        backgroundColor='primary.500'
        alignItems='center'
        justifyContent='center'>
        <Icon
          name='arrow-right-large'
          size={30}
          color='white'
          testID='arrow-right-1'
        />
      </Box>
    </TouchableOpacity>
  );

  const Done = ({ ...props }) => <NextButton {...props} />;

  const Dots = ({ selected }: { selected: any }) => {
    return (
      <Box
        width={2}
        height={2}
        borderRadius='24'
        marginX='2'
        backgroundColor={selected ? 'primary.500' : 'gray.300'}
        marginBottom={Platform.OS === 'ios' ? '180' : '120'}
      />
    );
  };

  const handleDone = () => {
    navigation.replace('MainNavigator');
  };

  return (
    <Box flex={1}>
      <StatusBar backgroundColor='transparent' translucent={true} />
      <Onboarding
        onSkip={handleDone}
        onDone={handleDone}
        NextButtonComponent={NextButton}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        bottomBarHeight={110}
        bottomBarColor='white'
        containerStyles={{
          display: 'flex',
          justifyContent: 'flex-start',
          position: 'relative',
        }}
        titleStyles={{
          fontFamily: fonts.heading,
          fontSize: 20,
          fontWeight: '500',
          color: colors.gray[1100],
          lineHeight: 27,
        }}
        subTitleStyles={{
          fontFamily: fonts.body,
          fontSize: 16,
          fontWeight: '300',
          color: colors.gray[1000],
          lineHeight: 18,
        }}
        pages={[
          {
            backgroundColor: colors.white,
            image: (
              <Image
                source={{ uri: 'https://i.ibb.co/wQtRSCB/onboard1.png' }}
                style={{ width: '100%', height: 490 }}
                accessibilityRole='image'
              />
            ),
            title: 'Best Furnishing Items For you',
            subtitle:
              'Voluptas neque molestiae eveniet atque earum voluptas. molestiae',
          },
          {
            backgroundColor: colors.white,
            image: (
              <Image
                source={{ uri: 'https://i.ibb.co/cYWcX5V/onboard2.png' }}
                style={{ width: '100%', height: 490 }}
                accessibilityRole='image'
              />
            ),
            title: 'Connecting People with Style',
            subtitle:
              'Voluptas neque molestiae eveniet atque earum voluptas. molestiae',
          },
          {
            backgroundColor: colors.white,
            image: (
              <Image
                source={{ uri: 'https://i.ibb.co/qs1zWbQ/onboard3.png' }}
                style={{ width: '100%', height: 490 }}
                accessibilityRole='image'
              />
            ),
            title: "It's not Living, Unlesss There's Style",
            subtitle:
              'Voluptas neque molestiae eveniet atque earum voluptas. molestiae',
          },
        ]}
      />
      <SafeAreaView style={{ backgroundColor: 'white' }} />
    </Box>
  );
};
