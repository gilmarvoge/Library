import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomSnackBar from 'components/SnackBar';

test('render alert', () => {
  render(< CustomSnackBar open={true} type='error' message='teste' onClose={() => { }} />)
  expect(screen.getByTestId('alert')).toBeInTheDocument();
});





