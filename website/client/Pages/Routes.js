import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Admin from './Admin';
import Home from './Home';
import Messenger from './Messenger';
import Events from './Events';

const Routes = () => (
  <Switch>
    <Route path="/admin" exact component={Admin} />
    <Route path="/messenger" component={Messenger} />
    <Route path="/" exact component={Home} />
    <Route path="/events" exact component={Events} />
    <Redirect to="/" />
  </Switch>
);

export default Routes;
