import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout'
import StaticPage from './StaticPage'
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, intl }) {
    const title = intl.formatMessage(messages.staticpageManagement);

    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }

        // Admin restriction
        if (!restrictUrls('/siteadmin/staticpage/manage', adminPrivileges)) {
            return { redirect: '/siteadmin' };
        }
    
    return {
        title,
        component: (
            <AdminLayout>
                <StaticPage />
            </AdminLayout>
        )
    }
}

export default action;