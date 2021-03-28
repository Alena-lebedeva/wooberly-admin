import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

async function action({ client, store }) {
  const title = store.getState().siteSettings.data.siteTitle
  const description = store.getState().siteSettings.data.metaDescription;
  
  return {
    title,
    description,
    chunks: ['home'],
    component: (
      <Layout>
        <Home />
      </Layout>
    ),
  };
}

export default action;
