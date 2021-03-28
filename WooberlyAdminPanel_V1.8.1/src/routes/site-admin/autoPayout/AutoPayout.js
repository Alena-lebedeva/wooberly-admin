import React, { Component } from 'react'
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './AutoPayout.css'
import getPayoutList from './getPayoutList.graphql';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import AutoPayoutList from '../../../components/SiteAdmin/AutoPayout/AutoPayoutList';
import Loader from '../../../components/Common/Loader/Loader';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
export class AutoPayout extends Component {

    static defaultProps = {
        booking: {
            loading: true
        }
    }

    render() {
        const { formatMessage } = this.props.intl;
        const { getPayoutData, getPayoutData: { loading } } = this.props;
        return (
            <Loader type={"page"} show={loading}>
            <div className={s.root}>
                <div className={s.container}>
                    <div className={s.heading}>
                        {formatMessage(messages.driverPayout)}
                    </div>
                    <div className={s.paddingRoutesSection}>
                        <AutoPayoutList getPayoutData={getPayoutData} />
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
    graphql(getPayoutList, {
        name: 'getPayoutData',
        options: {
            variables: {
                currentPage: 1,
                searchList: ''
            },
            fetchPolicy: 'network-only'
        }
    })
)(AutoPayout);
