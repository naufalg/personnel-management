import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DashboardPage } from './pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' component={DashboardPage} />
      </Switch>
    </Router>
  );
}

export default App;
