import React from 'react';
import { Select, ISelectProps } from 'native-base';
// import { Icon } from '@components/icon';
// import { StyleSheet } from 'react-native';
// import { customTheme } from '@src/theme';

type Selections = {
  label: string;
  value: string;
};
type Props = {
  selectionItems: Selections[];
  isInvalid?: boolean;
  invalidMessage?: string;
};

// const DropdownIcon = () => <Icon
//   name='arrow-medium'
//   size={12}
//   style={styles.icon}
//   color={customTheme.colors.gray['500']}
// />

export function ZSelect({ children, ...theRest }: Props & ISelectProps) {
  return (
    <Select
      borderColor={'gray.100'}
      // dropdownIcon={<DropdownIcon />}
      {...theRest}>
      {children}
    </Select>
  );
}
