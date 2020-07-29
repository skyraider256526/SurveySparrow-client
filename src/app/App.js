import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/// MUI
import {
  CssBaseline,
  Container,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core';

/// Redux
// import { useDispatch } from 'react-redux';

/// Misc
import jwtDecode from 'jwt-decode';
import axios from 'axios';

/// Uitl
import AuthRoute from 'util/authRoute';
import themeFile from 'util/theme';

import './App.css';

/// Pages
import { home, login, signup } from './pages';

///Components
import useStyles from './app.styles';
import NavBar from 'components/NavBar';
import {
  setUnAuthenticated,
  setAuthenticated,
  fetchUserData,
} from 'features/user/userSlice';
import store from './store';

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);

  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(setUnAuthenticated());
    window.location.href = '/login';
  } else {
    store.dispatch(setAuthenticated());
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(fetchUserData());
  }
}
function App() {
  /// MUI
  const classes = useStyles();

  /// Selectors

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Router>
          <NavBar />
          <Container className={classes.container}>
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
            </Switch>
          </Container>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
