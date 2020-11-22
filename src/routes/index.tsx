import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter, Switch, Redirect, RouteProps } from 'react-router-dom';
import { isAuthenticated } from 'services/auth';
import Home from 'pages/Home';
//import CreatePoint from 'pages/CreatePoint';
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';

interface PrivateRouteProps extends Omit<RouteProps, 'component'> {
  component: React.ElementType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => (
  <Route
    {...rest} 
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
    }
  />
);

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path='/' component={Home} />       
        {/* <PrivateRoute path='/app' component={CreatePoint} /> */}
        <Route path='/login' component={Login} />
        <Route path='*' component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;