import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import CompletedBooking from './completedBooking';
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, intl }) {
    // const title = 'Completed Bookings';
    const title = intl.formatMessage(messages.manageCompletedTrips);

    //From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }

    // Admin restriction
    if (!restrictUrls('/siteadmin/completed-bookings', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
        title,
        component: (
            <AdminLayout>
                <CompletedBooking />
            </AdminLayout>
        ),
    }
}

export default action;