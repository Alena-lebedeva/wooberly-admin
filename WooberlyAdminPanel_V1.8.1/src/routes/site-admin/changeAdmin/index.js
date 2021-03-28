import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import ChangeAdmin from './ChangeAdmin';
import messages from '../../../locale/messages';

function action({ store, intl }) {
  // const title = 'Change Admin Email/Password';
  const title = intl.formatMessage(messages.changeAdminPassword);

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

  if (!isAdminAuthenticated) {
    return { redirect: '/login' };
  }

  return {
    title,
    component: (
      <AdminLayout>
        <ChangeAdmin />
      </AdminLayout>
    ),
  };
}

export default action;
