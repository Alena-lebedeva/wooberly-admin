import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import TableDesign from './TableDesign';

function action({ store }) {
  const title = 'Table';

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

  if (!isAdminAuthenticated) {
    return { redirect: '/login' };
  }

  return {
    title,
    component: (
      <AdminLayout>
        <TableDesign title={title} />
      </AdminLayout>
    ),
  };
}

export default action;
