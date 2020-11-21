import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from 'pages/Home';
import CreatePoint from 'pages/CreatePoint';
import Login from 'pages/Login';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home}  path="/" exact/>
            <Route component={Login} path="/login" />
            <Route component={CreatePoint} path="/create-point" />
        </BrowserRouter>
    )
}

export default Routes;