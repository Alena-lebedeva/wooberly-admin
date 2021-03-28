import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import Category from './Category';
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, intl }) {
  // const title = 'Manage Categories';
  const title = intl.formatMessage(messages.categoryMenu);
  let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

  if (!isAdminAuthenticated) {
    return { redirect: '/login' };
  }

  // Admin restriction
  if (!restrictUrls('/siteadmin/category', adminPrivileges)) {
    return { redirect: '/siteadmin' };
  }

  return {
    title,
    component: (
      <AdminLayout>
        <Category />
      </AdminLayout>
    ),
  };
}

export default action;
