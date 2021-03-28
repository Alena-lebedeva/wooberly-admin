import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './PromoCode.css';
import PromoCodeList from '../../../../components/SiteAdmin/PromoCode/PromoCodeList';
import getAllPromoCodeQuery from './getAllPromoCode.graphql';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import Loader from '../../../../components/Common/Loader/Loader';
import { injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';
class PromoCode extends React.Component {
  static defaultProps = {
    promoCodes: {
      loading: true
    }
  }

  render() {
    const { promoCodes, promoCodes: { loading, getPromoCodes } } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <Loader type={"page"} show={loading}>
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.heading}>
              {formatMessage(messages.managePromoCode)}
            </div>
            <div className={s.paddingRoutesSection}>
              <PromoCodeList promoCodes={promoCodes} />
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
  graphql(getAllPromoCodeQuery, {
    name: 'promoCodes',
    options: {
      ssr: true,
      fetchPolicy: 'network-only',
      variables: {
        currentPage: 1
      }
    }
  }))(PromoCode);
