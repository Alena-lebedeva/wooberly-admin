import React from 'react';
import AdminLayout from '../../../../components/Layout/AdminLayout';
import AddPromoCode from './AddPromoCode';
import messages from '../../../../locale/messages';
import { restrictUrls } from '../../../../helpers/adminPrivileges';

function action({ store, intl }) {
  const title = intl.formatMessage(messages.addPromoCode);

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

  if (!isAdminAuthenticated) {
    return { redirect: '/login' };
  }

  // Admin restriction
  if (!restrictUrls('/siteadmin/promo-code/list', adminPrivileges)) {
    return { redirect: '/siteadmin' };
  }

  return {
    title,
    component: (
      <AdminLayout>
        <AddPromoCode title={title} />
      </AdminLayout>
    ),
  };
}

export default action;
