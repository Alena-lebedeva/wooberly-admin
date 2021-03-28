import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import getPromoCodeQuery from './getPromoCode.graphql';

import s from './EditPromoCode.css';
import PromoCodeForm from '../../../../components/SiteAdmin/PromoCode/PromoCodeForm';

class EditPromoCode extends React.Component {
  static defaultProps = {
    promoCode: {
      loading: true
    }
  };

  render() {
    const { title, promoCode: { loading, getPromoCode } } = this.props;
    
    let initialValues = {};

    if (!loading && getPromoCode) {
      initialValues = getPromoCode;
    }

    return (
      <div className={s.paddingRoutesSection}>
        {
          !loading && <PromoCodeForm initialValues={initialValues} />
        }
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(getPromoCodeQuery, {
    name: 'promoCode',
    options: (props) => ({
      ssr: true,
      fetchPolicy: 'network-only',
      variables: {
        id: props.id
      }
    })
  }))(EditPromoCode);
