
import React from 'react';
import Dashboard from './Dashboard';
import Siteadmin from '../Siteadmin';

const title = 'Dashboard';

function action() {
  return {
    chunks: ['dashboard'],
    title,
    component: <Siteadmin>  <Dashboard title={title} /></Siteadmin>,
   
  };
}

export default action;
