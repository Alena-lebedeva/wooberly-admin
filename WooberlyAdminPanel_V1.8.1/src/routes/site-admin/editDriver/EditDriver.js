import React, { Component } from 'react'
import EditDriverForm from '../../../components/SiteAdmin/EditDriverForm/EditDriverForm';
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash';
import getDriver from './getDriver.graphql';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './EditDriver.css';
import Loader from '../../../components/Common/Loader/Loader';


export class EditDriver extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
    };

    static defaultProps = {
        data: {
            loading: true
        }
    }
    render() {
        const { data: { loading, getDriver }, data, id } = this.props;

        let initialValues = {};

        if (!loading && getDriver) {
            initialValues = {
                id: getDriver.id,
                firstName: getDriver.profile.firstName,
                lastName: getDriver.profile.lastName,
                email: getDriver.email,
                phoneDialCode: getDriver.phoneDialCode,
                phoneNumber: getDriver.phoneNumber,
                userStatus: getDriver.userStatus,
                isBan: getDriver.isBan,
                country: getDriver.profile.country,
                phoneCountryCode: getDriver.phoneCountryCode,
                picture: getDriver.profile.picture,
                licenceFront: getDriver.profile.licenceFront,
                licenceBack: getDriver.profile.licenceBack
            }
        }


        if (loading) {
            return <div><Loader type={"page"} show={loading}></Loader></div>
        } else {
            return (
                <div className={s.paddingRoutesSection}>
                    <EditDriverForm getDriver={getDriver} initialValues={initialValues} />
                </div>
            )
        }
    }
}



export default compose(withStyles(s),graphql(getDriver, {
    options: (props) => ({
        variables: {
            id: props.id
        },
        fetchPolicy: 'network-only',
        ssr: false
    })
}))(EditDriver)
