import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function UnAuthRoute({
  component: Component,
  authenticated,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === false ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}
