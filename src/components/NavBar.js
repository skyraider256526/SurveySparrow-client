import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, AppBar, Toolbar, Box } from '@material-ui/core';

/// Redux
import { useSelector, useDispatch } from 'react-redux';

/// User components
import { logoutUser } from 'features/user/userSlice';
import useStyles from './NavBar.styles';

export default function NavBar() {
  const authenticated = useSelector(state => state.user.authenticated);

  const classes = useStyles();

  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(logoutUser());
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        {authenticated ? (
          <>
            <Button component={RouterLink} to="/dashboard">
              Dashboard
            </Button>
            <Box ml="auto">
              <Button onClick={handleOnClick} component={RouterLink} to="/">
                Log Out
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Button component={RouterLink} to="/">
              Home
            </Button>
            <Box ml="auto">
              <Button component={RouterLink} to="/login">
                Login
              </Button>
              <Button component={RouterLink} to="/signup">
                Signup
              </Button>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
