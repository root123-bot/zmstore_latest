import React from 'react';
import { ProfileAccordion } from './ProfileAccordion';
import { Text } from 'native-base';
import { render } from '../../../utils/testUtils';

describe('Profile Accordion', () => {
  it('renders opened profile accordion component', () => {
    const screen = render(
      <ProfileAccordion label='Settings' collapsed onChange={jest.fn()}>
        <Text>User Settings</Text>
      </ProfileAccordion>,
    );
    expect(screen.getByText('Settings')).toBeTruthy();
    expect(screen.getByText('User Settings')).toBeTruthy();
  });
  it('renders closed profile accordion component', () => {
    const screen = render(
      <ProfileAccordion label='Settings' collapsed={false} onChange={jest.fn()}>
        <Text>User Settings</Text>
      </ProfileAccordion>,
    );
    expect(screen.getByText('Settings')).toBeTruthy();
    expect(screen.queryByText('User Settings')).toBeFalsy();
  });
});
