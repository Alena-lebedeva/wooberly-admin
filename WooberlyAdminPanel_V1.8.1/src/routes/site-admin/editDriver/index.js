import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout'
import EditDriver from './EditDriver';
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, params, intl }) {

    // const title = "Edit Driver"
    const title = intl.formatMessage(messages.editDriver);

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/drivers', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    const id = Number(params.id);
    return {
        title,
        component: (
            <AdminLayout>
                <EditDriver title={title} id={id} ></EditDriver>
            </AdminLayout>
        )
    }
}

export default action;
