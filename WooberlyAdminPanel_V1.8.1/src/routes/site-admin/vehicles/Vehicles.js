import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Vehicles.css';
import VehiclesList from '../../../components/Vehicle/VehicleList';
import getAllVehiclesQuery from './getAllVehicles.graphql';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import Loader from '../../../components/Common/Loader/Loader';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
class Vehicles extends React.Component {
  static propTypes = {
    getAllVehicles: PropTypes.shape({
      getAllVehicles: PropTypes.array
    }),
  };

  static defaultProps = {
    vehicles: {
      loading: true
    }
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { vehicleListDetails, vehicleListDetails: { loading, getAllVehicles } } = this.props;

    return (
      <Loader type={"page"} show={loading}>
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.heading}>
              {formatMessage(messages.vehiclesMenu)}
            </div>
            <div className={s.paddingRoutesSection}>
              <VehiclesList vehicleListDetails={vehicleListDetails} />
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
  graphql(getAllVehiclesQuery, {
    name: 'vehicleListDetails',
    options: {
      ssr: true
    }
  }))(Vehicles);
