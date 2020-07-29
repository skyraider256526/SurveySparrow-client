import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, AppBar, Toolbar } from '@material-ui/core';

/// Redux
import { useSelector, useDispatch } from 'react-redux';

/// User components
import { logoutUser } from 'features/user/userSlice';

export default function NavBar() {
  const authenticated = useSelector(state => state.user.authenticated);

  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(logoutUser());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={RouterLink} to="/">
          Home
        </Button>
        {authenticated ? (
          <Button
            color="inherit"
            onClick={handleOnClick}
            component={RouterLink}
            to="/"
          >
            Log Out
          </Button>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
            <Button color="inherit" component={RouterLink} to="/signup">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
