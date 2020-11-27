import React from 'react';
import { render, screen } from '@testing-library/react';
import { SnackBar } from 'components';

test('render alert', () => {
  render(<SnackBar open={true} type='error' message='teste' onClose={() => { }} />)
  expect(screen.getByTestId('alert')).toBeInTheDocument();
});





