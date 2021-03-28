

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Dashboard.css';
import {
    Row, Col
} from 'react-bootstrap';
import Sidebaradmin from '../../../components/SiteAdmin/Sidebar';
import Dashboard from '../../../components/SiteAdmin/Dashboard';

class Dashboardadmin extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired
    };

    render() {
        return (
           <div> 
              <Dashboard />
            </div>
            
        );
    }
}

export default withStyles(s)(Dashboardadmin);
