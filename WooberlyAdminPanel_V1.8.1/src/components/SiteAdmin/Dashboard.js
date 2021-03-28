

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './AdminCommon.css';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';
import Link from '../Link';
import ReactSvgPieChart from "react-svg-piechart";
import {
    Navbar, Row, Col,Table,Form,Button
} from 'react-bootstrap';
import user from './Images/users.svg';
import listing from './Images/clipboards.svg';
import reservation from './Images/online-booking.svg';


// Pie chart
const dataOne = [
    { title: "Data 1", value: 100, color: "#22594e" },
    { title: "Data 2", value: 60, color: "#2f7d6d" },
    { title: "Data 3", value: 30, color: "#3da18d" },
    { title: "Data 4", value: 20, color: "#69c2b0" },
    { title: "Data 5", value: 10, color: "#a1d9ce" },
]


class Dashboard extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
    };

    render() {
        return (
            <div>
                <div>
                    
                    <Row className={s.adminPadding}>
                        <Col lg={4}>
                            <div className={cx(s.card,s.gradientOne)}>
                                <div>
                                    <div className={s.countSection}>123</div>
                                    <div className={s.userSection}><FormattedMessage {...messages.totalUser} /></div>
                                </div>
                                <div>
                                    <img src={user} className={s.cardImage} />
                                </div>

                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className={cx(s.card, s.gradientTwo)}>
                                <div>
                                    <div className={s.countSection}>123</div>
                                    <div className={s.userSection}><FormattedMessage {...messages.totalList} /></div>
                                </div>
                                <div>
                                    <img src={listing} className={s.cardImage} />
                                </div>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div  className={cx(s.card,s.gradientThree)}>
                                <div>
                                    <div className={s.countSection}>123</div>
                                    <div className={s.userSection}><FormattedMessage {...messages.totalReserv} /></div>
                                </div>
                                <div>
                                    <img src={reservation} className={s.cardImage} />
                                </div>
                            </div>
                        </Col>

                    </Row>
                </div>
                <div>
                    <Row className={s.marginNone}>
                        <Col lg={6}>
                            <div className={s.cardOne}>
                                <div className={cx(s.userSection, "mb-4")}> <FormattedMessage {...messages.lastHours} />{' '}-{' '}<FormattedMessage {...messages.listings} /> </div>
                                <div className={cx('pieChart', "align-self-center")}>
                                    <ReactSvgPieChart
                                        data={dataOne}
                                        expandOnHover={true}
                                        expandSize={2} />
                                </div>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className={s.cardOne}>
                                <div className={cx(s.userSection, "mb-4")}> <FormattedMessage {...messages.lastHours} />{' '}-{' '}<FormattedMessage {...messages.reservations} /> </div>
                                <div className={cx('pieChart', "align-self-center")}>
                                    <ReactSvgPieChart
                                        data={dataOne}
                                        expandOnHover={true}
                                        expandSize={2} />
                                </div>
                            </div>
                        </Col>
                       
    
                    </Row>
                </div>
          </div>

        );
    }
}

export default withStyles(s)(Dashboard);
