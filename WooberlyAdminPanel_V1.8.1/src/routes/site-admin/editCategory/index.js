import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import EditCategory from './EditCategory';
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, params, intl }) {
    //   const title = "Edit Category"
    const title = intl.formatMessage(messages.editCategory);

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }

    const id = Number(params.id);

    // Admin restriction
    if (!restrictUrls('/siteadmin/category', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
        title,
        component: (
            <AdminLayout>
                <EditCategory title={title} id={id} />
            </AdminLayout>
        )
    }
}

export default action;