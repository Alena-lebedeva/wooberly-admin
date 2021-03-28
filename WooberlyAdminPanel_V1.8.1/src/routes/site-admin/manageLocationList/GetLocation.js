import React, { Component } from 'react'
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './ManageLocation.css'
import getLocationList from './getLocationList.graphql';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import LocationList from '../../../components/SiteAdmin/ManageLocationList/LocationList';
import Loader from '../../../components/Common/Loader/Loader';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages'
export class getLocation extends Component {

    static defaultProps = {
        booking: {
            loading: true
        }
    }

    render() {
        const { formatMessage } = this.props.intl;
        const { locationList, locationList: { loading } } = this.props;

        return (
            <Loader type={"page"} show={loading}>
                <div className={s.root}>
                    <div className={s.container}>
                        <div className={s.heading}>
                            {formatMessage(messages.location)}
                        </div>
                        <div className={s.paddingRoutesSection}>
                            <LocationList locationList={locationList} />
                        </div>
                    </div>
                </div>
            </Loader>
        );
    }
}

export default compose(
    injectIntl,
    withStyles(s),
    graphql(getLocationList, {
        name: 'locationList',
        options: {
            variables: {
                currentPage: 1,
                searchList: ''
            },
            fetchPolicy: 'network-only'
        }
    })
)(getLocation);
