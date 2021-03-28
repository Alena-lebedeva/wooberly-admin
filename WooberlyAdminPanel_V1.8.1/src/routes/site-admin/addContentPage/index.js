import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout'
import AddContentPage from './AddContentPage'
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, intl }) {
    // const title =  'Add Content Details';
    const title = intl.formatMessage(messages.addCategory);

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
                <AddContentPage />
            </AdminLayout>
        )
    }
}

export default action;