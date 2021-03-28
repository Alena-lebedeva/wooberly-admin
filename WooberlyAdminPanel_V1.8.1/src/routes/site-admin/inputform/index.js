import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import InputForm from './InputForm';
import { Form } from 'react-bootstrap';

function action({ store }) {
  const title = 'InputForm';

  // From Redux Store
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;

  if (!isAdminAuthenticated) {
    return { redirect: '/login' };
  }

  return {
    title,
    component: (
      <AdminLayout>
        <InputForm title={title} />
      </AdminLayout>
    ),
  };
}

export default action;
