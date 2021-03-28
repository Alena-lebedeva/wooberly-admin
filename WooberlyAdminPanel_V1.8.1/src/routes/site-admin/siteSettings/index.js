import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout'
import SiteSettings from './SiteSettings'
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

async function action({ store, intl }) {
    // const title = 'Site Settings';  
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }
    // Admin restriction
    if (!restrictUrls('/siteadmin/settings/site', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    const title = intl.formatMessage(messages.siteSettings);
    return {
        title,
        component: (
            <AdminLayout>
                <SiteSettings />
            </AdminLayout>
        )
    }
}

export default action