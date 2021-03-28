import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import FailedPayout from './FailedPayout';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store }) {
    const title = 'Failed Payouts';

    //From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/failed-payout/', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
        title,
        component: (
            <AdminLayout>
                <FailedPayout />
            </AdminLayout>
        ),
    }
}

export default action;