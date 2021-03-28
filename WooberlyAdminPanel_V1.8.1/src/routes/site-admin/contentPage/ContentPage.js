import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './ContentPage.css';

import getContentPageDetails from './getContentPageDetails.graphql';
import ContentPageList from '../../../components/SiteAdmin/ContentPage/ContentPageList';
import Loader from '../../../components/Common/Loader/Loader';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
export class ContentPage extends Component {

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getContentPageDetails: PropTypes.any
    })
  };

  static defaultProps = {
    data: {
      loading: true
    }
  };

  render() {
    const { data: { loading, getContentPageDetails } } = this.props;
    const { formatMessage } = this.props.intl;
    let title = formatMessage(messages.contentpageManagement);
    return (
      <Loader type={"page"} show={loading}>
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.heading}>
              {title}
            </div>
            <div className={s.paddingRoutesSection}>
              <ContentPageList
                data={getContentPageDetails}
                title={title}
              />

            </div>
          </div>
        </div>
      </Loader>
    )
  }
}


export default compose(
  injectIntl,
  withStyles(s),
  graphql(getContentPageDetails,
    {
      options: {
        fetchPolicy: 'network-only',
        ssr: false
      }
    })
)(ContentPage)
