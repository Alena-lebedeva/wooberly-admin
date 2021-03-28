
import React from 'react';
import Users from './Users';
import Siteadmin from '../Siteadmin';

const title = 'Users';

function action() {
  return {
    chunks: ['users'],
    title,
    component: <Siteadmin>  <Users title={title} /></Siteadmin>,
   
  };
}

export default action;
