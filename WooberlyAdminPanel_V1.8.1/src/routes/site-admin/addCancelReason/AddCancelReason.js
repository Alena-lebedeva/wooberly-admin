import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AddCancelReasonForm from '../../../components/SiteAdmin/AddCancelReasonForm'
import s from './AddCancelReason.css'
import withStyles from 'isomorphic-style-loader/withStyles';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
export class AddCancelReason extends Component {

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.heading}>
            {formatMessage(messages.addCancelReason)}
          </div>
          <div className={s.paddingRoutesSection}>
            <AddCancelReasonForm />
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
  connect(mapStateToProps, mapDispatchToProps)
)(AddCancelReason)
