import React, { Component } from 'react'
import StaticPageEditForm from '../../../components/SiteAdmin/StaticPageEditForm'
import { flowRight as compose } from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './EditStaticPage.css';
import getEditStaticPage from './getEditStaticPage.graphql'
import Loader from '../../../components/Common/Loader/Loader';
import { graphql } from 'react-apollo'
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
export class EditStaticPage extends Component {

  static defaultProps = {
    data: {
      loading: true
    }
  }

  render() {
    const { data: { loading, getEditStaticPage } } = this.props;
    const { formatMessage } = this.props.intl;
    let title = formatMessage(messages.staticpageManagement);
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.heading}>
            {title}
          </div>
          <div className={s.paddingRoutesSection}>
            <Loader type={"page"} show={loading}>
              {!loading && <StaticPageEditForm title={title} initialValues={getEditStaticPage} />}
            </Loader>
          </div>
        </div>
      </div>
    )
  }
}


export default compose(injectIntl, withStyles(s), graphql(getEditStaticPage, {
  options: (props) => ({
    variables: {
      id: props.id
    },
    fetchPolicy: 'network-only',
    ssr: false
  })
}))(EditStaticPage)
