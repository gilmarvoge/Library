import React from 'react';
import { Route, BrowserRouter, Switch, Redirect, RouteProps } from 'react-router-dom';
import { isAuthenticated } from 'services/auth';
import Home from 'pages/Home';
import Login from 'pages/Login';
import CreateEditBook from 'pages/CreateBook';
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
        <PrivateRoute exact path='/create-edit' component={Home} />
        <PrivateRoute exact path='/edit/:bookId' component={CreateEditBook} />
        <PrivateRoute exact path="/create" component={CreateEditBook} />   
        <Route path='/login' component={Login} />
        <Route path='*' component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;