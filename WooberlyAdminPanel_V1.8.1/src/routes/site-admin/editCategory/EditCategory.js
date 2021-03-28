import React, { Component } from 'react';
import EditCategoryForm from '../../../components/SiteAdmin/EditCategoryForm';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import getCategory from './getCategory.graphql';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './EditCategory.css';
import Loader from '../../../components/Common/Loader/Loader';


export class EditCategory extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired
    }
    static defaultProps = {
        data: {
            loading: true
        }
    }
    render() {
        const { data: { loading, getCategory }, data, id } = this.props;

        let initialValues = {};

        if (!loading && getCategory) {
            initialValues = {
                id: getCategory.id,
                categoryName: getCategory.categoryName,
                basePrice: getCategory.basePrice,
                unitPrice: getCategory.unitPrice,
                minutePrice: getCategory.minutePrice,
                capacity: getCategory.capacity,
                currency: getCategory.currency,
                riderFeeValue: getCategory.riderFeeValue,
                categoryImage: getCategory.categoryImage,
                driverFeeValue: getCategory.driverFeeValue,
                categoryMarkerImage: getCategory.categoryMarkerImage,
                isActive: getCategory.isActive
            }
        }
        if (loading) {
            return <div><Loader type={"page"} show={loading}></Loader></div>
        } else {
            return (
                <div className={s.paddingRoutesSection}>
                    <EditCategoryForm initialValues={initialValues} />
                </div>
            )
        }
    }
}

export default compose(withStyles(s),graphql(getCategory, {
    options: (props) => ({
        variables: {
            id: props.id
        },
        fetchPolicy: 'network-only',
        ssr: false
    })
}))(EditCategory)
