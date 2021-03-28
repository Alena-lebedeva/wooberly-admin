

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Users.css';
import {
    Row, Col
} from 'react-bootstrap';
import Sidebaradmin from '../../../components/SiteAdmin/Sidebar';
import UsersAdmin from '../../../components/SiteAdmin/Users';

class UsersLayout extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        children: PropTypes.string.isRequired,
    };

    render() {
        return (
            <div>
                <UsersAdmin />
            </div>

        );
    }
}

export default withStyles(s)(UsersLayout);
