import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import HomeSettings from './HomeSettings';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, params }) {
    const title = "Hompage Banner Section"

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/homepage/banner', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
        title,
        component: (
            <AdminLayout>
                <HomeSettings title={title} />
            </AdminLayout>
        )
    }
}

export default action;