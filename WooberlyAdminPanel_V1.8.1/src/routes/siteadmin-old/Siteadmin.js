

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Siteadmin.css';
import cx from 'classnames';
import Sidebaradmin from '../../components/SiteAdmin/Sidebar';
import Dashboard from './dashboard/Dashboard';
import { Row,Col } from 'react-bootstrap';

class Siteadmin extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        children:PropTypes.string.isRequired,
    };

    render() {
        return (
            <div>
                <Row className={s.marginNone}>
                    <Col lg={2} className={s.paddingNone}>
                        <Sidebaradmin />
                    </Col>
                    <Col lg={10} className={cx(s.adminSideColor,s.paddingNone)}>
                          <div className={s.adminHeader}>Admin Header</div>
                        {this.props.children}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withStyles(s)(Siteadmin);
