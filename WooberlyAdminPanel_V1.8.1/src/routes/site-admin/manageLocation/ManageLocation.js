import React, { Component } from 'react'
import { connect } from 'react-redux'
import ManageLocationForm from '../../../components/SiteAdmin/ManageLocation/ManageLocationForm'
import s from './ManageLocation.css'
import withStyles from 'isomorphic-style-loader/withStyles';
import { flowRight as compose } from 'lodash';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
export class ManageLocation extends Component {

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.heading}>
            {formatMessage(messages.addLocation)}
          </div>
          <div className={s.paddingRoutesSection}>
            <ManageLocationForm />
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
)(ManageLocation)
