import React, { Component } from 'react';
import EditVehicleForm from '../../../components/SiteAdmin/EditVehicleForm';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import getVehicle from './getVehicle.graphql';
import getActiveCategories from './getActiveCategories.graphql';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './EditVehicle.css';
import Loader from '../../../components/Common/Loader/Loader';


export class EditVehicle extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired
    }
    static defaultProps = {
        data: {
            loading: true
        }
    }
    render() {
        const { data: { loading, getVehicle }, data, id, getActiveCategories: { getActiveCategories } } = this.props;
        let initialValues = {};

        if (!loading && getVehicle) {
            initialValues = {
                id: getVehicle.id,
                vehicleName: getVehicle.vehicleName,
                vehicleNumber: getVehicle.vehicleNumber,
                vehicleType: getVehicle.vehicleType,
                vehicleStatus: getVehicle.vehicleStatus,
                vehicleRC: getVehicle.vehicleRC,
                vehicleInsurance: getVehicle.vehicleInsurance,
                firstName: getVehicle && getVehicle.user && getVehicle.user.profile && getVehicle.user.profile.firstName,
                lastName: getVehicle && getVehicle.user && getVehicle.user.profile && getVehicle.user.profile.lastName,
            }
        }
        if (loading) {
            return <div><Loader type={"page"} show={loading}></Loader></div>
        } else {
            return (
                <div className={s.paddingRoutesSection}>
                    <EditVehicleForm initialValues={initialValues} getActiveCategories={getActiveCategories} />
                </div>
            )
        }
    }
}

export default compose(withStyles(s),
    graphql(getVehicle, {
        options: (props) => ({
            variables: {
                id: props.id
            },
            fetchPolicy: 'network-only',
            ssr: true
        })
    }), 
    graphql(getActiveCategories, {
        name: 'getActiveCategories',
        options: ({
            fetchPolicy: 'network-only',
            ssr: true
        })
    })
)(EditVehicle)