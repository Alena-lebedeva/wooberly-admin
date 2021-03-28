import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Header.css';
import { Navbar, Nav } from 'react-bootstrap';
import NavLink from '../NavLink';
import messages from '../../locale/messages';
import Link from '../Link';
import Navigation from '../Navigation';
import LanguageSwitcher from '../LanguageSwitcher';
import { connect } from 'react-redux'
import { changeExt } from 'upath';
import cx from 'classnames';
import { api, logoUploadDir } from '../../config'
import { flowRight as compose } from 'lodash';
import history from '../../history';




class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: 0,
    };
    this.openMenu = this.openMenu.bind(this);
    this.openClose = this.openClose.bind(this);
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
    let location;

    if (history.location) {
      location = history.location.pathname;
    }

    

    const { logo, logoHeight, logoWidth, siteName, isOpen} = this.props
    return (
      <div className={cx(s.root, 'mainMenu')}>
        <Navbar expand="lg" className={cx(s.navBg, { ['homeHeader']: location === '/' || location === '/home' })}>
          <Navbar.Brand>
            <Link className={s.brand} to="/">
              <img
                src={api.apiEndpoint + logoUploadDir + logo}
                // srcSet={`${logoUrl2x} 2x`}
                width={Number(logoWidth)}
                height={Number(logoHeight)}
                alt={siteName}
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className={cx(s.borderNone, s.outlineNone)}
            children={
              <div className={'menuToggle'} onClick={() => this.openMenu()}>
                {/* <input type="checkbox" /> */}
                <span></span>
                <span></span>
                <span></span>
                {/* &#9776; */}
              </div>
            }
          />
          <Navbar.Collapse className={cx({ [s.menuOpened]: this.state.isOpen == 1 }, s.justifyFlexEnd, s.menuClosed)} in={isOpen} id="basic-navbar-nav">
            
            <Nav className={s.navigationLink} onClick={() => this.openClose()}>
              <div className={s.closeButton}> &#x2715; </div>
              <NavLink to="/" ><FormattedMessage {...messages.homeonly} /></NavLink>
              <NavLink to="/rider" ><FormattedMessage {...messages.rider} /></NavLink>
              <NavLink to="/driver" ><FormattedMessage {...messages.driver} /></NavLink>
              <NavLink to="/support" ><FormattedMessage {...messages.contact} /></NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

const mapState = (state) => ({
  logo: state.siteSettings.data.homeLogo,
  logoHeight: state.siteSettings.data.logoHeight,
  logoWidth: state.siteSettings.data.logoWidth,
  siteName: state.siteSettings.data.siteName
})
const mapDispatch = {

}

export default compose(
  withStyles(s),
  connect(mapState, mapDispatch)
)(Header)
