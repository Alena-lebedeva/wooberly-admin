import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './SideMenu.css';
import bt from '../../components/commonStyle.css';
import { Nav, Navbar, Collapse, Button } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../locale/messages';
import cx from 'classnames';
import Link from '../Link';
import { adminLogout } from '../../actions/siteadmin/logout';
import { openHeaderModal } from '../../actions/siteadmin/modalActions';
import { connect } from 'react-redux';
import { flowRight as compose } from 'lodash';

//Images
import DashboardIcon from '../../../public/Icons/dashboard.svg';
import SiteSettingIcon from '../../../public/Icons/siteSettings.svg';
import RidersIcon from '../../../public/Icons/rider.svg';
import DriversIcon from '../../../public/Icons/driver.svg';
import CategoriesIcon from '../../../public/Icons/category.svg';
import VehiclesIcon from '../../../public/Icons/vehicles.svg';
import BookingsIcon from '../../../public/Icons/booking.svg';
import PromoCodeIcon from '../../../public/Icons/promo-code.svg';
import CompletedBooking from '../../../public/Icons/completedbookings.svg';
import ChangePasswordIcon from '../../../public/Icons/changePassword.svg';
import CancalBookingIcon from '../../../public/Icons/cancelledBookings.svg';
import ManageCurrencyIcon from '../../../public/Icons/CurrencyManage.svg';
import ManageCancelIcon from '../../../public/Icons/cancelReason.svg';
import RatingIcon from '../../../public/Icons/BookingRatings.svg';
import NotificationIcon from '../../../public/Icons/sendNotifications.svg';
import LogOutIcon from '../../../public/Icons/logout.svg';
import MainSiteIcon from '../../../public/Icons/mainSite.svg';
import HomeSettingIcon from '../../../public/Icons/homePageSettings.svg';
import PayOutManageIcon from '../../../public/Icons/payoutManage.svg';
import PayOutManageFaildIcon from '../../../public/Icons/failedPayout.svg';
import CancelFaildIcon from '../../../public/Icons/cancelPayoutReason.svg';
import staticPageIcon from '../../../public/Icons/staticcontentmanagement.svg';
import ManageLocationIcon from '../../../public/Icons/locate2.svg';
import RightArrowIcon from '../../../public/Icons/right-arrow.png';
import manageFareIcon from '../../../public/Icons/manageFare.svg';
import LanguageIcon from '../../../public/Icons/languageIcon.svg';
import scheduleIcon from '../../../public/Icons/Schedulearide.svg';
import precautionIcon from '../../../public/Icons/precautionnotify.svg';

import history from '../../history'
import { validatePrivilege } from '../../helpers/adminPrivileges';
import { formatLocale } from '../../helpers/formatLocale';

