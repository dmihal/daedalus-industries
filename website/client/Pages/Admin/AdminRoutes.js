import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import IsUser from '/client/components/IsUser';
import Users from './Users';

const AdminRoutes = () => (
  <Switch>
    <Route path="/admin/ethereum" component={Ethereum} />
    <Route path="/admin/users" component={Users} />
    <Route path="/admin/wallets" component={Wallets} />
    <Route path="/admin/assets/:id" component={AssetDetails} />
    <Route path="/admin/assets" component={Assets} />
    <Redirect to="/" />
  </Switch>
);

export default AdminRoutes;
