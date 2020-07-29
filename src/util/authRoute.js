import React from 'react';
import { Route, Redirect } from 'react-router-dom';

///Redux
import { useSelector } from 'react-redux';

export default function AuthRoute({
  component: Component,
  AuthRoute,
  ...rest
}) {
  const authenticated = useSelector(state => state.user.authenticated);
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}
