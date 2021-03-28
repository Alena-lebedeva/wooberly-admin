import React, { Component } from 'react'
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Booking.css'
import getAllBookingsQuery from './getAllBookings.graphql';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import BookingList from '../../../components/Booking/BookingList';
import Loader from '../../../components/Common/Loader/Loader';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
export class Booking extends Component {

    static defaultProps = {
        booking: {
            loading: true
        }
    }

    render() {
        const { formatMessage } = this.props.intl;
        const { bookingDetails, bookingDetails: { loading } } = this.props;

        return (
            <Loader type={"page"} show={loading}>
                <div className={s.root}>
                    <div className={s.container}>
                        <div className={s.heading}>
                            {formatMessage(messages.bookingsMenu)}
                        </div>
                        <div className={s.paddingRoutesSection}>
                            <BookingList bookingType={1} bookingDetails={bookingDetails} />
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
    graphql(getAllBookingsQuery, {
        name: 'bookingDetails',
        options: {
            variables: {
                currentPage: 1,
                bookingType: 1
            },
            fetchPolicy: 'network-only'
        }
    })
)(Booking);
