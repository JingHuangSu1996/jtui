import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './';

test('renders Button component', () => {
  render(<Button>hello button</Button>);
  // Add your test assertions here
});
