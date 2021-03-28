import React, { Component } from 'react'
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Currency.css'
import getCurrency from './currencyList.graphql';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import CurrencyList from '../../../components/SiteAdmin/Currency/CurrencyList';
import Loader from '../../../components/Common/Loader/Loader';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
export class Currency extends Component {

    static defaultProps = {
        booking: {
            loading: true
        }
    }

    render() {
        const { formatMessage } = this.props.intl;
        const { CurrencyData, CurrencyData: { loading } } = this.props;
        
        return (
            <Loader type={"page"} show={loading}>
            <div className={s.root}>
                <div className={s.container}>
                    <div className={s.heading}>
                        {formatMessage(messages.currencyList)}
                    </div>
                    <div className={s.paddingRoutesSection}>
                        <CurrencyList CurrencyData={CurrencyData} />
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
    graphql(getCurrency, {
        name: 'CurrencyData',
        options: {
            variables: {
                currentPage: 1,
                searchList: ''
            },
            fetchPolicy: 'network-only',
            ssr: true
        }
    })
)(Currency);