class SideMenu extends React.Component {
  static defaultProps = {
    isSuperAdmin: false,
    privileges: []
  };
  constructor(props) {
    super(props);
    this.state = {
      isOpen: 0,
      location: '',
      homepageSettings: false
    }
    this.openMenu = this.openMenu.bind(this);
    this.openClose = this.openClose.bind(this);
  }
  componentDidMount() {
    this.setState({
      location: history.location.pathname
    })
  }
  componentDidUpdate(prevProps, prevState) {
    const { location } = this.props;
    if (prevState.location !== location) {
      this.setState({
        location
      })
    }
  }
  async openMenu() {
    this.setState({
      isOpen: 1,
    })
  }
  async openClose() {
    this.setState({
      isOpen: 0,
    })
  }
  render() {
    const { location } = this.state;
    const { adminLogout, isSuperAdmin, privileges, currentLocale, openHeaderModal } = this.props;
    return (
      <div className={s.sideMenuBg}>
        <div className={s.siteAdminHeader}>
          <span><FormattedMessage {...messages.siteAdmin} /></span>
        </div>
        <div className={cx(s.sideMenuList, 'sideMenu', 'sideMenuScroll')}>
          <div>
            <Link to={''} onClick={() => adminLogout()} className={cx(s.logoutIconMobile, 'visible-xs visible-sm')}>
              <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                <img src={LogOutIcon} className={cx(s.sideMenuIcon)} />
              </span>
            </Link>
          </div>
          <Navbar expand="lg">
            <div onClick={() => this.openMenu()}>
              <div className="nav-container">
                <div className={cx("button  d-block d-md-none")} tabIndex="0">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </div>
              </div>
            </div>
            <div className={cx({ [s.menuOpen]: this.state.isOpen == 1 }, s.mobileMenu)}>
              <div className={cx({ [s.menuClose]: this.state.isOpen == 0 }, s.rightMenuClose, 'd-block d-md-none')}>
                <div className={s.closeColor} onClick={() => this.openClose()} >
                  ×
              </div>
              </div>
              <Nav className="mr-auto">
                <Link noLink onClick={(e) => openHeaderModal('languageModal')} className={cx(s.sideNavitem, s.displayTable, bt.spaceTop2, s.responsiveDasboradMargin, 'd-block d-md-none', s.languageSelector)}>
                  <span className={cx(s.languageIcon), s.displayTableCell}>
                    <img src={LanguageIcon} className={cx(s.sideMenuIcon, s.noFilter)} />
                  </span>
                  <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                    {formatLocale(currentLocale)}
                  </span>
                </Link>
                <Link to={'/siteadmin'} className={cx(s.sideNavitem, s.displayTable, { [s.activeMenu]: location == '/siteadmin' })} onClick={() => this.openClose()}>
                  <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                    <img src={DashboardIcon} className={s.sideMenuIcon} />
                  </span>
                  <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                    <FormattedMessage {...messages.manageDashboard} />
                  </span>
                </Link>
                {
                  validatePrivilege(1, privileges) &&
                  <Link to={'/siteadmin/settings/site'} className={cx(s.sideNavitem, s.displayTable, { [s.activeMenu]: location === '/siteadmin/settings/site' })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={SiteSettingIcon} className={cx(s.sideMenuIcon, s.noFilter)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                      <FormattedMessage {...messages.siteSettings} />
                    </span>
                  </Link>
                }
                {
                  validatePrivilege(2, privileges) &&
                  <div>
                    <div id='Homepage' className={s.sideNavitem}>
                      <Button
                        bsStyle="link"
                        className={cx(s.button, bt.noPadding, s.noBorderBtn, s.activeMenu, s.btnWidth)}
                        onClick={() => {
                          this.setState({
                            homepageSettings: !this.state.homepageSettings
                          })
                          // let element = document.getElementById("Homepage")
                          // element.classList.add(s.activeMenu);
                        }
                        }>
                        <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                          <img src={HomeSettingIcon} className={cx(s.sideMenuIcon, s.noFilter)} />
                        </span>
                        <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                          <FormattedMessage {...messages.HomeSiteSettings} />
                        </span>
                      </Button>
                    </div>
                    <Collapse in={this.state.homepageSettings}>
                      <div>
                        <Link to={'/siteadmin/homepage/banner'} className={cx(s.sideNavitem, s.displayTable, s.sideNavitemCollapsePadding, { [s.activeMenu]: location.startsWith('/siteadmin/homepage-homesettings') })} onClick={() => this.openClose()}>
                          <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell, s.sideNavitemCollapse)}>
                            <img src={RightArrowIcon} className={cx(s.sideMenuIcon, s.sideNavitemCollapseIcon)} />
                          </span>
                          <span className={cx(s.vtrMiddle, s.sideNavitemCollapseText, s.displayTableCell)}>
                            <FormattedMessage {...messages.homeSectionSettings} />
                          </span>
                        </Link>
                        <Link to={'/siteadmin/homepage/category'} className={cx(s.sideNavitem, s.displayTable, s.sideNavitemCollapsePadding, { [s.activeMenu]: location.startsWith('/siteadmin/homepage-citysettings') })} onClick={() => this.openClose()}>
                          <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell, s.sideNavitemCollapse)}>
                            <img src={RightArrowIcon} className={cx(s.sideMenuIcon, s.sideNavitemCollapseIcon)} />
                          </span>
                          <span className={cx(s.vtrMiddle, s.sideNavitemCollapseText, s.displayTableCell)}>
                            <FormattedMessage {...messages.citySectionSettings} />
                          </span>
                        </Link>
                        <Link to={'/siteadmin/homepage/topfeature'} className={cx(s.sideNavitem, s.displayTable, s.sideNavitemCollapsePadding, { [s.activeMenu]: location.startsWith('/siteadmin/homepage-aboutsettings') })} onClick={() => this.openClose()}>
                          <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell, s.sideNavitemCollapse)}>
                            <img src={RightArrowIcon} className={cx(s.sideMenuIcon, s.sideNavitemCollapseIcon)} />
                          </span>
                          <span className={cx(s.vtrMiddle, s.sideNavitemCollapseText, s.displayTableCell)}>
                            <FormattedMessage {...messages.aboutSectionSettings} />
                          </span>
                        </Link>
                        <Link to={'/siteadmin/homepage/rider'} className={cx(s.sideNavitem, s.displayTable, s.sideNavitemCollapsePadding, { [s.activeMenu]: location.startsWith('/siteadmin/homepage-safetysettings') })} onClick={() => this.openClose()}>
                          <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell, s.sideNavitemCollapse)}>
                            <img src={RightArrowIcon} className={cx(s.sideMenuIcon, s.sideNavitemCollapseIcon)} />
                          </span>
                          <span className={cx(s.vtrMiddle, s.sideNavitemCollapseText, s.displayTableCell)}>
                            <FormattedMessage {...messages.safetySectionSettings} />
                          </span>
                        </Link>
                        <Link to={'/siteadmin/homepage/driver'} className={cx(s.sideNavitem, s.displayTable, s.sideNavitemCollapsePadding, { [s.activeMenu]: location.startsWith('/siteadmin/homepage-signupsettings') })} onClick={() => this.openClose()}>
                          <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell, s.sideNavitemCollapse)}>
                            <img src={RightArrowIcon} className={cx(s.sideMenuIcon, s.sideNavitemCollapseIcon)} />
                          </span>
                          <span className={cx(s.vtrMiddle, s.sideNavitemCollapseText, s.displayTableCell)}>
                            <FormattedMessage {...messages.signupSectionSettings} />
                          </span>
                        </Link>
                        <Link to={'/siteadmin/homepage/footer'} className={cx(s.sideNavitem, s.displayTable, s.sideNavitemCollapsePadding, { [s.activeMenu]: location.startsWith('/siteadmin/homepage-footersettings') })} onClick={() => this.openClose()}>
                          <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell, s.sideNavitemCollapse)}>
                            <img src={RightArrowIcon} className={cx(s.sideMenuIcon, s.sideNavitemCollapseIcon)} />
                          </span>
                          <span className={cx(s.vtrMiddle, s.sideNavitemCollapseText, s.displayTableCell)}>
                            <FormattedMessage {...messages.footerSectionSettings} />
                          </span>
                        </Link>
                      </div>
                    </Collapse>
                  </div>
                }
                {isSuperAdmin && <div>
                  <div id='Homepage' className={s.sideNavitem}>
                    <Button
                      bsStyle="link"
                      className={cx(s.button, bt.noPadding, s.noBorderBtn, s.activeMenu, s.btnWidth)}
                      onClick={() => {
                        this.setState({
                          subAdmin: !this.state.subAdmin
                        })
                        // let element = document.getElementById("Homepage")
                        // element.classList.add(s.activeMenu);
                      }
                      }>
                      <span className={cx(s.vtrTop, s.iconWidth, s.iconWidth, s.displayTableCell)}>
                        <img src={HomeSettingIcon} className={cx(s.sideMenuIcon, s.noFilter)} />
                      </span>
                      <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                        <FormattedMessage {...messages.manageAdmin} />
                      </span>
                    </Button>
                  </div>
                  <Collapse in={this.state.subAdmin} className={s.subMenu}>
                    <div>
                      <Link to={'/siteadmin/admin-users'} className={cx(s.sideNavitem, s.displayTable, s.sideNavitemCollapsePadding, { [s.activeMenu]: location.startsWith('/siteadmin/admin-users') })} onClick={() => this.openClose()}>
                        <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell, s.sideNavitemCollapse)}>
                          <img src={RightArrowIcon} className={cx(s.sideMenuIcon, s.sideNavitemCollapseIcon)} />
                        </span>
                        <span className={cx(s.vtrMiddle, s.sideNavitemCollapseText, s.displayTableCell)}>
                          <FormattedMessage {...messages.manageAdminUsers} />
                        </span>
                      </Link>

                      <Link to={'/siteadmin/admin-roles'} className={cx(s.sideNavitem, s.displayTable, s.sideNavitemCollapsePadding, { [s.activeMenu]: location.startsWith('/siteadmin/admin-roles') })} onClick={() => this.openClose()}>
                        <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell, s.sideNavitemCollapse)}>
                          <img src={RightArrowIcon} className={cx(s.sideMenuIcon, s.sideNavitemCollapseIcon)} />
                        </span>
                        <span className={cx(s.vtrMiddle, s.sideNavitemCollapseText, s.displayTableCell)}>
                          <FormattedMessage {...messages.manageAdminRoles} />
                        </span>
                      </Link>
                    </div>
                  </Collapse>
                </div>
                }
                {
                  validatePrivilege(3, privileges) &&
                  <Link to={'/siteadmin/riders'} className={cx(s.sideNavitem, s.displayTable, { [s.activeMenu]: location.startsWith('/siteadmin/riders') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={RidersIcon} className={s.sideMenuIcon} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                      <FormattedMessage {...messages.ridersMenu} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(4, privileges) &&
                  <Link to={'/siteadmin/drivers'} className={cx(s.sideNavitem, s.displayTable, { [s.activeMenu]: location.startsWith('/siteadmin/drivers') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={DriversIcon} className={s.sideMenuIcon} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                      <FormattedMessage {...messages.driverMenu} />
                    </span>
                  </Link>}
                {validatePrivilege(5, privileges) && <Link to={'/siteadmin/vehicles'} className={cx(s.sideNavitem, s.displayTable, { [s.activeMenu]: location.startsWith('/siteadmin/vehicles') })} onClick={() => this.openClose()}>
                  <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                    <img src={VehiclesIcon} className={s.sideMenuIcon} />
                  </span>
                  <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                    <FormattedMessage {...messages.vehiclesMenu} />
                  </span>
                </Link>}
                {
                  validatePrivilege(6, privileges) &&
                  <Link to={'/siteadmin/category'} className={cx(s.sideNavitem, s.displayTable, { [s.activeMenu]: location.startsWith('/siteadmin/category') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={CategoriesIcon} className={s.sideMenuIcon} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                      <FormattedMessage {...messages.categoryMenu} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(7, privileges) &&
                  <Link to={'/siteadmin/location'} className={cx(s.sideNavitem, s.displayTable, { [s.activeMenu]: location.startsWith('/siteadmin/location') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={ManageLocationIcon} className={cx(s.sideMenuIcon, s.noFilter)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                      <FormattedMessage {...messages.location} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(8, privileges) &&
                  <Link to={'/siteadmin/pricing/list'} className={cx(s.sideNavitem, s.displayTable, { [s.activeMenu]: location.startsWith('/siteadmin/pricing') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={manageFareIcon} className={cx(s.sideMenuIcon, s.noFilter)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                      <FormattedMessage {...messages.manageFare} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(9, privileges) &&
                  <Link to={'/siteadmin/bookings'} className={cx(s.sideNavitem, s.displayTable, { [s.activeMenu]: location.startsWith('/siteadmin/bookings') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={BookingsIcon} className={s.sideMenuIcon} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                      <FormattedMessage {...messages.bookingsMenu} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(9, privileges) &&
                  <Link to={'/siteadmin/schedule-bookings'} className={cx(s.sideNavitem, s.displayTable, { [s.activeMenu]: location.startsWith('/siteadmin/schedule-bookings') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={scheduleIcon} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                      <FormattedMessage {...messages.scheduleBooking} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(9, privileges) &&
                  <Link to={'/siteadmin/completed-bookings'} className={cx(s.sideNavitem, s.displayTable, { [s.activeMenu]: location.startsWith('/siteadmin/completed-bookings') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={CompletedBooking} className={cx(s.sideMenuIcon, s.noFilter)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                      <FormattedMessage {...messages.manageCompletedTrips} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(9, privileges) &&
                  <Link to={'/siteadmin/cancelled-bookings'} className={cx(s.sideNavitem, s.displayTable, { [s.activeMenu]: location.startsWith('/siteadmin/cancelled-bookings') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={CancalBookingIcon} className={cx(s.sideMenuIcon, s.noFilter)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                      <FormattedMessage {...messages.manageCancelledTrips} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(10, privileges) &&
                  <Link to={'/siteadmin/ratings'} className={cx(s.sideNavitem, s.displayTable, { [s.activeMenu]: location == '/siteadmin/ratings' })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={RatingIcon} className={cx(s.sideMenuIcon, s.noFilter)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                      <FormattedMessage {...messages.ratings} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(11, privileges) &&
                  <Link to={'/siteadmin/promo-code/list'} className={cx(s.sideNavitem, s.displayTable, { [s.activeMenu]: location.startsWith('/siteadmin/promo-code') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={PromoCodeIcon} className={s.sideMenuIcon} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                      <FormattedMessage {...messages.managePromoCode} />
                    </span>
                  </Link>}
                <Link to={'/siteadmin/change/admin'} className={cx(s.sideNavitem, s.displayTable, { [s.activeMenu]: location == '/siteadmin/change/admin' })} onClick={() => this.openClose()}>
                  <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                    <img src={ChangePasswordIcon} className={cx(s.sideMenuIcon, s.noFilter)} />
                  </span>
                  <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                    <FormattedMessage {...messages.changePassword} />
                  </span>
                </Link>
                {
                  validatePrivilege(12, privileges) &&
                  <Link to={'/siteadmin/notifications'} className={cx(s.sideNavitem, s.displayTable, { [s.activeMenu]: location == '/siteadmin/notifications' })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={NotificationIcon} className={cx(s.sideMenuIcon, s.noFilter)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                      <FormattedMessage {...messages.manageNotifications} />
                    </span>
                  </Link>}
                {isSuperAdmin && <Link to={'/siteadmin/currency'} className={cx(s.sideNavitem, s.displayTable, { [s.activeMenu]: location == '/siteadmin/currency' })} onClick={() => this.openClose()}>
                  <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                    <img src={ManageCurrencyIcon} className={cx(s.sideMenuIcon, s.noFilter)} />
                  </span>
                  <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                    <FormattedMessage {...messages.manageCurrency} />
                  </span>
                </Link>}
                {
                  validatePrivilege(13, privileges) &&
                  <Link to={'/siteadmin/cancel-reasons'} className={cx(s.sideNavitem, s.displayTable, { [s.activeMenu]: location.startsWith('/siteadmin/cancel-reasons') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={CancelFaildIcon} className={cx(s.sideMenuIcon, s.noFilter)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                      <FormattedMessage {...messages.manageCancelReason} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(14, privileges) &&
                  <Link to={'/siteadmin/payout'} className={cx(s.sideNavitem, s.displayTable, { [s.activeMenu]: location.startsWith('/siteadmin/payout') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={PayOutManageIcon} className={cx(s.sideMenuIcon, s.noFilter)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                      <FormattedMessage {...messages.managePayout} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(14, privileges) &&
                  <Link to={'/siteadmin/failed-payout'} className={cx(s.sideNavitem, s.displayTable, { [s.activeMenu]: location.startsWith('/siteadmin/failed-payout') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={PayOutManageFaildIcon} className={cx(s.sideMenuIcon, s.noFilter)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                      <FormattedMessage {...messages.manageFailedPayout} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(15, privileges) &&
                  <Link to={'/siteadmin/staticpage/manage'} className={cx(s.sideNavitem, s.displayTable, { [s.activeMenu]: location.startsWith('/siteadmin/staticpage/manage') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={staticPageIcon} className={cx(s.sideMenuIcon, s.noFilter)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                      <FormattedMessage {...messages.staticpageManagement} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(15, privileges) &&
                  <Link to={'/siteadmin/contentpage/manage'} className={cx(s.sideNavitem, s.displayTable, { [s.activeMenu]: location.startsWith('/siteadmin/contentpage/manage') })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={staticPageIcon} className={cx(s.sideMenuIcon, s.noFilter)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                      <FormattedMessage {...messages.contentpageManagement} />
                    </span>
                  </Link>}
                {
                  validatePrivilege(16, privileges) &&
                  <Link to={'/siteadmin/precaution-notification'} className={cx(s.sideNavitem, s.displayTable, { [s.activeMenu]: location == '/siteadmin/precaution-notification' })} onClick={() => this.openClose()}>
                    <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                      <img src={precautionIcon} className={cx(s.sideMenuIcon, s.noFilter)} />
                    </span>
                    <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                      <FormattedMessage {...messages.precautionNotification} />
                    </span>
                  </Link>}
                <Link to={'/'} className={cx(s.sideNavitem, s.displayTable, s.hiddenMd)} onClick={() => this.openClose()}>
                  <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                    <img src={MainSiteIcon} className={cx(s.sideMenuIcon, s.noFilter)} />
                  </span>
                  <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                    <FormattedMessage {...messages.goToMainSite} />
                  </span>
                </Link>
                <Link to={''} onClick={() => adminLogout()} className={cx(s.sideNavitem, s.displayTable, s.paddingBottomextra, s.hiddenMd)}>
                  <span className={cx(s.vtrTop, s.iconWidth, s.displayTableCell)}>
                    <img src={LogOutIcon} className={cx(s.sideMenuIcon, s.noFilter)} />
                  </span>
                  <span className={cx(s.vtrMiddle, s.displayTableCell)}>
                    <FormattedMessage {...messages.logout} />
                  </span>
                </Link>
              </Nav>
            </div>
          </Navbar>
        </div>
      </div>
    );
  }
}
const mapState = state => ({
  isSuperAdmin: state.runtime.isSuperAdmin,
  privileges: state.adminPrevileges.privileges && state.adminPrevileges.privileges.privileges,
  currentLocale: state.intl.locale,
});
const mapDispatch = {
  adminLogout,
  openHeaderModal
};
export default compose(injectIntl,
  withStyles(s, bt),
  (connect(mapState, mapDispatch))
)(SideMenu);
