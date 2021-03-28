import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EditLocationForm from '../../../components/SiteAdmin/EditLocationForm/EditLocationForm'
import s from './EditLocation.css'
import withStyles from 'isomorphic-style-loader/withStyles';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import getLocation from './getLocation.graphql';
import Loader from '../../../components/Common/Loader/Loader';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
export class EditLocation extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired
  }
  static defaultProps = {
    data: {
      loading: true
    }
  }

  render() {

    const { formatMessage } = this.props.intl;
    const { data: { loading, getLocation }, data, id } = this.props;

    let initialValues = {};

    if (!loading && getLocation) {
      initialValues = {
        id: getLocation.id,
        locationName: getLocation.locationName,
        description: getLocation.description,
        path: JSON.parse(getLocation.coordinates),
        isActive: getLocation.isActive,
      }
    }
    if (loading) {
      return <div><Loader type={"page"} show={loading}></Loader></div>
    } else {
      return (
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.heading}>
              {formatMessage(messages.editLocation)}
            </div>
            <div className={s.paddingRoutesSection}>
              <EditLocationForm initialValues={initialValues} />
            </div>
          </div>
        </div>
      )
    }
  }
}

export default compose(
  injectIntl,
  withStyles(s),
  graphql(getLocation, {
    options: (props) => ({
      variables: {
        id: props.id
      },
      fetchPolicy: 'network-only',
      ssr: false
    })
  }))(EditLocation)
