import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { flowRight as compose } from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './EditContentPage.css';
import { graphql } from 'react-apollo';
import editContentPage from './editContentPage.graphql';
import EditContentPageForm from '../../../components/SiteAdmin/ContentPage/EditContentPageForm';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
export class EditContentPage extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired
  }

  render() {
    const { editContentPageData } = this.props;
    const { formatMessage } = this.props.intl;
    let title = formatMessage(messages.contentpageManagement);
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.heading}>
            {title}
          </div>
          <div className={s.paddingRoutesSection}>
            <EditContentPageForm
              title={title} initialValues={editContentPageData.editContentPage}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default compose(
  injectIntl,
  withStyles(s),
  graphql(editContentPage, {
    name: 'editContentPageData',
    options: (props) => ({
      variables: {
        id: props.id,
      },
      fetchPolicy: 'network-only'
    })
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(EditContentPage)
