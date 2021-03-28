import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import Booking from './Booking';
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, intl }) {
    // const title = 'Manage Bookings';
    const title = intl.formatMessage(messages.bookingsMenu);

    //From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/bookings', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
        title,
        component: (
            <AdminLayout>
                <Booking />
            </AdminLayout>
        ),
    }
}

export default action;