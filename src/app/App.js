import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  CssBaseline,
  Container,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core';

import jwtDecode from 'jwt-decode';

import useStyles from './app.styles';

/// Uitl
import AuthRoute from 'util/authRoute';
import themeFile from 'util/theme';

import './App.css';

/// Pages
import { home, login, signup } from './pages';

///Components
import NavBar from 'components/NavBar';

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);

  if (decodedToken.exp * 1000 < Date.now()) {
    authenticated = false;
    window.location.href = '/login';
  } else {
    authenticated = true;
  }
}
function App() {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Router>
          <NavBar />
          <Container className={classes.container}>
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute
                exact
                path="/login"
                component={login}
                authenticated={authenticated}
              />
              <AuthRoute
                exact
                path="/signup"
                component={signup}
                authenticated={authenticated}
              />
            </Switch>
          </Container>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
