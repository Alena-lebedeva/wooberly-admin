import React, { Component } from 'react';
import { flowRight as compose } from 'lodash';

//Apollo
import { graphql } from 'react-apollo';
import getAllPrecautionNotification from './getAllPrecautionNotification.graphql';

//Intl
import { injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';

//Style
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './PrecautionNotificationPage.css';

//Component
import PrecautionNotificationForm from '../../../../components/SiteAdmin/PrecautionNotificationForm/PrecautionNotificationForm';
import Loader from '../../../../components/Common/Loader/Loader';

class PrecautionNotificationPage extends Component {

    static defaultProps = {
        data: { loading: true }
    }

    render() {
        const { data: { loading, getAllPrecautionNotification } } = this.props;
        const { formatMessage } = this.props.intl;
        let initialValues = { isEnabled: 'true' };
        if (!loading && getAllPrecautionNotification && getAllPrecautionNotification.results && getAllPrecautionNotification.results.length > 0) {
            initialValues = getAllPrecautionNotification.results[0];
            initialValues['isEnabled'] = initialValues.isEnabled ? 'true' : 'false';
        }

        return (
            <div className={s.root}>
                <div className={s.container}>
                    <div className={s.heading}>
                        {formatMessage(messages.precautionNotification)}
                    </div>
                    <div className={s.paddingRoutesSection}>
                        <Loader type={"page"} show={loading}>
                            {!loading && <PrecautionNotificationForm initialValues={initialValues} />}
                        </Loader>
                    </div>
                </div>
            </div>
        )
    }
}


export default compose(
    injectIntl,
    withStyles(s),
    graphql(getAllPrecautionNotification, {
        options: {
            fetchPolicy: 'network-only',
            ssr: false
        }
    }))(PrecautionNotificationPage)