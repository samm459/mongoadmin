import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import './App.global.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Dashboard} />
      </Switch>
    </Router>
  );
}
