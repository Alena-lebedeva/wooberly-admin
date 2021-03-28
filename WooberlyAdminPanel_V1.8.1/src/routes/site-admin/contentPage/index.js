import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout'
import ContentPage from './ContentPage'
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, intl }) {
    // const title =  'Content Management'
    const title = intl.formatMessage(messages.contentpageManagement);

    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/contentpage/manage', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
        title,
        component: (
            <AdminLayout>
                <ContentPage />
            </AdminLayout>
        )
    }
}

export default action;