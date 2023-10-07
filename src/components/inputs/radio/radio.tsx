import React from 'react';
import { Radio, IRadioProps } from 'native-base';

type Props = {
  value: string | number | boolean;
  label: string;
};

export function ZRadio({ label, value, ...props }: Props & IRadioProps) {
  return (
    <Radio
      value={value}
      size='sm'
      fontFamily='body'
      accessibilityLabel={label}
      _checked={{
        borderColor: 'primary.500',
        _icon: {
          color: 'primary.500',
        },
      }}
      _invalid={{
        borderColor: 'warning.500',
      }}
      {...props}>
      {label}
    </Radio>
  );
}
