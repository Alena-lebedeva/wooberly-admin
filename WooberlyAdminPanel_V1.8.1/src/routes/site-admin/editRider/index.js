import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout'
import EditRider from './EditRider';
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, params, intl }) {
    // const title = "Edit Rider"
    const title = intl.formatMessage(messages.editRider);

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/riders', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    const id = Number(params.id);
    return {
        title,
        component: (
            <AdminLayout>
                <EditRider title={title} id={id} ></EditRider>
            </AdminLayout>
        )
    }
}

export default action;
