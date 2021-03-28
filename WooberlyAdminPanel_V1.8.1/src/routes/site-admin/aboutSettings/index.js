import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import AboutSettings from './AboutSettings';
import { getIntl } from '../../../actions/intl';
import messages from '../../../locale/messages';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, params, intl }) {
    //   const title = "Top Features Section Settings"
    const title = intl.formatMessage(messages.topFeatures);
    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    if (!isAdminAuthenticated) {
        return { redirect: '/login' }
    }
    // Admin restriction
    if (!restrictUrls('/siteadmin/homepage/topfeature', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

    return {
        title,
        component: (
            <AdminLayout>
                <AboutSettings title={title} />
            </AdminLayout>
        )
    }
}

export default action;