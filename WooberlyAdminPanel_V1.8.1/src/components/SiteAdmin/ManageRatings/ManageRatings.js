import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/withStyles';
import { Table, FormControl } from 'react-bootstrap';
import moment from 'moment';
import s from './ManageRatings.css';
import bt from '../../../components/commonStyle.css';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import messages from '../../../locale/messages';
import CustomPagination from '../../CustomPagination/CustomPagination';
import { flowRight as compose } from 'lodash';
import PropTypes from 'prop-types';
import Link from '../../Link/Link';
import StarRating from '../../StarRating'
import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirst'

export class ManageRatings extends Component {
    static propTypes = {
        reviews: PropTypes.object,
    }
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
        }
        this.paginationData = this.paginationData.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this)
    }
    handleSearchClick(searchList) {
        const { reviews: { refetch }} = this.props
        let variables = {
          currentPage: 1,
          searchList: searchList
        }
        this.setState({ currentPage: 1 })
        refetch(variables)
    }
    handleSearchChange(e) {
        let self = this
        if(self.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout)
        }
        self.setState({
            searchList: e.target.value,
            typing: false,
            typingTimeout: setTimeout(function() {
            self.handleSearchClick(self.state.searchList)
            }, 450)
        })
    }
    paginationData(currentPage) {
        const { reviews: { refetch } } = this.props;
        let variables = { currentPage };
        this.setState({ currentPage });
        refetch(variables);
    }
    render() {  
        const { reviews, reviews: { getReviews } } = this.props;
        const { currentPage } = this.state;
        const { formatMessage } = this.props.intl;
        return (
            <div className={s.widthInner}>
                <div className={s.searchInput}>
                <FormControl type='text' placeholder={formatMessage(messages.searchOnly)} onChange={(e) => this.handleSearchChange(e)}  className={bt.formControlInput} />
                </div>
                <div className={cx(s.tableCss, 'tableCss', 'tableSticky', 'NewResponsiveTable')}>
                    <Table className="table">
                        <thead>
                            <tr>
                                <th scope="col"><FormattedMessage {...messages.id} /></th>
                                <th scope="col"><FormattedMessage {...messages.tripDate} /></th>
                                <th scope="col"><FormattedMessage {...messages.riderName} /></th>
                                <th scope="col"><FormattedMessage {...messages.driverName} /></th>
                                <th scope="col"><FormattedMessage {...messages.ratings} /></th>
                                <th scope="col"><FormattedMessage {...messages.reviewsBy} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                reviews && reviews.getReviews && reviews.getReviews.reviewsData && reviews.getReviews.reviewsData.length > 0 && reviews.getReviews.reviewsData.map((item, index) => {
                                    let reviewBy = (item.authorId==item.bookingDetails.riderDetails.userId)?"rider":"driver";
                                    return (
                                        <tr key={index}>
                                            <td data-label={formatMessage(messages.id)}>{item.id}</td>
                                            <td data-label={formatMessage(messages.tripDate)}>{moment(item.bookingDetails.tripStart).format('DD-MM-YYYY')}</td>
                                            <td data-label={formatMessage(messages.riderName)}>{capitalizeFirstLetter(item.bookingDetails.riderDetails.firstName)}</td>
                                            <td data-label={formatMessage(messages.driverName)}>{capitalizeFirstLetter(item.bookingDetails.driverDetails.firstName)}</td>
                                            <td data-label={formatMessage(messages.ratings)} className={'ratingSection'}><StarRating value={item.ratings} name={'review'}/></td>
                                            <td data-label={formatMessage(messages.reviewsBy)} className={'commandSection'}><FormattedMessage {...messages[reviewBy]} /></td>
                                        </tr>
                                    )
                                })
                            }
                            {
                               reviews && reviews.getReviews && reviews.getReviews.reviewsData && reviews.getReviews.reviewsData.length ==0 && (   
                                <tr>
                                    <td colspan="12" className={s.noRecords}><FormattedMessage {...messages.noResult} /></td>
                                </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
                {
                        reviews && reviews.getReviews && reviews.getReviews.reviewsData && reviews.getReviews.reviewsData.length > 0
                        && <div className={cx(bt.space5, bt.spaceTop5)}>
                            <CustomPagination
                                total={reviews.getReviews.count}
                                currentPage={currentPage}
                                defaultCurrent={1}
                                defaultPageSize={10}
                                change={this.paginationData}
                                paginationLabel={formatMessage(messages.ratings)}
                            />
                        </div>
                    }
            </div>
        )
    }
}
export default compose(injectIntl,
    withStyles(s, bt)
)(ManageRatings);

