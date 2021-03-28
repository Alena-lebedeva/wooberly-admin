import React, { Component } from 'react';
import CitySettingsForm from '../../../components/SiteAdmin/CitySettingsForm/CitySettingsForm'
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import getAllHomePageSettings from './getAllHomePageSettings.graphql';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './CitySettings.css';
import Loader from '../../../components/Common/Loader/Loader';


export class CitySettings extends Component {
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
                    { !loading && <CitySettingsForm initialValues={homepageCollection} /> }
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
}))(CitySettings)
