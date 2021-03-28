import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import Drivers from './Drivers';
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, intl }) {
  // const title = 'Manage Drivers';
  const title = intl.formatMessage(messages.driverMenu);
  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

  if (!isAdminAuthenticated) {
    return { redirect: '/site-admin/drivers' };
  }

  // Admin restriction
  if (!restrictUrls('/siteadmin/drivers', adminPrivileges)) {  
    return { redirect: '/siteadmin' };
  }

  return {
    title,
    component: (
      <AdminLayout>
        <Drivers />
      </AdminLayout>
    ),
  };
}

export default action;
