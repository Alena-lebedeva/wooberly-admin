import React from 'react';
import Driver from './Driver';
import Layout from '../../components/Layout';

async function action({ client, store }) {
  const title = store.getState().siteSettings.data.siteTitle
  const description = store.getState().siteSettings.data.metaDescription;
  
  return {
    title,
    description,
    component: (
      <Layout>
        <Driver />
      </Layout>
    ),
  };
}

export default action;
