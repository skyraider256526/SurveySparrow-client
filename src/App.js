import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  CssBaseline,
  Container,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core';

import useStyles from './app.styles';

import { Counter } from './features/counter/Counter';
import './App.css';

/// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

///Components
import NavBar from './components/NavBar';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#bda377',
      light: '#cab592',
      dark: '#847253',
      contrastText: 'rgba(0, 0, 0, 0.83)',
    },
    secondary: {
      main: '#4066a7',
      light: '#6687b8',
      dark: '#2c4774',
      contrastText: 'rgba(0, 0, 0, 0.83)',
    },
  },
});

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
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
            </Switch>
          </Container>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
