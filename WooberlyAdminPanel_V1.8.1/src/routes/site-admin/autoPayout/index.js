import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import AutoPayout from './AutoPayout';
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, intl }) {
    // const title = 'Manage Driver Payouts';
    const title = intl.formatMessage(messages.driverPayout);

    //From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/payout', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
        title,
        component: (
            <AdminLayout>
                <AutoPayout />
            </AdminLayout>
        ),
    }
}

export default action;