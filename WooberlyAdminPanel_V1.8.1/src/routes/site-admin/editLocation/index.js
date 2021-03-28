import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import EditLocation from './EditLocation';
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, params, intl }) {
    // const title = 'Edit Location';
    const title = intl.formatMessage(messages.editLocation);

    //From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/location', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    const id = Number(params.id);

    return {
        title,
        component: (
            <AdminLayout>
                <EditLocation id={id} />
            </AdminLayout>
        ),
    }
}

export default action;