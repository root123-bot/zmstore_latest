import React from 'react';
import { ZRadio } from './radio';
import { Radio } from 'native-base';
import { render } from '../../../utils/testUtils';

describe('Radio button', () => {
  it('renders default Radio button', () => {
    const screen = render(
      <Radio.Group name='options'>
        <ZRadio label='Zeromoja' value='Zeromoja' />
      </Radio.Group>,
    );
    expect(screen.getByText('Zeromoja')).toBeTruthy();
  });
});
