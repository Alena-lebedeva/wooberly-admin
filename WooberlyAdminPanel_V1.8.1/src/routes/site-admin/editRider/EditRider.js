import React, { Component } from 'react'
import EditRiderForm from '../../../components/SiteAdmin/EditRiderForm/EditRiderForm';
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash';
import getRider from './getRider.graphql';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './EditRider.css';
import Loader from '../../../components/Common/Loader/Loader';


export class EditRider extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
    };

    static defaultProps = {
        data: {
            loading: true
        }
    }
    render() {
        const { data: { loading, getRider }, data, id } = this.props;

        let initialValues = {};

        if (!loading && getRider) {
            initialValues = {
                id: getRider.id,
                firstName: getRider.profile.firstName,
                lastName: getRider.profile.lastName,
                email: getRider.email,
                phoneDialCode: getRider.phoneDialCode,
                phoneNumber: getRider.phoneNumber,
                userStatus: getRider.userStatus,
                isBan: getRider.isBan,
                country: getRider.profile.country,
                phoneCountryCode: getRider.phoneCountryCode,
                picture: getRider.profile.picture
            }
        }


        if (loading) {
            return <div><Loader type={"page"} show={loading}></Loader></div>
        } else {
            return (
                <div className={s.paddingRoutesSection}>
                    <EditRiderForm initialValues={initialValues} />
                </div>
            )
        }
    }
}



export default compose(withStyles(s),graphql(getRider, {
    options: (props) => ({
        variables: {
            id: props.id
        },
        fetchPolicy: 'network-only',
        ssr: false
    })
}))(EditRider)
