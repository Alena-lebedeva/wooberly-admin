import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Pricing.css';
import PricingList from '../../../../components/SiteAdmin/Pricing/PricingList';
import getAllPricingQuery from './getAllPricing.graphql';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import Loader from '../../../../components/Common/Loader/Loader';
import { injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';
class Pricing extends React.Component {

  render() {
    const { formatMessage } = this.props.intl;
    const { pricingDetails, pricingDetails: { loading } } = this.props;

    return (
      <Loader type={"page"} show={loading}>
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.heading}>
              {formatMessage(messages.manageFare)}
            </div>
            <div className={s.paddingRoutesSection}>
              <PricingList pricingDetails={pricingDetails} />
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
  graphql(getAllPricingQuery, {
    name: 'pricingDetails',
    options: {
      ssr: true,
      fetchPolicy: 'network-only',
      variables: {
        currentPage: 1,
        searchKeyword: ''
      }
    }
  }))(Pricing);
