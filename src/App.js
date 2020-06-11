import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './Home';
import Embed from './Embed';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/embed" component={Embed} />
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
