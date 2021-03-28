import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/withStyles';
import { Table, FormControl } from 'react-bootstrap';
import s from './CurrencyList.css';
import bt from '../../../components/commonStyle.css';
import { FormattedMessage,injectIntl } from 'react-intl';
import cx from 'classnames';
import messages from '../../../locale/messages';
import CustomPagination from '../../CustomPagination';
import { flowRight as compose } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateCurrencyStatus, setBaseCurrency, allowPaymentCurrency } from '../../../actions/siteadmin/Currency/updateCurrency';

export class CurrencyList extends Component {
    static propTypes = {
        CurrencyData: PropTypes.object,
        updateCurrencyStatus: PropTypes.any.isRequired,
        setBaseCurrency: PropTypes.any.isRequired,
        managePaymentCurrency: PropTypes.any.isRequired,
    }
    constructor(props) {
        super(props)

        this.state = {
            currentPage: 1,
        }

        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.paginationData = this.paginationData.bind(this)
    }
    handleSearchClick(searchList) {
        const { CurrencyData: { refetch } } = this.props
        let variables = {
            currentPage: 1,
            searchList: searchList
        }
        this.setState({ currentPage: 1 })
        refetch(variables)
    }
    handleSearchChange(e) {
        let self = this
        if (self.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout)
        }
        self.setState({
            searchList: e.target.value,
            typing: false,
            typingTimeout: setTimeout(function () {
                self.handleSearchClick(self.state.searchList)
            }, 450)
        })
    }
    async handleUpdateStatus(id, status, symbol) {
        const { updateCurrencyStatus } = this.props;
        updateCurrencyStatus(id, status, symbol);
    }
    async handleBaseCurrency(id) {
        const { setBaseCurrency, CurrencyData: { refetch } } = this.props;
        await setBaseCurrency(id);
        await refetch()
    }
    managePaymentCurrency(id, isPayment) {
        const { allowPaymentCurrency } = this.props;
        allowPaymentCurrency(id, isPayment);
    }
    paginationData(currentPage) {
        const { CurrencyData: { refetch } } = this.props;
        let variables = { currentPage };
        this.setState({ currentPage });
        refetch(variables);
    }
    render() {
        const { CurrencyData, CurrencyData: { getCurrency } } = this.props;
        const { currentPage } = this.state;
        const { formatMessage } = this.props.intl;
        return (
            <div className={s.widthInner}>
                <div className={s.searchInput}>
                    <FormControl type='text' placeholder={formatMessage(messages.searchOnly)} onChange={(e) => this.handleSearchChange(e)} className={bt.formControlInput} />
                </div>
                <div className={cx(s.tableCss, 'tableCss', 'tableSticky', 'NewResponsiveTable')}>
                    <Table className="table">
                        <thead>
                            <tr>
                                <th scope="col"><FormattedMessage {...messages.id} /></th>
                                <th scope="col"><FormattedMessage {...messages.symbol} /></th>
                                <th scope="col"><FormattedMessage {...messages.baseCurrency} /></th>
                                <th scope="col"><FormattedMessage {...messages.status} /></th>
                                <th scope="col"><FormattedMessage {...messages.enableDisable} /></th>
                                <th scope="col"><FormattedMessage {...messages.setBaseCurrency} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                CurrencyData && CurrencyData.getCurrency && CurrencyData.getCurrency.currencyList && CurrencyData.getCurrency.currencyList.length > 0 && CurrencyData.getCurrency.currencyList.map((item, index) => {

                                    return (

                                        <tr key={index}>
                                            <td data-label={formatMessage(messages.id)}>{item.id}</td>
                                            <td data-label={formatMessage(messages.symbol)}>{item.symbol}</td>
                                            {item.isBaseCurrency == 1 && <td data-label={formatMessage(messages.baseCurrency)}><FormattedMessage {...messages.active} /></td>}
                                            {item.isBaseCurrency == 0 && <td data-label={formatMessage(messages.baseCurrency)}></td>}
                                            {item.isEnable && <td data-label={formatMessage(messages.status)}><FormattedMessage {...messages.Enabled} /></td>}
                                            {!item.isEnable && <td data-label={formatMessage(messages.status)}><FormattedMessage {...messages.Disabled} /></td>}
                                            <td data-label={formatMessage(messages.enableDisable)}> <a href="javascript:void(0)" onClick={() => this.handleUpdateStatus(item.id, item.isEnable, item.symbol)} >
                                                {
                                                    item.isEnable && <span> <FormattedMessage {...messages.Disable} /> </span>
                                                }

                                                {
                                                    !item.isEnable && <span> <FormattedMessage {...messages.Enable} /> </span>
                                                }
                                            </a>
                                            </td>
                                            <td data-label={formatMessage(messages.setBaseCurrency)}>
                                                <span>
                                                    {
                                                        !item.isBaseCurrency && item.isEnable && <a href="javascript:void(0)" onClick={() => this.handleBaseCurrency(item.id)}>
                                                             <FormattedMessage {...messages.setBase} />
                                                </a>
                                                    }
                                                </span>

                                            </td>

                                        </tr>
                                    )
                                })
                            }
                            {
                               ((CurrencyData && CurrencyData.getCurrency && CurrencyData.getCurrency.currencyList.length ==0)) && (   
                                <tr>
                                    <td colspan="12" className={s.noRecords}><FormattedMessage {...messages.noResult} /></td>
                                </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
                {
                        CurrencyData && CurrencyData.getCurrency && CurrencyData.getCurrency.currencyList && CurrencyData.getCurrency.currencyList.length > 0
                        && <div className={cx(bt.space5, bt.spaceTop5)}>
                            <CustomPagination
                                total={CurrencyData.getCurrency.count}
                                currentPage={currentPage}
                                defaultCurrent={1}
                                defaultPageSize={10}
                                change={this.paginationData}
                                paginationLabel={formatMessage(messages.currencies)}
                            />
                        </div>
                    }   
            </div >
        )
    }
}
const mapDispatch = {
    updateCurrencyStatus,
    setBaseCurrency,
    allowPaymentCurrency
};
const mapState = (state) => ({});
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(CurrencyList)));
