import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

// Query
import news from './queries/news';
import intl from './queries/intl';
import adminUserLogin from './queries/siteadmin/adminUserLogin';
import adminUserLogout from './queries/siteadmin/adminUserLogout'
import getAllRiders from './queries/siteadmin/getAllRiders';
import getAllDrivers from './queries/siteadmin/getAllDrivers';
import getAllCategory from './queries/siteadmin/getAllCategory';
import getAllVehicles from './queries/siteadmin/getAllVehicles';
import getAllBookings from './queries/siteadmin/getAllBookings';
import viewBookingDetails from './queries/siteadmin/viewBookingDetails';
import getCurrencies from './queries/currency/getCurrencies';
import getCurrencyRates from './queries/currency/getCurrencyRates';
import getRider from './queries/siteadmin/getRider';
import getDriver from './queries/siteadmin/getDriver';
import getCategory from './queries/siteadmin/getCategory';
import getVehicle from './queries/siteadmin/getVehicle';
import getCategories from './queries/siteadmin/getCategories';
import getCountries from './queries/siteadmin/getCountries';
import getDashboardCount from './queries/siteadmin/getDashboardCount'
import getActiveCategories from './queries/siteadmin/getActiveCategories'
import getPromoCodes from './queries/siteadmin/PromoCode/getPromoCodes';
import getPromoCode from './queries/siteadmin/PromoCode/getPromoCode';
import getSiteSettings from './queries/siteadmin/getSiteSettings';
import getCompletedBookings from './queries/siteadmin/getCompletedBookings';
import getCancelledBookings from './queries/siteadmin/getCancelledBookings';
import getCurrency from './queries/siteadmin/getCurrency';
import getBaseCurrency from './queries/siteadmin/getBaseCurrency';
import getCancelReasons from './queries/siteadmin/getCancelReasons';
import getReviews from './queries/siteadmin/getReviews';
import getAllCancelReason from './queries/siteadmin/getAllCancelReason';
import getCancelReason from './queries/siteadmin/getCancelReason';
import getPayoutList from './queries/siteadmin/AutoPayout/getPayoutList';
import getAllHomePageSettings from './queries/siteadmin/getAllHomePageSettings';
import getFailedPayoutList from './queries/siteadmin/AutoPayout/getFailedPayoutList';
import getEditStaticPage from './queries/siteadmin/getEditStaticPage';


// Mutations
import addAdminUser from './mutations/siteadmin/addAdminUser';
import addCategory from './mutations/siteadmin/addCategory'
import updateRider from './mutations/siteadmin/updateRider';
import updateDriver from './mutations/siteadmin/updateDriver';
import updateCategory from './mutations/siteadmin/updateCategory';
import updateVehicle from './mutations/siteadmin/updateVehicle';
import updateCategoryImage from './mutations/siteadmin/updateCategoryImage'
import updateCategoryMarker from './mutations/siteadmin/updateCategoryMarker'
import uploadProfileImage from './mutations/siteadmin/uploadProfileImage'
import uploadLicenceFrontImage from './mutations/siteadmin/uploadLicenceFrontImage'
import uploadLicenceBackImage from './mutations/siteadmin/uploadLicenceBackImage'
import uploadRcbookImage from './mutations/siteadmin/uploadRcbookImage'
import uploadInsuranceImage from './mutations/siteadmin/uploadInsuranceImage'
import deleteUser from './mutations/siteadmin/deleteUser';
import addPromoCode from './mutations/siteadmin/PromoCode/addPromoCode';
import deletePromoCode from './mutations/siteadmin/PromoCode/deletePromoCode';
import updatePromoCode from './mutations/siteadmin/PromoCode/updatePromoCode';
import updateCurrency from './mutations/siteadmin/Currency/updateCurrency';
import setBaseCurrency from './mutations/siteadmin/Currency/setBaseCurrency';
import allowPaymentCurrency from './mutations/siteadmin/Currency/allowPaymentCurrency';
import updateSiteSettings from './mutations/siteadmin/updateSiteSettings';
import changeAdminUser from './mutations/siteadmin/changeAdminUser';
import updateHomePageHome from './mutations/siteadmin/updateHomePageHome';
import updateHomePageCity from './mutations/siteadmin/updateHomePageCity';
import updateHomePageAbout from './mutations/siteadmin/updateHomePageAbout';
import updateHomePageSafety from './mutations/siteadmin/updateHomePageSafety';
import updateHomePageSignup from './mutations/siteadmin/updateHomePageSignup';
import updateHomePageFooter from './mutations/siteadmin/updateHomePageFooter';
import addCancelReason from './mutations/siteadmin/addCancelReason';
import updateCancelReason from './mutations/siteadmin/updateCancelReason';
import removeCancelReason from './mutations/siteadmin/removeCancelReason';
import siteSettings from './mutations/siteadmin/siteSettings';
import addLocation from './mutations/siteadmin/ManageLocation/addLocation';
import getLocationList from './queries/siteadmin/getLocationList';
import getLocation from './queries/siteadmin/getLocation';
import updateLocation from './mutations/siteadmin/ManageLocation/updateLocation';
import updatePayout from './mutations/siteadmin/AutoPayout/updatePayout';
import deleteLocation from './mutations/siteadmin/ManageLocation/deleteLocation';
import updateStaticPage from './mutations/siteadmin/updateStaticPage';
import updateCategoryStatus from './mutations/siteadmin/updateCategoryStatus';
import deleteCategory from './mutations/siteadmin/deleteCategory';

