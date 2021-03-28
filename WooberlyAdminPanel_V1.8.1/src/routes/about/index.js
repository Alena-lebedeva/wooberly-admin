
import React from 'react';
import Layout from '../../components/Layout';
import Page from '../../components/Page';

async function action({ locale }) {
  const data = await new Promise(resolve => {
    require.ensure(
      [],
      require => {
        try {
          resolve(require(`./about.${locale}.md`)); // eslint-disable-line import/no-dynamic-require
        } catch (e) {
          resolve(require('./about.md'));
        }
      },
      'about',
    );
  });

  return {
    chunks: ['about'],
    title: data.title,
    component: (
      <Layout>
        <Page {...data} />
      </Layout>
    ),
  };
}

export default action;
