import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoutes';
import Home from 'pages/Home';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import CreateEditBook from 'pages/CreateBook';
import NotFound from 'pages/NotFound';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path='/' component={Home} />
        <PrivateRoute exact path='/edit/:bookId' component={CreateEditBook} />
        <PrivateRoute exact path="/create" component={CreateEditBook} />
        <Route path="/signup" component={SignUp} />
        <Route path='/login' component={Login} />
        <Route path='*' component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;