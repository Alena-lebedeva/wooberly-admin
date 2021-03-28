
/* eslint-disable global-require */

// The top-level (parent) route
const routes = {
  path: '',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '/',
      load: () => import(/* webpackChunkName: 'home' */ './home'),
    },
    {
      path: '/contact',
      load: () => import(/* webpackChunkName: 'contact' */ './contact'),
    },
    {
      path: '/about',
      load: () => import(/* webpackChunkName: 'about' */ './about'),
    },
    {
      path: '/privacy',
      load: () => import(/* webpackChunkName: 'privacy' */ './privacy'),
    },
    {
      path: '/login',
      load: () => import(/* webpackChunkName: 'login' */ './login'),
    },
    {
      path: '/siteadmin',
      load: () => import(/* webpackChunkName: 'dashboard' */ './site-admin/dashboard'),
    },
    {
      path: '/inputform',
      load: () => import(/* webpackChunkName: 'dashboard1' */ './site-admin/inputform'),
    },
    {
      path: '/table',
      load: () => import(/* webpackChunkName: 'dashboard2' */ './site-admin/table'),
    },

    {
      path: '/siteadmin/riders',
      load: () => import(/* webpackChunkName: 'dashboard3' */ './site-admin/riders'),
    },
    {
      path: '/siteadmin/drivers',
      load: () => import(/* webpackChunkName: 'dashboard4' */ './site-admin/drivers'),
    },
    {
      path: '/siteadmin/category',
      load: () => import(/* webpackChunkName: 'dashboard5' */ './site-admin/category'),
    },
    {
      path: '/siteadmin/vehicles',
      load: () => import(/* webpackChunkName: 'dashboard6' */ './site-admin/vehicles'),
    },
    {
      path: '/siteadmin/bookings',
      load: () => import(/* webpackChunkName: 'dashboard7' */ './site-admin/booking')
    },
    {
      path: '/siteadmin/category/add',
      load: () => import(/* webpackChunkName: 'dashboard8' */ './site-admin/addCategory')
    },
    {
      path: '/siteadmin/:from/view/:id',
      load: () => import(/* webpackChunkName: 'dashboard9' */ './site-admin/viewBooking')
    },
    {
      path: '/siteadmin/riders/:id',
      load: () => import(/* webpackChunkName: 'dashboard10' */ './site-admin/editRider')
    },
    {
      path: '/siteadmin/drivers/:id',
      load: () => import(/* webpackChunkName: 'dashboard11' */ './site-admin/editDriver')
    },
    {
      path: '/siteadmin/category/edit/:id',
      load: () => import(/* webpackChunkName: 'dashboard12' */ './site-admin/editCategory')
    },
    {
      path: '/siteadmin/vehicles/:id',
      load: () => import(/* webpackChunkName: 'dashboard13' */ './site-admin/editVehicle')
    },
    {
      path: '/siteadmin/promo-code/list',
      load: () => import(/* webpackChunkName: 'dashboard14' */ './site-admin/promoCode/promoCodeList')
    },
    {
      path: '/siteadmin/promo-code/add',
      load: () => import(/* webpackChunkName: 'dashboard15' */ './site-admin/promoCode/addPromoCode')
    },
    {
      path: '/siteadmin/promo-code/edit/:id',
      load: () => import(/* webpackChunkName: 'dashboard16' */ './site-admin/promoCode/editPromoCode')
    },
    {
      path: '/siteadmin/completed-bookings',
      load: () => import(/* webpackChunkName: 'dashboard17' */ './site-admin/completedBooking')
    },
    {
      path: '/siteadmin/cancelled-bookings',
      load: () => import(/* webpackChunkName: 'dashboard18' */ './site-admin/cancelledBooking')
    },
    {
      path: '/siteadmin/currency',
      load: () => import(/* webpackChunkName: 'dashboard19' */ './site-admin/currency')
    },
    {
      path: '/siteadmin/settings/site',
      load: () => import(/* webpackChunkName: 'dashboard20' */ './site-admin/siteSettings')
    },
    {
      path: '/siteadmin/change/admin',
      load: () => import(/* webpackChunkName: 'dashboard21' */ './site-admin/changeAdmin')
    },
    {
      path: '/siteadmin/notifications',
      load: () => import(/* webpackChunkName: 'dashboard22' */ './site-admin/manageNotifications')
    },
    {
      path: '/siteadmin/cancel-reasons',
      load: () => import(/* webpackChunkName: 'dashboard23' */ './site-admin/manageCancelReasons')
    },
    {
      path: '/siteadmin/ratings',
      load: () => import(/* webpackChunkName: 'dashboard24' */ './site-admin/ratings')
    },
    {
      path: '/siteadmin/cancel-reasons/add',
      load: () => import(/* webpackChunkName: 'dashboard25' */ './site-admin/addCancelReason')
    },
    {
      path: '/siteadmin/cancel-reasons/edit/:id',
      load: () => import(/* webpackChunkName: 'dashboard26' */ './site-admin/editCancelReason')
    },
    {
      path: '/siteadmin/manage-location',
      load: () => import(/* webpackChunkName: 'dashboard27' */ './site-admin/manageLocation')
    },
    {
      path: '/siteadmin/location',
      load: () => import(/* webpackChunkName: 'dashboard28' */ './site-admin/manageLocationList')
    },
    {
      path: '/siteadmin/edit-location/:id',
      load: () => import(/* webpackChunkName: 'dashboard29' */ './site-admin/editLocation')
    },
    {
      path: '/siteadmin/homepage/banner',
      load: () => import(/* webpackChunkName: 'dashboard30' */ './site-admin/homeSettings')
    },
    {
      path: '/siteadmin/homepage/topfeature',
      load: () => import(/* webpackChunkName: 'dashboard31' */ './site-admin/aboutSettings')
    },
    {
      path: '/siteadmin/homepage/category',
      load: () => import(/* webpackChunkName: 'dashboard32' */ './site-admin/citySettings')
    },
    {
      path: '/siteadmin/homepage/rider',
      load: () => import(/* webpackChunkName: 'dashboard33' */ './site-admin/safetySettings')
    },
    {
      path: '/siteadmin/homepage/driver',
      load: () => import(/* webpackChunkName: 'dashboard34' */ './site-admin/signupSettings')
    },
    {
      path: '/siteadmin/homepage/footer',
      load: () => import(/* webpackChunkName: 'dashboard35' */ './site-admin/footerSettings')
    },
    {
      path: '/siteadmin/payout',
      load: () => import(/* webpackChunkName: 'dashboard36' */ './site-admin/autoPayout')
    },
    {
      path: '/siteadmin/failed-payout',
      load: () => import(/* webpackChunkName: 'dashboard37' */ './site-admin/failedPayout')
    },
    {
      path: '/siteadmin/staticpage/manage',
      load: () => import(/* webpackChunkName: 'dashboard38' */ './site-admin/staticPage')
    },
    {
      path: '/siteadmin/contentpage/manage',
      load: () => import(/* webpackChunkName: 'dashboard39' */ './site-admin/contentPage')
    },
    {
      path: '/siteadmin/contentpage/add',
      load: () => import(/* webpackChunkName: 'dashboard39' */ './site-admin/addContentPage')
    },
    {
      path: '/siteadmin/contentpage/edit/:pageId',
      load: () => import(/* webpackChunkName: 'dashboard39' */ './site-admin/editContentPage')
    },
    {
      path: '/support',
      load: () => import(/* webpackChunkName: 'dashboard40' */ './static/support')
    },
    {
      path: '/driver/privacy-policy',
      load: () => import(/* webpackChunkName: 'privacy' */ './static/driverPrivacyPolicy')
    },
    {
      path: '/siteadmin/staticpage/edit/:pageId',
      load: () => import(/* webpackChunkName: 'dashboard41' */ './site-admin/editStaticPage')
    },
    {
      path: '/rider',
      load: () => import(/* webpackChunkName: 'privacy' */ './static/rider'),
    },
    {
      path: '/driver',
      load: () => import(/* webpackChunkName: 'privacy' */ './static/driver'),
    },
    {
      path: '/siteadmin/pricing/list',
      load: () => import(/* webpackChunkName: 'pricing' */ './site-admin/pricing/pricingList'),
    },
    {
      path: '/siteadmin/pricing/add',
      load: () => import(/* webpackChunkName: 'pricing' */ './site-admin/pricing/addPricing')
    },
    {
      path: '/siteadmin/pricing/edit/:id',
      load: () => import(/* webpackChunkName: 'pricing' */ './site-admin/pricing/editPricing')
    },
    {
      path: '/siteadmin/admin-roles',
      load: () => import(/* webpackChunkName: 'dashboard39' */ './site-admin/adminRoles')
    },
    {
      path: '/siteadmin/admin-users',
      load: () => import(/* webpackChunkName: 'dashboard39' */ './site-admin/adminUser')
    },
    {
      path: '/siteadmin/precaution-notification',
      load: () => import('./site-admin/precautionNotification/updatePrecautionNotification')
    },
    {
      path: '/siteadmin/schedule-bookings',
      load: () => import(/* webpackChunkName: 'dashboard7' */ './site-admin/scheduleBooking')
    },
    {
      path: '/page/:pageUrl',
      load: () => import(/* webpackChunkName: 'dashboard39' */ './page')
    },
    // {
    //   path: '/siteadmin/adminRoles',
    //   load: () => import(/* webpackChunkName: 'dashboard39' */ './page')
    // },

    // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
    {
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
    },
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'}`;
    route.description = route.description || '';

    return route;
  },
};

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  });
}

export default routes;
