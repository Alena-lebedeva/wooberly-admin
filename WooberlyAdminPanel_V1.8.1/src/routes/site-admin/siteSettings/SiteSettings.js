import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './SiteSettings.css';
import SiteSettingsForm from '../../../components/SiteAdmin/SiteSettingsForm';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import getSiteSettings from './getSiteSettings.graphql'
import Loader from '../../../components/Common/Loader/Loader';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages'

export class SiteSettings extends Component {

    render() {
        const { formatMessage } = this.props.intl;
        const { getSiteSettings: { loading, getSiteSettings, refetch } } = this.props;
        let siteSettingsCollection = {}
        
        if(!loading) {
          getSiteSettings.map((item) => {
            siteSettingsCollection[item.name] = item.value
          })
          return (
            <div className={s.root}>
              <div className={s.container}>
                <div className={s.heading}>
                  {formatMessage(messages.siteSettings)}
                </div>
                <div className={s.paddingRoutesSection}>
                  <SiteSettingsForm refetch={refetch} getSiteSettings={getSiteSettings}initialValues={siteSettingsCollection}/>
                </div>
              </div>
            </div>
            )
        }
        else {
          return <Loader type={"page"} show={loading}/>
        }
        
    }
}


export default compose(injectIntl,
  withStyles(s),
  graphql(getSiteSettings, {
    name: 'getSiteSettings',
    options: {
      ssr: true,
      fetchPolicy: 'network-only'
    }
  })
)(SiteSettings)
