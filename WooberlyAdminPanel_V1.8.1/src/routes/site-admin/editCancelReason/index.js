import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout'
import EditCancelReason from './EditCancelReason'
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, params, intl }) {
    // const title =  'Edit Cancel Reason'
    const title = intl.formatMessage(messages.editCancelReason);

    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/cancel-reasons', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    const id = Number(params.id);

    return {
        title,
        component: (
            <AdminLayout>
                <EditCancelReason id={id} />
            </AdminLayout>
        )
    }
}

export default action;