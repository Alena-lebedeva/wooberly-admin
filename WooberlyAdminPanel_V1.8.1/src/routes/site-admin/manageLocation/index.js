import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import ManageLocation from './ManageLocation';
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, intl }) {
    const title = intl.formatMessage(messages.addLocation);

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

    return {
        title,
        component: (
            <AdminLayout>
                <ManageLocation />
            </AdminLayout>
        ),
    }
}

export default action;