import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './AdminHeader.css';
import { Nav } from 'react-bootstrap';
import Link from '../Link';
import messages from '../../locale/messages';
import cx from 'classnames';
import { adminLogout } from '../../actions/siteadmin/logout';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
// Helpers
import history from '../../history';

//Images 
import LogOutIcon from '../../../public/Icons/logout.svg';
import MainSiteIcon from '../../../public/Icons/mainSite.svg';
import HeaderModal from '../HeaderModal/HeaderModal';
import { openHeaderModal } from '../../actions/siteadmin/modalActions';
import { formatLocale } from '../../helpers/formatLocale';
import CheckUserStatusQuery from './getCheckUserStatus.graphql';
import LanguageIcon from '../../../public/Icons/languageIcon.svg';

class AdminHeader extends React.Component {
  static defaultProps = {
    checkLoginUserExist: {
      userExistloading: true,
      getAdminUserExists: {
        userExistStatus: null,
      },
    }
  };

  constructor(props) {
    super(props);
    this.navigation = this.navigation.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  navigation(URL) {
    if (URL) {
      history.push(URL);
    }
  }

  handleChange(e) {
    const { openHeaderModal } = this.props;
    openHeaderModal('languageModal');
  }

  render() {
    const { openHeaderModal, currentLocale, adminLogout } = this.props;
    const { checkLoginUserExist: { userExistloading, getAdminUserExists } } = this.props;

    if (!userExistloading && getAdminUserExists) {
      if (getAdminUserExists.userExistStatus) {
        const isBrowser = typeof window !== 'undefined';
        if (isBrowser) {
          adminLogout();
          window.location.reload();
        }
      }
    }

    return (
      <div className={s.headerBg}>
        <div className={cx(s.logOut, 'logOut')}>
          {/* <Navbar expand="lg"> */}
          <Nav className="mr-auto">
            <HeaderModal />
            <Link noLink
              onClick={(e) => this.handleChange(e)}
              className={cx(s.siteColor, s.cursurPointer)}>
                <span className={cx(s.displayInlineBlock, s.vtrTop, s.iconWidth, s.languageIcon)}>
                <img src={LanguageIcon} className={cx(s.sideMenuIcon, s.noFilter)} />
              </span>
              <span className={cx(s.displayInlineBlock, s.vtrMiddle, s.iconTextPadding)}>
                {formatLocale(currentLocale)}
              </span>
            </Link>
            <Link to={'/'} onClick={() => this.openClose()} className={cx(s.Sitepadding, s.siteColor)}>
              <span className={cx(s.displayInlineBlock, s.vtrTop, s.iconWidth)}>
                <img src={MainSiteIcon} className={cx(s.sideMenuIcon, s.noFilter)} />
              </span>
              <span className={cx(s.displayInlineBlock, s.vtrMiddle, s.iconTextPadding)}>
                <FormattedMessage {...messages.goToMainSite} />
              </span>
            </Link>
            <Link to={''} onClick={() => adminLogout()} className={s.siteColor}>
              <span className={cx(s.displayInlineBlock, s.vtrTop, s.iconWidth)}>
                <img src={LogOutIcon} className={cx(s.sideMenuIcon, s.noFilter)} />
              </span>
              <span className={cx(s.displayInlineBlock, s.vtrMiddle, s.iconTextPadding)}>
                <FormattedMessage {...messages.logout} />
              </span>
            </Link>
          </Nav>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  currentLocale: state.intl.locale
});
const mapDispatch = {
  openHeaderModal,
  adminLogout
  
};

// export default withStyles(s)(connect(mapState, mapDispatch)(AdminHeader));
export default compose(injectIntl,
  withStyles(s),
  graphql(CheckUserStatusQuery, {
    name: 'checkLoginUserExist',
    options: {
      ssr: false,
      pollInterval: 60000, // 1 minute
    },
  }),
(connect(mapState, mapDispatch))
)(AdminHeader);