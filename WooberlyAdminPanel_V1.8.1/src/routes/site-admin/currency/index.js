import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import Currency from './Currency';
import messages from '../../../locale/messages';

function action({ store, intl }) {
    // const title = 'Currency List';
    const title = intl.formatMessage(messages.currencyList);

    //From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let isSuperAdmin = store.getState().runtime.isSuperAdmin

    if (!isAdminAuthenticated || !isSuperAdmin) {
        return { redirect: '/login' }
    }

    if (!isSuperAdmin) {
        return { redirect: '/siteadmin' }
    }

    return {
        title,
        component: (
            <AdminLayout>
                <Currency />
            </AdminLayout>
        ),
    }
}

export default action;