import React, { Component } from 'react'
import { flowRight as compose } from 'lodash';

//Apollo
import { graphql } from 'react-apollo';
import getAllBookingsQuery from './getAllBookings.graphql';

//Intl
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

//Style
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './ScheduleBooking.css'

//Components
import BookingList from '../../../components/Booking/BookingList/BookingList';
import Loader from '../../../components/Common/Loader/Loader';

export class ScheduleBooking extends Component {

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
                            {formatMessage(messages.scheduleBooking)}
                        </div>
                        <div className={s.paddingRoutesSection}>
                            <BookingList bookingType={2} bookingDetails={bookingDetails} />
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
                bookingType: 2
            },
            fetchPolicy: 'network-only'
        }
    })
)(ScheduleBooking);
