import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './AdminCommon.css';
import cx from 'classnames';
import Sidebar from "react-sidebar";
import Link from '../../components/Link';
import { ListGroup, Col, Card, Accordion, Button, Navbar, Nav } from 'react-bootstrap';

//Messages
import messages from '../../locale/messages';

//Images
import home from './Images/home.png';
import users from './Images/multiple-users-silhouette.png';
import settings from './Images/settings.png';
import search from './Images/search.png';

//History
import history from '../../history';

class SidebarAdmin extends React.Component {


  render() {
    let location = history && history.location ? history.location.pathname : null;

    return (
      <div>
        <Navbar expand="lg" className={s.adminPanelSidemenu}>
          <Navbar.Brand href="#home">
            <Link to="#" className={s.adminPanelLogo}>
              <FormattedMessage {...messages.adminpanel} />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className={cx("mr-2", s.outlineNone)} />
          <Navbar.Collapse id="basic-navbar-nav" className={cx("align-items-start", s.fullWidth)}>
            <Nav className={s.fullWidth}>
              <ul className={cx('adminsidebar', s.fullWidth)}>
                <li className={cx({ [s.activeSideMenu]: location === "/siteadmin/dashboard" })}>
                  <Link to="/siteadmin/dashboard">
                    <img src={home} className={s.sidebarImage} />
                    <FormattedMessage {...messages.dashboard} />
                  </Link>
                </li>

                <li>
                  <Accordion>
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                          <img src={settings} className={s.sidebarImage} />
                          <FormattedMessage {...messages.settings} />
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <Link to="/siteadmin/users">
                            <img src={users} className={s.sidebarImage} />
                            <FormattedMessage {...messages.users} />
                          </Link>

                        </Card.Body>

                      </Accordion.Collapse>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <Link to="/siteadmin/forms">
                            <img src={users} className={s.sidebarImage} />
                            <FormattedMessage {...messages.formssidebar} />
                          </Link>

                        </Card.Body>

                      </Accordion.Collapse>
                    </Card>

                  </Accordion>
                </li>
              </ul>

            </Nav>

          </Navbar.Collapse>
        </Navbar>
      </div>

    );
  }
}

export default injectIntl(withStyles(s)(SidebarAdmin));
