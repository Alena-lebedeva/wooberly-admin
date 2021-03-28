import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/withStyles';
import { Table, FormControl } from 'react-bootstrap';
import s from './BookingList.css';
import bt from '../../../components/commonStyle.css';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import messages from '../../../locale/messages';
import CustomPagination from '../../CustomPagination';
import { flowRight as compose } from 'lodash';
import PropTypes from 'prop-types';
import Link from '../../Link/Link';
import CurrencyConverter from '../../CurrencyConverter'
import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirst';
import ExportImage from '../../../../public/Icons/export.png';
import debounce from '../../../helpers/debounce';
export class CompletedBookingList extends Component {
    static propTypes = {
        completedTrips: PropTypes.object,
    }
    constructor(props) {
        super(props)

        this.state = {
            currentPage: 1,
        }
        this.paginationData = this.paginationData.bind(this);
        this.handleKeywordSearch = debounce(this.handleKeywordSearch.bind(this), 250);
    }
    handleKeywordSearch(searchList) {
        const { completedTrips: { refetch } } = this.props
        let variables = {
            currentPage: 1,
            searchList
        }
        this.setState(variables)
        refetch(variables)
    }
    paginationData(currentPage) {
        const { completedTrips: { refetch } } = this.props;
        let variables = { currentPage };
        this.setState({ currentPage });
        refetch(variables);
    }
    render() {
        const { completedTrips, completedTrips: { getCompletedBookings } } = this.props;
        const { currentPage, searchList } = this.state;
        const { formatMessage } = this.props.intl;
        let status = ['completed'];
        return (
            <div className={s.widthInner}>
                <div className={s.exportDisplay}>
                    <div className={s.searchInput}>
                        <FormControl type='text' placeholder={formatMessage(messages.searchOnly)} onChange={(e) => this.handleKeywordSearch(e.target && e.target.value)} className={bt.formControlInput} />
                    </div>
                    <div className={s.exportTextSection}>
                        {
                            completedTrips && completedTrips.getCompletedBookings && completedTrips.getCompletedBookings.bookingData && completedTrips.getCompletedBookings.bookingData.length > 0 && <a
                                href={`/export-admin-data?type=bookings&status[0]=completed&keyword=${searchList ? searchList : ''}`}
                                className={cx('pull-right', s.exportText)}>
                                <span className={cx(s.vtrMiddle, s.exportText)}><FormattedMessage {...messages.exportDataIntoCSV} /></span>
                                <span className={s.vtrTextBottom}>
                                    <img src={ExportImage} className={s.exportImg} />
                                </span>
                            </a>
                        }
                    </div>
                </div>
                <div className={cx(s.tableCss, 'tableCss', 'tableSticky', 'NewResponsiveTable')}>
                    <Table className="table">
                        <thead>
                            <tr>
                                <th scope="col"><FormattedMessage {...messages.id} /></th>
                                {/* <th scope="col"><FormattedMessage {...messages.pickUpLocation} /></th>
                                <th scope="col"><FormattedMessage {...messages.dropLocation} /></th> */}
                                <th scope="col"><FormattedMessage {...messages.riderName} /></th>
                                <th scope="col"><FormattedMessage {...messages.driverName} /></th>
                                <th scope="col"><FormattedMessage {...messages.category} /></th>
                                <th scope="col"><FormattedMessage {...messages.vehicleNumber} /></th>
                                <th scope="col"><FormattedMessage {...messages.tripStatus} /></th>
                                {/* <th scope="col"><FormattedMessage {...messages.totalRideDistance} /></th>
                                <th scope="col"><FormattedMessage {...messages.totalDuration} /></th> */}
                                <th scope="col"><FormattedMessage {...messages.totalFare} /></th>
                                <th scope="col"><FormattedMessage {...messages.tollFee} /></th>
                                <th scope="col"><FormattedMessage {...messages.details} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                completedTrips && completedTrips.getCompletedBookings && completedTrips.getCompletedBookings.bookingData && completedTrips.getCompletedBookings.bookingData.length > 0 && completedTrips.getCompletedBookings.bookingData.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td data-label={formatMessage(messages.id)}>{item.id}</td>
                                            {/* <td data-label={formatMessage(messages.id)}>{item.pickUpLocation}</td>
                                            <td data-label={formatMessage(messages.id)}>{item.dropOffLocation}</td> */}
                                            <td data-label={formatMessage(messages.riderName)}>{item && item.riderDetails && capitalizeFirstLetter(item.riderDetails.firstName)}</td>
                                            <td data-label={formatMessage(messages.driverName)}>{item && item.driverDetails && capitalizeFirstLetter(item.driverDetails.firstName)}</td>
                                            <td data-label={formatMessage(messages.category)}>{item && item.categoryDetails && item.categoryDetails.categoryName}</td>
                                            <td data-label={formatMessage(messages.vehicleNumber)}>{item && item.vehicleNumber && item.vehicleNumber.toUpperCase()}</td>
                                            <td data-label={formatMessage(messages.tripStatus)}>{item.tripStatus && messages[item.tripStatus] ? formatMessage(messages[item.tripStatus]) : item.tripStatus}</td>
                                            {/* <td data-label={formatMessage(messages.id)}>{item.totalRideDistance}</td>
                                            <td data-label={formatMessage(messages.id)}>{item.totalDuration}</td> */}
                                            <td data-label={formatMessage(messages.totalFare)}><CurrencyConverter from={item.currency} amount={item.totalFare} /></td>
                                            <td data-label={formatMessage(messages.tollFee)}><CurrencyConverter from={item.currency} amount={item.tollFee} /></td>
                                            <td data-label={formatMessage(messages.details)}><Link to={'/siteadmin/completed-bookings/view/' + item.id}><FormattedMessage {...messages.view} /></Link></td>
                                        </tr>
                                    )
                                })
                            }
                            {
                                completedTrips && completedTrips.getCompletedBookings && completedTrips.getCompletedBookings.bookingData && completedTrips.getCompletedBookings.bookingData.length == 0 && (
                                    <tr>
                                        <td colspan="12" className={s.noRecords}><FormattedMessage {...messages.noResult} /></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
                {
                    completedTrips && completedTrips.getCompletedBookings && completedTrips.getCompletedBookings.bookingData && completedTrips.getCompletedBookings.bookingData.length > 0
                    && <div className={cx(bt.space5, bt.spaceTop5)}>
                        <CustomPagination
                            total={completedTrips.getCompletedBookings.count}
                            currentPage={currentPage}
                            defaultCurrent={1}
                            defaultPageSize={10}
                            change={this.paginationData}
                            paginationLabel={formatMessage(messages.manageCompletedTrips)}
                        />
                    </div>
                }
            </div>
        )
    }
}
export default compose(injectIntl,
    withStyles(s, bt)
)(CompletedBookingList);

