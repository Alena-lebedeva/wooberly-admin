import React, { Component } from 'react'
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Ratings.css'
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import ManageRatings from '../../../components/SiteAdmin/ManageRatings'
import Loader from '../../../components/Common/Loader/Loader';
import getReviews from './getReviews.graphql'
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
export class Ratings extends Component {

    static defaultProps = {
        booking: {
            loading: true
        }
    }

    render() {
        const { reviews, reviews: { loading, getReviews } } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <Loader type={"page"} show={loading}>
                <div className={s.root}>
                    <div className={s.container}>
                        <div className={s.heading}>
                            {formatMessage(messages.ratings)}
                        </div>
                        <div className={s.paddingRoutesSection}>
                            <ManageRatings reviews={reviews} />
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
    graphql(getReviews, {
        name: 'reviews',
        options: {
            variables: {
                currentPage: 1,
                searchList: ''
            },
            fetchPolicy: 'network-only'
        }
    })
)(Ratings);
