import React from 'react';
import PrecautionNotificationPage from './PrecautionNotificationPage';
import AdminLayout from '../../../../components/Layout/AdminLayout';
import messages from '../../../../locale/messages';
import { restrictUrls } from '../../../../helpers/adminPrivileges';

function action({ store, params, intl }) {
    const title = intl.formatMessage(messages.precautionNotification);

    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/precaution-notification', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
        title,
        component: (
            <AdminLayout>
                <PrecautionNotificationPage />
            </AdminLayout>
        )
    }
}

export default action;