import { extendTheme } from 'native-base';

const colors = {
  bamboo: {
    50: '#FFECDE',
    100: '#FFDCC2',
    200: '#FFBC8A',
    300: '#FF9B52',
    400: '#FF7B1A',
    500: '#E15F00',
    600: '#C85400',
    700: '#AE4900',
    800: '#953F00',
    900: '#7B3400',
  },
  amethyst: {
    50: '#F7F5FB',
    100: '#ECE6F5',
    200: '#D6C9EA',
    300: '#C0ACDE',
    400: '#AA8ED3',
    500: '#9471C7',
    600: '#7649B7',
    700: '#5C398F',
    800: '#422967',
    900: '#28193F',
    950: '#1B112B',
  },
  red: {
    500: '#d20000',
  },
};

export const customTheme = extendTheme({
  colors: {
    primary: colors.bamboo,
    secondary: colors.amethyst,
    danger: colors.red,
    white: '#FFFFFF',
  },
  fontConfig: {
    Inter: {
      300: {
        normal: 'Inter-Light',
      },
      400: {
        normal: 'Inter-Regular',
      },
      500: {
        normal: 'Inter-Medium',
      },
      600: {
        normal: 'Inter-SemiBold',
      },
      700: {
        normal: 'Inter-Bold',
      },
    },
    Nunito: {
      400: {
        normal: 'Nunito-Regular',
      },
      500: {
        normal: 'Nunito-Medium',
      },
      600: {
        normal: 'Nunito-SemiBold',
      },
      700: {
        normal: 'Nunito-Bold',
      },
    },
  },
  fonts: {
    heading: 'Nunito',
    body: 'Inter',
    mono: 'Inter',
  },
  sizes: {
    18: 72,
    14: 56,
  },
  components: {
    Select: {
      baseStyle: {
        _customDropdownIconProps: {
          color: 'muted.500',
          size: '3',
          p: '1',
        },
      },
    },
    Input: {
      baseStyle: {
        _focus: {
          borderColor: 'muted.300',
        },
      },
      variants: {
        outline: {
          _focus: {
            bg: 'white',
          },
        },
      },
    },
    FormControlLabel: {
      baseStyle: {
        _text: {
          color: 'gray.600',
          fontFamily: 'body',
          fontWeight: 'normal',
          fontSize: '14',
        },
      },
    },
  },
});
