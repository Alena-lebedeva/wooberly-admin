import React from 'react';
import Rider from './Rider';
import Layout from '../../components/Layout';

async function action({ client, store }) {
  const title = store.getState().siteSettings.data.siteTitle
  const description = store.getState().siteSettings.data.metaDescription;
  
  return {
    title,
    description,
    component: (
      <Layout>
        <Rider />
      </Layout>
    ),
  };
}

export default action;
