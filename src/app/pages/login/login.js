import React, { useState, useEffect } from 'react';

/// Router
import { Link as RouterLink, useHistory } from 'react-router-dom';

/// Redux
import { useSelector, useDispatch } from 'react-redux';

/// MUI
import {
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircleSharp';

/// Axios

/// User components
import { loginUser, selectLoading } from 'features/user/userSlice';
import { selectErrors, clearErrors } from 'features/UI/uiSlice';

/// Driver function
function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  /// Redux
  const dispatch = useDispatch();
  const history = useHistory();

  /// MUI
  const classes = makeStyles(theme => ({ ...theme.spreadThis }))();

  /// Selectors
  const isLoading = useSelector(selectLoading);
  const errors = useSelector(selectErrors);

  /// User functions
  const handleChange = event => {
    const input = event.target;
    setLoginInfo(prevState => ({
      ...prevState,
      [input.name]: input.value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const userData = loginInfo;
    dispatch(loginUser({ userData, history }));
    setLoginInfo({ email: '', password: '' });
  };

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  return (
    <Grid container className={classes.form}>
      <Grid item sm></Grid>
      <Grid item sm>
        <AccountCircleIcon color="primary" className={classes.accountLogo} />
        <Typography variant="h4">Login</Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            helperText={errors.email}
            error={errors.email ? true : false}
            label="Email"
            name="email"
            type="email"
            value={loginInfo.email}
            onChange={handleChange}
            fullWidth
            className={classes.TextField}
          />
          <TextField
            id="password"
            helperText={errors.password}
            error={errors.password ? true : false}
            label="Password"
            name="password"
            type="password"
            value={loginInfo.password}
            onChange={handleChange}
            fullWidth
            className={classes.TextField}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            className={classes.submitButton}
            disabled={isLoading === 'pending'}
          >
            Login
            {isLoading === 'pending' && (
              <CircularProgress className={classes.progress} />
            )}
          </Button>
          <div className={classes.signUpRequest}>
            Don't have an account ? &nbsp;
            <Link component={RouterLink} to="/signup" color="secondary">
              SignUp
            </Link>
          </div>
        </form>
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  );
}

export default Login;
