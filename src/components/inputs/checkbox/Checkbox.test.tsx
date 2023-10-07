import React from 'react';
import { ZCheckbox } from './Checkbox';
import { render } from '../../../utils/testUtils';

describe('Checkbox', () => {
  it('renders default checkbox', () => {
    const screen = render(<ZCheckbox value='Zeromoja'>Zeromoja</ZCheckbox>);
    expect(screen.getByText('Zeromoja')).toBeTruthy();
  });
});
