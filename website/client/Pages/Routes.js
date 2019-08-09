import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Admin from './Admin';
import Home from './Home';

const Routes = () => (
  <Switch>
    <Route path="/admin" exact component={Admin} />
    <Route path="/" exact component={Home} />
    <Redirect to="/" />
  </Switch>
);

export default Routes;
