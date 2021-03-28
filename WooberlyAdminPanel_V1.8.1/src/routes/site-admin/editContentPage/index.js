import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout'
import EditContentPage from './EditContentPage'
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, params, intl }) {
    // const title =  'Edit Content Details';
    const title = intl.formatMessage(messages.contentpageManagement);

    let id = Number(params.pageId)
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
                <EditContentPage id={id} />
            </AdminLayout>
        )
    }
}

export default action;