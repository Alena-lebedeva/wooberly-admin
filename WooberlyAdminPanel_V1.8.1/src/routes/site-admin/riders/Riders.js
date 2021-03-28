import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Riders.css';
import RiderList from '../../../components/Riders/RidersList';
import getAllRidersQuery from './getAllRiders.graphql';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import Loader from '../../../components/Common/Loader/Loader';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages'
class Rider extends React.Component {
  static defaultProps = {
    riderDetails: {
      loading: true
    }
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { riderDetails, riderDetails: { loading, getAllRiders } } = this.props;

    return (
      <Loader type={"page"} show={loading}>
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.heading}>
              {formatMessage(messages.ridersMenu)}
            </div>
            <div className={s.paddingRoutesSection}>
              <RiderList riderDetails={riderDetails} />
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
  graphql(getAllRidersQuery, {
    name: 'riderDetails',
    options: {
      ssr: true,
      fetchPolicy: 'network-only'
    }
  }))(Rider);