// Location
import getAllLocation from './queries/siteadmin/Location/getAllLocation';

// Category
import getOverallCategory from './queries/siteadmin/Category/getOverallCategory';

// Fare
import addUpdatePricing from './mutations/siteadmin/Pricing/addUpdatePricing';
import getPricing from './queries/siteadmin/Pricing/getPricing';
import getAllPricing from './queries/siteadmin/Pricing/getAllPricing';
import deletePricing from './mutations/siteadmin/Pricing/deletePricing';
import updatePricingStatus from './mutations/siteadmin/Pricing/updatePricingStatus';

//ContentPage
import updateContentPageDetails from './mutations/siteadmin/ContentPage/updateContentPageDetails';
import addContentPageDetails from './mutations/siteadmin/ContentPage/addContentPageDetails';
import getContentPageDetails from './queries/siteadmin/getContentPageDetails';
import getContentPage from './queries/siteadmin/getContentPage';
import editContentPage from './queries/siteadmin/editContentPage';
import deleteContentPage from './mutations/siteadmin/ContentPage/deleteContentPage';
import updateContentPageStatus from './mutations/siteadmin/ContentPage/updateContentPageStatus';
//TempImages
import updateTempImages from './mutations/siteadmin/TempImages/updateTempImages';

//Payout
import updateCashPayout from './mutations/siteadmin/AutoPayout/updateCashPayout';

// Admin Roles
import createAdminRole from './mutations/siteadmin/AdminRoles/createAdminRole';
import getAllAdminRoles from './queries/siteadmin/AdminRoles/getAllAdminRoles';
import deleteAdminRole from './mutations/siteadmin/AdminRoles/deleteAdminRole';

// Admin Users
import getAllAdminUsers from './queries/siteadmin/AdminUser/getAllAdminUsers';
import createAdminUser from './mutations/siteadmin/AdminUser/createAdminUser';
import deleteAdminUser from './mutations/siteadmin/AdminUser/deleteAdminUser';
import getAdminUser from './queries/siteadmin/AdminUser/getAdminUser';
import getAdminUserExists from './queries/siteadmin/getAdminUserExists';

//Precaution Notification
import updatePrecautionNotification from './mutations/siteadmin/PrecautionNotification/updatePrecautionNotification';
import getAllPrecautionNotification from './queries/siteadmin/PrecautionNotification/getAllPrecautionNotification';
import updatePrecautionNotificationImage from './mutations/siteadmin/PrecautionNotification/updatePrecautionNotificationImage';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      news,
      intl,
      adminUserLogin,
      adminUserLogout,
      getAllRiders,
      getAllDrivers,
      getAllCategory,
      getAllVehicles,
      getAllBookings,
      viewBookingDetails,
      getCurrencies,
      getCurrencyRates,
      getRider,
      getDriver,
      getCategory,
      getVehicle,
      getCategories,
      getCountries,
      getDashboardCount,
      getActiveCategories,
      getPromoCodes,
      getPromoCode,
      getCompletedBookings,
      getCancelledBookings,
      getCurrency,
      getBaseCurrency,
      getSiteSettings,
      getCancelReasons,
      getReviews,
      getAllCancelReason,
      getCancelReason,
      getLocationList,
      getLocation,
      getPayoutList,
      getAllHomePageSettings,
      getFailedPayoutList,
      getEditStaticPage,
      getPricing,
      getAllPricing,
      getAllLocation,
      getOverallCategory,
      getContentPageDetails,
      getContentPage,
      editContentPage,
      getAllAdminRoles,
      getAllAdminUsers,
      getAdminUser,
      getAdminUserExists,
      getAllPrecautionNotification
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      addAdminUser,
      addCategory,
      updateRider,
      updateDriver,
      updateCategory,
      updateVehicle,
      updateCategoryImage,
      updateCategoryMarker,
      deleteUser,
      uploadProfileImage,
      uploadLicenceFrontImage,
      uploadLicenceBackImage,
      uploadRcbookImage,
      uploadInsuranceImage,
      deleteUser,
      addPromoCode,
      deletePromoCode,
      updatePromoCode,
      updateSiteSettings,
      changeAdminUser,
      updateCurrency,
      setBaseCurrency,
      allowPaymentCurrency,
      updateSiteSettings,
      updateHomePageHome,
      updateHomePageCity,
      updateHomePageAbout,
      updateHomePageSafety,
      updateHomePageSignup,
      updateHomePageFooter,
      addCancelReason,
      updateCancelReason,
      removeCancelReason,
      siteSettings,
      addLocation,
      updateLocation,
      updatePayout,
      deleteLocation,
      updateStaticPage,
      addUpdatePricing,
      deletePricing,
      updateCategoryStatus,
      deleteCategory,
      updatePricingStatus,
      updateContentPageDetails,
      addContentPageDetails,
      deleteContentPage,
      updateContentPageStatus,
      updateTempImages,
      updateCashPayout,
      createAdminRole,
      deleteAdminRole,
      createAdminUser,
      deleteAdminUser,
      updatePrecautionNotification,
      updatePrecautionNotificationImage
    }
  })
});

export default schema;