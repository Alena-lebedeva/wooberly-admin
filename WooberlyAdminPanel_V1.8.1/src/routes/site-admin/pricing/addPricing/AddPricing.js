import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { flowRight as compose } from 'lodash';

import s from './AddPricing.css';
import PricingForm from '../../../../components/SiteAdmin/Pricing/PricingForm';
import { injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';
class AddPricing extends React.Component {

  render() {
    const { formatMessage } = this.props.intl;
    const { locations, categories } = this.props;

    return (
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.heading}>
              {formatMessage(messages.addFare)}
            </div>
            <div className={s.paddingRoutesSection}>
              <PricingForm 
                locations={locations} 
                categories={categories} 
                initialValues={{currency: 'USD', isActive: 'true'}}
              />
            </div>
          </div>
        </div>
    );
  }
}

export default compose(
  injectIntl,
  withStyles(s),
  graphql(gql`
    query {
      getAllLocation {
          LocationData {
              id
              locationName
              isActive
          }
      }
    }`, {
    name: 'locations',
    options: (props) => ({
      ssr: true,
      fetchPolicy: 'network-only'
    })
  }),
  graphql(gql`
    query {
      getOverallCategory {
      count
        categoryData{
            id
            categoryName
            isActive
        }
      }
    }`, {
    name: 'categories',
    options: (props) => ({
      ssr: true,
      fetchPolicy: 'network-only'
    })
  })
)(AddPricing);
