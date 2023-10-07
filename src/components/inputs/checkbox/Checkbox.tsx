import React, { ReactNode } from 'react';
import { Checkbox, ICheckboxProps } from 'native-base';

type Props = {
  value: string | number | boolean;
  children: ReactNode;
};

export function ZCheckbox({
  children,
  value,
  ...props
}: Props & ICheckboxProps) {
  return (
    <Checkbox
      fontFamily='body'
      value={value}
      _checked={{
        bg: 'primary.500',
        borderColor: 'primary.500',
        _icon: {
          color: 'white',
        },
      }}
      _invalid={{
        borderColor: 'warning.500',
      }}
      {...props}>
      {children}
    </Checkbox>
  );
}
