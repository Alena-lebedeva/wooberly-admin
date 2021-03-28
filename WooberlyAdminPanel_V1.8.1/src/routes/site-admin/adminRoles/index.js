import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import AdminRoles from './AdminRoles';
import messages from '../../../locale/messages';

function action({ store, intl }) {
  // const title =  'Manage Admin Roles'
  const title = intl.formatMessage(messages.manageAdminRoles);

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
      <AdminLayout><AdminRoles /></AdminLayout>
    )
  }
}

export default action;
