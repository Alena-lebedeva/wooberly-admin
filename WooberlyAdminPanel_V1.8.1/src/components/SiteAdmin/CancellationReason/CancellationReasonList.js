import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/withStyles';
import { Table, ButtonToolbar, Button, FormControl } from 'react-bootstrap';
import s from './CancellationReasonList.css';
import bt from '../../../components/commonStyle.css';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import messages from '../../../locale/messages';
import CustomPagination from '../../CustomPagination/CustomPagination';
import { flowRight as compose } from 'lodash';
import PropTypes from 'prop-types';
import Link from '../../Link/Link';
import TrashIcon from '../../../../public/Icons/bin.svg';
import EditIcon from '../../../../public/Icons/edit.png';
import removeCancelReason from '../../../actions/siteadmin/removeCancelReason';
import { connect } from 'react-redux';
import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirst';
import { addCancelReason } from '../../../actions/siteadmin/addCancelReason';

export class CancellationReason extends Component {
    static propTypes = {
        cancelReasons: PropTypes.object,
    }
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
        }
        this.paginationData = this.paginationData.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    async handleDelete(id, currentPage) {
        const { cancelReasons: { refetch }, removeCancelReason } = this.props;
        let variables = { currentPage };
        removeCancelReason(id, currentPage);
        refetch(variables)
    
    }
    handleSearchClick(searchList) {
        const { cancelReasons: { refetch }} = this.props
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
    async handleChange(e, id, reason, userType){
         const { addCancelReason, cancelReasons: { refetch } } = this.props;
        let data = {};
        data = {
            id: id,
            reason: reason,
            userType: userType,
            isActive: e.target.value
        }
        this.setState({ currentPage: 1 });
        let variables = { currentPage: 1 };
         await addCancelReason(data);
        refetch(variables);
    }
    paginationData(currentPage) {
        const { cancelReasons: { refetch } } = this.props;
        let variables = { currentPage };
        this.setState({ currentPage });
        refetch(variables);
    }
    render() {
        const { cancelReasons, cancelReasons: { getAllCancelReason } } = this.props;
        const { currentPage } = this.state;
        const { formatMessage } = this.props.intl;
        return (
            <div className={cx(s.widthInner, 'whiteDropdown')}>
                <div className={s.searchInput}>
                <FormControl type='text' placeholder={formatMessage(messages.searchOnly)} onChange={(e) => this.handleSearchChange(e)} className={bt.formControlInput} />
                </div>
                <div className={cx(bt.padding2, bt.paddingTop2, s.displayInlineBlock, s.rightSide)}>
                    <Link to={"/siteadmin/cancel-reasons/add"} className={cx(bt.btnPrimary)} ><FormattedMessage {...messages.addCancelReason} /></Link>
                </div>
                <div className={cx(s.tableCss, 'tableCss', 'tableSticky', 'NewResponsiveTable')}>
                    <Table className="table">
                        <thead>
                            <tr>
                                <th scope="col"><FormattedMessage {...messages.id} /></th>
                                <th scope="col"><FormattedMessage {...messages.cancelReason} /></th>
                                <th scope="col"><FormattedMessage {...messages.cancelledBy} /></th>
                                <th scope="col"><FormattedMessage {...messages.status} /></th>
                                <th scope="col"><FormattedMessage {...messages.action} /></th>
                                <th scope="col"><FormattedMessage {...messages.deleteAction} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cancelReasons && cancelReasons.getAllCancelReason && cancelReasons.getAllCancelReason.result && cancelReasons.getAllCancelReason.result.length > 0 && cancelReasons.getAllCancelReason.result.map((item, index) => {
                                    {item.isActive = item.isActive == true ? 1 :0}
                                    return (
                                        <tr key={index}>
                                            <td data-label={formatMessage(messages.id)}>{item.id}</td>
                                            <td data-label={formatMessage(messages.cancelReason)}>{capitalizeFirstLetter(item.reason)}</td>
                                            <td data-label={formatMessage(messages.cancelledBy)}>{formatMessage(item.userType == '1' ? messages['rider'] : messages['driver'])}</td>

                                            <td data-label={formatMessage(messages.status)}>
                                                {/* {item.isActive == true ? 'Active' : 'Inactive'} */}
                                                
                                                <select name="isActive" onChange={(e) => this.handleChange(e, item.id, item.reason, item.userType)} className={bt.selectInput} value={item.isActive}>
                                                    <option value={1}>{formatMessage(messages.active)}</option>
                                                    <option value={0}>{formatMessage(messages.inactive)}</option>
                                                </select>
                                            </td>

                                            <td data-label={formatMessage(messages.action)}>
                                                <Link to={'/siteadmin/cancel-reasons/edit/' + item.id} className={cx('editAlign', s.displayFlex)}>
                                                <span><img src={EditIcon} className={s.editIcon} /></span>
                                                <span className={s.vtrMiddle}>
                                                    <FormattedMessage {...messages.editAction} />
                                                </span>
                                                </Link>
                                            </td>
                                            <td data-label={formatMessage(messages.deleteAction)} >
                                             
                                                <Button onClick={() => this.handleDelete(item.id, currentPage)} className={s.iconBtn}>
                                                    <img src={TrashIcon} className={s.editIcon} />
                                                    <span className={s.vtrMiddle}>
                                                    <FormattedMessage {...messages.deleteAction} />
                                                    </span>
                                                </Button>
                                             
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            {
                               ((cancelReasons && cancelReasons.getAllCancelReason && cancelReasons.getAllCancelReason.result && cancelReasons.getAllCancelReason.result.length ==0)) && (   
                                <tr>
                                    <td colspan="12" className={s.noRecords}><FormattedMessage {...messages.noResult} /></td>
                                </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
                {
                        cancelReasons && cancelReasons.getAllCancelReason && cancelReasons.getAllCancelReason.result && cancelReasons.getAllCancelReason.result.length > 0
                        && <div className={cx(bt.space5, bt.spaceTop5)}>
                            <CustomPagination
                                total={cancelReasons.getAllCancelReason.count}
                                currentPage={currentPage}
                                defaultCurrent={1}
                                defaultPageSize={10}
                                change={this.paginationData}
                                paginationLabel={formatMessage(messages.cancelReason)}
                            />
                        </div>
                    }
            </div>
        )
    }
}
const mapState = (state) => ({});
const mapDispatch = {
  removeCancelReason,
  addCancelReason
};
export default injectIntl(compose(
    withStyles(s, bt),
    connect(mapState, mapDispatch)
)(CancellationReason));

