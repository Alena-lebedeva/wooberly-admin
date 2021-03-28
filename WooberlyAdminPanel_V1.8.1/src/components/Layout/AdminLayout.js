import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Row, Col } from 'react-bootstrap';
import history from '../../history'

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './Layout.css';
import SideMenu from '../SideMenu/SideMenu';
import AdminHeader from '../AdminHeader/AdminHeader';
import Toaster from '../Toaster';

class AdminLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    //For Highlighting Side Menu based on URL
    let location;
    if (history.location) {
      location = history.location.pathname
    }
    
    return (
      <div className="bodyOverflow">
        <Toaster />
        <div className={s.sideNav}>
          <SideMenu location={location} />
        </div>
        <div className={s.mainContent}>
          <div className={s.adminHeader}>
            <AdminHeader />
          </div>
          <div className={s.mainSectionPaddingTop}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(normalizeCss, s)(AdminLayout);
