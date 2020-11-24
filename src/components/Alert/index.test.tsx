import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import store from 'store';
import React from 'react';
import { Router } from 'react-router-dom';
import Alert from 'components/Alert';

test('render alert component', () => {  
    render(<Alert />)
    expect( screen.findAllByRole('alert')).toHaveLength(1);
    //expect(screen.getByTestId('home')).toBeInTheDocument();
});

