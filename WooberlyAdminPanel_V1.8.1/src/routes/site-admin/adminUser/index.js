import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import AdminUser from './AdminUser';
import messages from '../../../locale/messages';

function action({ store, intl }) {
  // const title =  'Manage Admin Users'
  const title = intl.formatMessage(messages.manageAdminUsers);

  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  let isSuperAdmin = store.getState().runtime.isSuperAdmin;

  if (!isAdminAuthenticated) {
    return { redirect: '/login' }
  }

  if (!isSuperAdmin) {
    return { redirect: '/siteadmin' }
  }

  return {
    title,
    component: (
      <AdminLayout><AdminUser /></AdminLayout>
    )
  }
}

export default action;
