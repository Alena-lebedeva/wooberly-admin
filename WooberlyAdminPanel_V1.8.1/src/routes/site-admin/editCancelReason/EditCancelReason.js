import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EditCancelReasonForm from '../../../components/SiteAdmin/EditCancelReasonForm'
import AddCancelReasonForm from '../../../components/SiteAdmin/AddCancelReasonForm'
import getCancelReason from './getCancelReason.graphql'
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import s from './EditCancelReason.css'
import withStyles from 'isomorphic-style-loader/withStyles';
import Loader from '../../../components/Common/Loader/Loader';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
export class EditCancelReason extends Component {

    render() {
        const { formatMessage } = this.props.intl;
        const { id, cancelReason: { getCancelReason, loading} } = this.props;
        
        let initialValues = {};

        if (!loading && getCancelReason) {
            initialValues = {
                id: getCancelReason && getCancelReason.result[0].id,
                reason: getCancelReason && getCancelReason.result[0].reason,
                userType: getCancelReason && getCancelReason.result[0].userType,
                isActive: getCancelReason && getCancelReason.result[0].isActive
            }
        }
        if (loading) {
            return <div><Loader type={"page"} show={loading}></Loader></div>
        } else {
            
            return (
            <div className={s.root}>
                <div className={s.container}>
                    <div className={s.heading}>
                        {formatMessage(messages.editCancelReason)}
                    </div>
                    <div className={s.paddingRoutesSection}>
                        <AddCancelReasonForm initialValues={initialValues} />
                    </div>
                </div>
            </div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default compose(
    injectIntl,
    withStyles(s),
    connect(mapStateToProps, mapDispatchToProps),
    graphql(getCancelReason, {
        name: 'cancelReason',
        options: (props) => ({
            variables: {
                id: props.id
            },
            ssr: false,
            fetchPolicy: 'network-only'
        })
    })
) (EditCancelReason)
