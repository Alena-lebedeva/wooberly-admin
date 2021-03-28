
import React from 'react';
import Siteadmin from './Siteadmin';

const title = 'Admin Panel';

function action() {
  return {
    chunks: ['siteadmin'],
    title,
    component: (
    <div>
        <Siteadmin title={title} />
      </div>
    ),
  };
}

export default action;
