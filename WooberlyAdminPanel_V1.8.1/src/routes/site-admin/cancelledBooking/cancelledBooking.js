import React, { Component } from 'react'
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Booking.css'
import getCancelledQuery from './getCancelBookings.graphql';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import CancelledBookingList from '../../../components/SiteAdmin/CancelledTrips/CancelBookingList';
import Loader from '../../../components/Common/Loader/Loader';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
export class CancelledBooking extends Component {

    static defaultProps = {
        booking: {
            loading: true
        }
    }

    render() {
        const { formatMessage } = this.props.intl;
        const { cancelledTrips, cancelledTrips: { loading } } = this.props;

        return (
            <Loader type={"page"} show={loading}>
                <div className={s.root}>
                    <div className={s.container}>
                        <div className={s.heading}>
                            {formatMessage(messages.manageCancelledTrips)}
                        </div>
                        <div className={s.paddingRoutesSection}>
                            <CancelledBookingList cancelledTrips={cancelledTrips} />
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
    graphql(getCancelledQuery, {
        name: 'cancelledTrips',
        options: {
            variables: {
                currentPage: 1,
                searchList: ''
            },
            fetchPolicy: 'network-only'
        }
    })
)(CancelledBooking);
