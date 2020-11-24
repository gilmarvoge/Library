import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import store from 'store';
import React from 'react';
import { Router } from 'react-router-dom';
import Home from 'pages/Home';

test('render home page', () => {
    const history = createMemoryHistory();

    const component = (
        <Provider store={store}>
            <Router history={history}>
                <Home />
            </Router>
        </Provider>
    );

    render(component)
    expect(screen.getByTestId('home')).toBeInTheDocument();
});

