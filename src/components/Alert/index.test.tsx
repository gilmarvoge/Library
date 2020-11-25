import React from 'react';
import { render, screen } from '@testing-library/react';
import Alert from 'components/Alert';

test('render alert', () => {
    render(<Alert />)
    expect(screen.getByRole('alert')).toBeInTheDocument();
});





