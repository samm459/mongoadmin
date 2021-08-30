import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { Db } from './components/Db';
import './App.global.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Db} />
      </Switch>
    </Router>
  );
}
