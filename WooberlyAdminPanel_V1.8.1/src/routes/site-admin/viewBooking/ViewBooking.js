import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './ViewBooking.css';
import viewBookingDetails from './viewBookingDetails.graphql';
import ViewBookingDetails from '../../../components/ViewBookingDetails';
import Loader from '../../../components/Common/Loader/Loader';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
export class ViewBooking extends Component {
    static propTypes = {
        data: PropTypes.shape({
            viewBookingDetails: PropTypes.object
        }),
    };

    static defaultProps = {
        data: {
            loading: true
        }
    };

    render() {
        const { formatMessage } = this.props.intl;
        const { data: { loading, viewBookingDetails, refetch }, from } = this.props;
        let title = formatMessage(messages.bookingDetails);
        if (loading) {
            return <div><Loader type={"page"} show={loading}></Loader></div>
        } else {
            return (
                <div className={s.paddingRoutesSection}>
                    <ViewBookingDetails data={viewBookingDetails}
                        title={title}
                        refetch={refetch}
                        from={from}
                    />
                </div>
            )
        }

    }
}

export default compose(
    injectIntl,
    withStyles(s),
    graphql(viewBookingDetails,
        {
            options: (props) => ({
                variables: {
                    id: props.id
                },
                fetchPolicy: 'network-only',
                ssr: false
            })
        })
)(ViewBooking);
