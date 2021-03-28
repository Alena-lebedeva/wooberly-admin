import React, { Component } from 'react';
import SafetySettingsForm from '../../../components/SiteAdmin/SafetySettingsForm/SafetySettingsForm'
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import getAllHomePageSettings from './getAllHomePageSettings.graphql';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './SafetySettings.css';
import Loader from '../../../components/Common/Loader/Loader';


export class SafetySettings extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired
    }
    static defaultProps = {
        data: {
            loading: true
        }
    }
    render() {
        const { data: { loading, getAllHomePageSettings } } = this.props;
        let initialValues = {};
        let homepageCollection = {};

        getAllHomePageSettings && getAllHomePageSettings.homePageData.map((item) => {
            homepageCollection[item.name] = item.value
          })
        
        return (
            <div className={s.paddingRoutesSection}>
                <Loader type={"page"} show={loading }>
                    { !loading && <SafetySettingsForm initialValues={homepageCollection} /> }
                </Loader>
            </div>
        )
    }
}

export default compose(withStyles(s),graphql(getAllHomePageSettings, {
    options: (props) => ({
        variables: {
            id: props.id
        },
        fetchPolicy: 'network-only',
        ssr: false
    })
}))(SafetySettings)
