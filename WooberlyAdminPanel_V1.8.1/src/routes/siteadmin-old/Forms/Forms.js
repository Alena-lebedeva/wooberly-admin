

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Forms.css';
import {
    Row, Col
} from 'react-bootstrap';

import Forms from '../../../components/SiteAdmin/Forms';

class FormsAdmin extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        children: PropTypes.string.isRequired,
    };

    render() {
        return (
            <div>
                <Forms />
            </div>

        );
    }
}

export default withStyles(s)(FormsAdmin);
