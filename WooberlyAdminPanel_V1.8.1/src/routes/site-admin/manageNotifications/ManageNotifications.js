import React, { Component } from 'react'
import ManageNotificationsForm from '../../../components/SiteAdmin/ManageNotificationsForm'
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './ManageNotifications.css';
import getSiteSettings from './getSiteSettings.graphql'
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
export class ManageNotifications extends Component {
  render() {
    const { formatMessage } = this.props.intl;
    const { getSiteSettings: { loading, getSiteSettings } } = this.props
    return (
      <div>
        { !loading &&
          <div className={s.root}>
            <div className={s.container}>
              <div className={s.heading}>
                {formatMessage(messages.manageNotifications)}
              </div>
              <div className={s.paddingRoutesSection}>
                <ManageNotificationsForm getSiteSettings={getSiteSettings} />
              </div>
            </div>
          </div>}
      </div>
    )
  }
}


export default compose(
  injectIntl,
  withStyles(s),
  graphql(getSiteSettings, {
    name: 'getSiteSettings',
    options: {
      fetchPolicy: 'network-only',
    }
  })
)(ManageNotifications)
