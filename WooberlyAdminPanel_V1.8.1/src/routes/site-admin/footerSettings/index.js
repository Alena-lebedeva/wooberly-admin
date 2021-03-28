import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import FooterSettings from './FooterSettings';
import { restrictUrls } from '../../../helpers/adminPrivileges';

function action({ store, params }) {
  const title = "Footer Section"
  
   // From Redux Store
   let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
   let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

   if (!isAdminAuthenticated) {
       return { redirect: '/login' }
   }

       // Admin restriction
       if (!restrictUrls('/siteadmin/homepage/footer', adminPrivileges)) {
        return { redirect: '/siteadmin' };
    }

   return {
       title,
       component: (
           <AdminLayout>
               <FooterSettings title={title} />
           </AdminLayout>
       )
   }
}

export default action;