
import React from 'react';
import { defineMessages } from 'react-intl';
import Layout from '../../components/Layout/HeadLessLayout';
import Login from './Login';

// const messages = defineMessages({
//   title: {
//     id: 'login.title',
//     description: 'Log in page title',
//     defaultMessage: 'Log In',
//   },
// });

function action({ intl, store }) {
  //const title = intl.formatMessage(messages.title);
  const title = 'Log In';

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

  if (isAdminAuthenticated) {
    return { redirect: '/siteadmin' };
  }

  return {
    chunks: ['login'],
    title,
    component: (
      <Layout>
        <Login title={title} />
      </Layout>
    ),
  };
}

export default action;
