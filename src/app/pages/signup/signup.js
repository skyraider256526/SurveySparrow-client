import React, { useState, useEffect } from 'react';

/// Router
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

/// Redux
import { useDispatch, useSelector } from 'react-redux';

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
import { selectErrors, clearErrors } from 'features/UI/uiSlice';
import { selectLoading, signupUser } from 'features/user/userSlice';

function SignUp() {
  const [signUpInfo, setSignUpInfo] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  /// Redux
  const dispatch = useDispatch();
  /// Router
  const history = useHistory();

  /// MUI
  const classes = makeStyles(theme => ({ ...theme.spreadThis }))();

  /// Selectors
  const isLoading = useSelector(selectLoading);
  const errors = useSelector(selectErrors);

  ///User functions
  const handleChange = event => {
    const input = event.target;
    setSignUpInfo(prevState => ({
      ...prevState,
      [input.name]: input.value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    //to clear any previous error
    const newUserData = signUpInfo;
    dispatch(signupUser({ newUserData, history }));
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
        <Typography variant="h4">SignUp</Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="username"
            helperText={errors.username}
            error={errors.username ? true : false}
            label="Username"
            name="username"
            type="text"
            value={signUpInfo.username}
            onChange={handleChange}
            fullWidth
            className={classes.TextField}
          />
          <TextField
            id="email"
            helperText={errors.email}
            error={errors.email ? true : false}
            label="Email"
            name="email"
            type="email"
            value={signUpInfo.email}
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
            value={signUpInfo.password}
            onChange={handleChange}
            fullWidth
            className={classes.TextField}
          />
          <TextField
            id="confirmPassword"
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            label="Re-enter Password"
            name="confirmPassword"
            type="password"
            value={signUpInfo.confirmPassword}
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
            SignUp
            {isLoading === 'pending' && (
              <CircularProgress className={classes.progress} />
            )}
          </Button>
          <div className={classes.signUpRequest}>
            Already have an account ?{' '}
            <Link component={RouterLink} to="/login" color="secondary">
              LogIn
            </Link>
          </div>
        </form>
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  );
}

export default SignUp;
