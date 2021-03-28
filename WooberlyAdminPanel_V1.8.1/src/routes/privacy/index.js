
import React from 'react';
import Layout from '../../components/Layout';
import Page from '../../components/Page';

async function action({ locale }) {
  const data = await new Promise(resolve => {
    require.ensure(
      [],
      require => {
        try {
          resolve(require(`./privacy.${locale}.md`)); // eslint-disable-line import/no-dynamic-require
        } catch (e) {
          resolve(require('./privacy.md'));
        }
      },
      'privacy',
    );
  });

  return {
    title: data.title,
    chunk: 'privacy',
    component: (
      <Layout>
        <Page {...data} />
      </Layout>
    ),
  };
}

export default action;
