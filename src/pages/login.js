import React, { useState } from 'react';
import axios from 'axios';

import { Grid, Typography, TextField, Button } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import useStyles from './login.styles';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const classes = useStyles();

  const handleChange = event => {
    const input = event.target;
    setLoginInfo(prevState => ({
      ...prevState,
      [input.name]: input.value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    //to clear any previous error
    setErrors({});
    setIsLoading(true);
    const userData = { ...loginInfo };
    await axios
      .post('/login', userData)
      .then(res => {
        console.log(res.data);
        console.log('success');
        setIsLoading(false);
        history.push('/');
      })
      .catch(error => {
        console.log(error.response.data);
        setErrors(error.response.data);
        setIsLoading(false);
      })
      .finally(setLoginInfo({ email: '', password: '' }));
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm></Grid>
      <Grid item sm>
        <AccountCircleOutlinedIcon
          color="primary"
          className={classes.accountLogo}
        />
        <Typography variant="h4">Login</Typography>
        <form noValidate onSubmit={handleSubmit}>
          {console.log(errors)}
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
          >
            Login
          </Button>
        </form>
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  );
}
