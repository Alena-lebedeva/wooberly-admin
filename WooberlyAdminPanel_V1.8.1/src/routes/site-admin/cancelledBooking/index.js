import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import CancelledBooking from './cancelledBooking';
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, intl }) {
    // const title = 'Cancelled Bookings';
    const title = intl.formatMessage(messages.manageCancelledTrips);

    //From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/cancelled-bookings', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }


    return {
        title,
        component: (
            <AdminLayout>
                <CancelledBooking />
            </AdminLayout>
        ),
    }
}

export default action;