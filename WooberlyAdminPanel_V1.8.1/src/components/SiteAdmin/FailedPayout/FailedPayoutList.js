import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/withStyles';
import { Table, FormControl } from 'react-bootstrap';
import s from './FailedPayoutList.css';
import bt from '../../../components/commonStyle.css';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import messages from '../../../locale/messages';
import CustomPagination from '../../CustomPagination';
import PropTypes from 'prop-types';
import CurrencyConverter from '../../CurrencyConverter'
import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirst';
import { connect } from 'react-redux';

export class FailedPayoutList extends Component {
    static propTypes = {
        getFailedPayoutData: PropTypes.object,
    }
    constructor(props) {
        super(props)

        this.state = {
            currentPage: 1,
        }
        this.paginationData = this.paginationData.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }
    handleSearchClick(searchList) {
        const { getFailedPayoutData: { refetch }} = this.props
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
        const { getFailedPayoutData: { refetch } } = this.props;
        let variables = { currentPage };
        this.setState({ currentPage });
        refetch(variables);
    }
    render() {
        const { getFailedPayoutData, getFailedPayoutData: { getFailedPayoutList } } = this.props;
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
                                <th scope="col"><FormattedMessage {...messages.driverName} /></th>
                                <th scope="col"><FormattedMessage {...messages.amount} /></th>
                                <th scope="col"><FormattedMessage {...messages.reason} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getFailedPayoutData && getFailedPayoutData.getFailedPayoutList && getFailedPayoutData.getFailedPayoutList.bookingData && getFailedPayoutData.getFailedPayoutList.bookingData.length > 0 && getFailedPayoutData.getFailedPayoutList.bookingData.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td data-label={formatMessage(messages.id)}>{item.id}</td>
                                            <td data-label={formatMessage(messages.driverName)}>{item && item.driverDetails && capitalizeFirstLetter(item.driverDetails.firstName)}</td>
                                            <td data-label={formatMessage(messages.amount)}><CurrencyConverter from={item.currency} amount={item.amount}/></td>
                                            <td data-label={formatMessage(messages.reason)}>{item.reason}</td>
                                           
                                        </tr>
                                    )
                                })
                            }
                            {
                               getFailedPayoutData && getFailedPayoutData.getFailedPayoutList && getFailedPayoutData.getFailedPayoutList.bookingData && getFailedPayoutData.getFailedPayoutList.bookingData.length == 0 && (   
                                <tr>
                                    <td colspan="12" className={s.noRecords}><FormattedMessage {...messages.noResult} /></td>
                                </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
                {
                        getFailedPayoutData && getFailedPayoutData.getFailedPayoutList && getFailedPayoutData.getFailedPayoutList.bookingData && getFailedPayoutData.getFailedPayoutList.bookingData.length > 0
                        && <div className={cx(bt.space5, bt.spaceTop5)}>
                            <CustomPagination
                                total={getFailedPayoutData.getFailedPayoutList.count}
                                currentPage={currentPage}
                                defaultCurrent={1}
                                defaultPageSize={10}
                                change={this.paginationData}
                                paginationLabel={formatMessage(messages.drivPayout)}
                            />
                        </div>
                    }
            </div>
        )
    }
}
const mapDispatch = {
};
const mapState = (state) => ({});
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(FailedPayoutList)));

