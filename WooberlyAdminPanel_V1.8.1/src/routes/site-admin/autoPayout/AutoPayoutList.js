import React, { Component } from 'react'
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './AutoPayout.css'
import getPayoutList from './getPayoutList.graphql';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import AutoPayoutForm from '../../../components/SiteAdmin/AutoPayout/AutoPayoutForm';
import Loader from '../../../components/Common/Loader/Loader';

export class AutoPayoutList extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired
    }

    static defaultProps = {
        booking: {
            loading: true
        }
    }

    render() {
        
        const { title, getPayoutData, getPayoutData: { loading } } = this.props;
       
        return (
            <Loader type={"page"} show={loading}>
            <div className={s.root}>
                <div className={s.container}>
                    <div className={s.heading}>
                        {title}
                    </div>
                    <div className={s.paddingRoutesSection}>
                        <AutoPayoutForm getPayoutData={getPayoutData} />
                    </div>
                </div>
            </div>
            </Loader>
        );
    }
}

export default compose(
    withStyles(s),
    graphql(getPayoutList, {
        name: 'getPayoutData',
        options: {
            variables: {
                currentPage: 1,
                searchList: ''
            },
            fetchPolicy: 'network-only'
        }
    })
)(AutoPayoutList);
