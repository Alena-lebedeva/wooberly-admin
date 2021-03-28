import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import EditVehicle from './EditVehicle';
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, params, intl }) {
    const title = intl.formatMessage(messages.editVehicle);

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/vehicles', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    const id = Number(params.id);
    return {
        title,
        component: (
            <AdminLayout>
                <EditVehicle title={title} id={id} />
            </AdminLayout>
        )
    }
}

export default action;