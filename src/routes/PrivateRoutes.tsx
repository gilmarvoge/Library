
import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { isAuthenticated } from 'services';

interface PrivateRouteProps extends Omit<RouteProps, 'component'> {
    component: React.ElementType;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => (
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
