import React, { Component } from 'react'
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './FailedPayout.css'
import getFailedPayoutList from './getFailedPayoutList.graphql';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import FailedPayoutList from '../../../components/SiteAdmin/FailedPayout/FailedPayoutList';
import Loader from '../../../components/Common/Loader/Loader';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
export class FailedPayout extends Component {

    static defaultProps = {
        booking: {
            loading: true
        }
    }

    render() {
        const { getFailedPayoutData, getFailedPayoutData: { loading } } = this.props;
        const { formatMessage } = this.props.intl;
        return (
            <Loader type={"page"} show={loading}>
            <div className={s.root}>
                <div className={s.container}>
                    <div className={s.heading}>
                        {formatMessage(messages.manageFailedPayout)}
                    </div>
                    <div className={s.paddingRoutesSection}>
                        <FailedPayoutList getFailedPayoutData={getFailedPayoutData} />
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
    graphql(getFailedPayoutList, {
        name: 'getFailedPayoutData',
        options: {
            variables: {
                currentPage: 1,
                searchList: ''
            },
            fetchPolicy: 'network-only'
        }
    })
)(FailedPayout);
