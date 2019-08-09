import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Pages/Routes';
import Layout from './Layout';

import './material-kit-react/scss/material-kit-react.scss';

const App = () => (
  <Router>
    <Layout>
      <Routes />
    </Layout>
  </Router>
);

export default App;
