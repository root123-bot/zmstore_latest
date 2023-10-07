import React from 'react';
import { ZAccordion } from './Accordion';
import { render } from '../../utils/testUtils';
import { Text } from 'native-base';

describe('Accordion', () => {
  it('renders default Accordion', () => {
    const screen = render(
      <ZAccordion label='Towels'>
        <Text>Towels</Text>
      </ZAccordion>,
    );
    expect(screen.getAllByText('Towels')).toBeTruthy();
  });
});
