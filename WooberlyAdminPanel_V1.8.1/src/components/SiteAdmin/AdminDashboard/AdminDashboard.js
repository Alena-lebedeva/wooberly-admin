import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import {
    Row, Col
} from 'react-bootstrap';
import s from './AdminDashboard.css';
import cx from 'classnames';
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';
import CurrencyConverter from '../../CurrencyConverter'

export class AdminDashboard extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        count: PropTypes.shape({
            getDashboardCount: PropTypes.shape({
                totalDriversCount: PropTypes.number.isRequired,
                todayDriversCount: PropTypes.number.isRequired,
                weekDriversCount: PropTypes.number.isRequired,
                monthDriversCount: PropTypes.number.isRequired,
                totalRidersCount: PropTypes.number.isRequired,
                todayRidersCount: PropTypes.number.isRequired,
                weekRidersCount: PropTypes.number.isRequired,
                monthRidersCount: PropTypes.number.isRequired,
                totalBookingsCount: PropTypes.number.isRequired,
                todayBookingsCount: PropTypes.number.isRequired,
                weekBookingsCount: PropTypes.number.isRequired,
                monthBookingsCount: PropTypes.number.isRequired
            })
        })
    }

    render() {
        const { count: { getDashboardCount }, todayEarnings, weeklyEarnings, monthlyEarnings, totalEarnings } = this.props;
        let totalDrivers = getDashboardCount && getDashboardCount.totalDriversCount || 0;
        let todayDrivers = getDashboardCount && getDashboardCount.todayDriversCount || 0;
        let weekDrivers = getDashboardCount && getDashboardCount.weekDriversCount || 0;
        let monthDrivers = getDashboardCount && getDashboardCount.monthDriversCount || 0;
        let totalRiders = getDashboardCount && getDashboardCount.totalRidersCount || 0;
        let todayRiders = getDashboardCount && getDashboardCount.todayRidersCount || 0;
        let weekRiders = getDashboardCount && getDashboardCount.weekRidersCount || 0;
        let monthRiders = getDashboardCount && getDashboardCount.monthRidersCount || 0;
        let totalBookings = getDashboardCount && getDashboardCount.totalBookingsCount || 0;
        let todayBookings = getDashboardCount && getDashboardCount.todayBookingsCount || 0;
        let weekBookings = getDashboardCount && getDashboardCount.weekBookingsCount || 0;
        let monthBookings = getDashboardCount && getDashboardCount.monthBookingsCount || 0;
        let currency = getDashboardCount && getDashboardCount.currency;
        
        return (
            <div>
                <Row>
                    <Col xl={4} lg={12} md={12} sm={12} xs={12}>
                        <div className={s.box}>
                            <h2><FormattedMessage {...messages.drivers} /></h2>
                            <div className={s.boxInner}>
                                <div className={s.displayTable}>
                                    <div className={s.displayTableRow}>
                                        <div className={cx(s.displayTableCell, s.widthText)}>
                                            <div><FormattedMessage {...messages.today} /></div>
                                            <div className={s.priceCircle}>{todayDrivers}</div>
                                        </div>
                                        <div className={cx(s.displayTableCell, s.widthText)}>
                                         <div><FormattedMessage {...messages.weekly} /></div>
                                            <div className={s.priceCircle}>{weekDrivers}</div>
                                        </div>
                                        <div className={cx(s.displayTableCell, s.widthText)}>
                                        <div><FormattedMessage {...messages.montly} /></div>
                                            <div className={s.priceCircle}>{monthDrivers}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={s.totalCss}>
                               <div className={s.displayTable}>
                                    <div className={s.displayTableRow}>
                                        <div className={cx(s.displayTableCell, s.widthText, s.textCenterDashboard)}><FormattedMessage {...messages.overAll} /></div>
                                        <div className={cx(s.displayTableCell, s.textRight)}>{totalDrivers}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={4} lg={12} md={12} sm={12} xs={12}>
                    <div className={s.box}>
                            <h2><FormattedMessage {...messages.riders} /></h2>
                            <div className={s.boxInner}>
                                <div className={s.displayTable}>
                                    <div className={s.displayTableRow}>
                                        <div className={cx(s.displayTableCell, s.widthText)}>
                                        <div><FormattedMessage {...messages.today} /></div>
                                            <div className={s.priceCircle}>{todayRiders}</div>
                                        </div>
                                        <div className={cx(s.displayTableCell, s.widthText)}>
                                        <div><FormattedMessage {...messages.weekly} /></div>
                                            <div className={s.priceCircle}>{weekRiders}</div>
                                        </div>
                                        <div className={cx(s.displayTableCell, s.widthText)}>
                                        <div><FormattedMessage {...messages.montly} /></div>
                                            <div className={s.priceCircle}>{monthRiders}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={s.totalCss}>
                               <div className={s.displayTable}>
                                    <div className={s.displayTableRow}>
                                        <div className={cx(s.displayTableCell, s.widthText, s.textCenterDashboard)}><FormattedMessage {...messages.overAll} /></div>
                                        <div className={cx(s.displayTableCell, s.textRight)}>{totalRiders}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                   </Col>
                    <Col xl={4} lg={12} md={12} sm={12} xs={12}>
                    <div className={s.box}>
                            <h2><FormattedMessage {...messages.bookings} /></h2>
                            <div className={s.boxInner}>
                                <div className={s.displayTable}>
                                    <div className={s.displayTableRow}>
                                        <div className={cx(s.displayTableCell, s.widthText)}>
                                        <div><FormattedMessage {...messages.today} /></div>
                                            <div className={s.priceCircle}>{todayBookings}</div>
                                        </div>
                                        <div className={cx(s.displayTableCell, s.widthText)}>
                                        <div><FormattedMessage {...messages.weekly} /></div>
                                            <div className={s.priceCircle}>{weekBookings}</div>
                                        </div>
                                        <div className={cx(s.displayTableCell, s.widthText)}>
                                        <div><FormattedMessage {...messages.montly} /></div>
                                            <div className={s.priceCircle}>{monthBookings}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={s.totalCss}>
                               <div className={s.displayTable}>
                                    <div className={s.displayTableRow}>
                                        <div className={cx(s.displayTableCell, s.widthText, s.textCenterDashboard)}><FormattedMessage {...messages.overAll} /></div>
                                        <div className={cx(s.displayTableCell, s.textRight)}>{totalBookings}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className={s.earingSection}>
                <div className={s.box}>
                            <h2><FormattedMessage {...messages.earnings} /></h2>
                            <div className={s.boxInner}>
                                <div className={s.displayTable}>
                                    <div className={s.displayTableRow}>
                                        <div className={cx(s.displayTableCell, s.widthText)}>
                                        <div><FormattedMessage {...messages.today} /></div>
                                            <div className={s.priceCircle}><CurrencyConverter from={currency} amount={todayEarnings} /></div>
                                        </div>
                                        <div className={cx(s.displayTableCell, s.widthText)}>
                                        <div><FormattedMessage {...messages.weekly} /></div>
                                            <div className={s.priceCircle}><CurrencyConverter from={currency} amount={weeklyEarnings} /></div>
                                        </div>
                                        <div className={cx(s.displayTableCell, s.widthText)}>
                                        <div><FormattedMessage {...messages.montly} /></div>
                                            <div className={s.priceCircle}><CurrencyConverter from={currency} amount={monthlyEarnings} /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={s.totalCss}>
                               <div className={s.displayTable}>
                                    <div className={s.displayTableRow}>
                                        <div className={cx(s.displayTableCell, s.widthText, s.textCenterDashboard)}><FormattedMessage {...messages.overAll} /></div>
                                        <div className={cx(s.displayTableCell, s.textRight, s.priceCircle)}><CurrencyConverter from={currency} amount={totalEarnings} /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    // currency: state.currency.base
})

const mapDispatchToProps = {

}

export default injectIntl(withStyles(s)(connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)));
