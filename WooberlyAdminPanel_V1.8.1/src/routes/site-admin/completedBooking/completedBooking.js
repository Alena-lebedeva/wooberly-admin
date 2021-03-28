import React, { Component } from 'react'
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Booking.css'
import getCompletedBookingsQuery from './getCompletedBookings.graphql';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import CompletedBookingList from '../../../components/SiteAdmin/CompletedTrips/CompletedBookingList';
import Loader from '../../../components/Common/Loader/Loader';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
export class CompletedBooking extends Component {

    static defaultProps = {
        booking: {
            loading: true
        }
    }

    render() {
        const { formatMessage } = this.props.intl;
        const { completedTrips, completedTrips: { loading } } = this.props;

        return (
            <Loader type={"page"} show={loading}>
                <div className={s.root}>
                    <div className={s.container}>
                        <div className={s.heading}>
                            {formatMessage(messages.manageCompletedTrips)}
                        </div>
                        <div className={s.paddingRoutesSection}>
                            <CompletedBookingList completedTrips={completedTrips} />
                        </div>
                    </div>
                </div>
            </Loader>
        );
    }
}

export default compose(
    injectIntl,
    withStyles(s),
    graphql(getCompletedBookingsQuery, {
        name: 'completedTrips',
        options: {
            variables: {
                currentPage: 1,
                searchList: ''
            },
            fetchPolicy: 'network-only'
        }
    })
)(CompletedBooking);
