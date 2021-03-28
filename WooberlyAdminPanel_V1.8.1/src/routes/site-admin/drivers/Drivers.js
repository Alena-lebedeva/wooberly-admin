import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Drivers.css';
import DriversList from '../../../components/Drivers/DriversList';
import getAllDriversQuery from './getAllDrivers.graphql';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import Loader from '../../../components/Common/Loader/Loader';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages'
class Drivers extends React.Component {
  static propTypes = {
    getAllDrivers: PropTypes.shape({
      getAllDrivers: PropTypes.array
    }),
  };

  static defaultProps = {
    driversDetails: {
      loading: true
    }
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { driversDetails, driversDetails: { loading, getAllDrivers } } = this.props;

    return (
      <Loader type={"page"} show={loading}>
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.heading}>
              {formatMessage(messages.driverMenu)}
            </div>
            <div className={s.paddingRoutesSection}>
              <DriversList driverDetails={driversDetails} />
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
  graphql(getAllDriversQuery, {
    name: 'driversDetails',
    options: {
      ssr: true,
      fetchPolicy: 'network-only'
    }
  }))(Drivers);
