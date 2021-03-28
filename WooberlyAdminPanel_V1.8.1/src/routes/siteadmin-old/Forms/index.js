
import React from 'react';
import FormsAdmin from './Forms';
import Siteadmin from '../Siteadmin';

const title = 'Forms';

function action() {
  return {
    chunks: ['forms'],
    title,
    component: <Siteadmin>  <FormsAdmin title={title} /></Siteadmin>,
   
  };
}

export default action;
