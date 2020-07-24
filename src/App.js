import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Counter } from './features/counter/Counter';
import './App.css';

/// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/" component={login} />
          <Route exact path="/" component={signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
