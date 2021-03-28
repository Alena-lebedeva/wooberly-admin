import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Table, Button, FormControl, ButtonToolbar } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import { connect } from 'react-redux';
import { flowRight as compose } from 'lodash';
//local
import messages from '../../../../locale/messages';
import history from '../../../../history';
import s from './PricingList.css';
import bt from '../../../../components/commonStyle.css';
// Components
import CustomPagination from '../../../CustomPagination';
import Link from '../../../Link';
//Images
import EditIcon from '../../../../../public/Icons/edit.png';
import TrashIcon from '../../../../../public/Icons/bin.svg';
import { updatePricingStatus } from '../../../../actions/siteadmin/Pricing/updatePricingStatus';
import { deletePricing } from '../../../../actions/siteadmin/Pricing/deletePricing';

class PricingList extends React.Component {
  static defaultProps = {
    pricingDetails: {
      loading: true
    }
  };
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      searchKeyword: '',
      typing: false,
      typingTimeout: 0
    };
    this.paginationData = this.paginationData.bind(this);
    this.handleClick = this.handleClick.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSearchClick = this.handleSearchClick.bind(this)
    this.handleStatus = this.handleStatus.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  handleClick() {
    history.push('/add')
  }
  handleSearchClick(searchKeyword) {
    const { pricingDetails: { refetch } } = this.props
    let variables = {
      currentPage: 1,
      searchKeyword
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
      searchKeyword: e.target.value,
      typing: false,
      typingTimeout: setTimeout(function () {
        self.handleSearchClick(self.state.searchKeyword)
      }, 450)
    })
  }
  async handleDelete(id) {
    const { deletePricing, pricingDetails: { refetch } } = this.props;
    let variables = { currentPage: 1 };
    const deletePricingData = await deletePricing(id);
    if (deletePricingData && deletePricingData.status === 200) {
      this.setState({ currentPage: 1 });
      refetch(variables);
    }
  }
  paginationData(currentPage) {
    const { pricingDetails: { refetch } } = this.props;
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);
  }
  async handleStatus(e, id) {
    const { updatePricingStatus, pricingDetails: { refetch } } = this.props;
    let status = e.target.value == 'true' ? true : false;

    const updateActiveStatus = await updatePricingStatus(id, status);
    if (updateActiveStatus && updateActiveStatus.status === 200) {
      let variables = { currentPage: 1 };
      this.setState({ currentPage: 1 });
      refetch(variables);
    }
  }
  render() {
    const { pricingDetails, pricingDetails: { loading, getAllPricing } } = this.props;
    const { formatMessage } = this.props.intl;
    const { currentPage } = this.state;
    return (
      <div className={cx(s.widthInner, 'whiteDropdown')}>
        <div className={s.searchInput}>
          <FormControl type='text' placeholder={formatMessage(messages.searchOnly)} onChange={(e) => this.handleSearchChange(e)} className={bt.formControlInput} />
        </div>
        <div className={cx(bt.padding2, bt.paddingTop2, s.displayInlineBlock, s.rightSide)}>
          <Link to={"/siteadmin/pricing/add"} className={cx(bt.btnPrimary)} >{formatMessage(messages.addFare)}</Link>
        </div>
        <div className={cx(s.tableCss, 'tableCss', 'tableSticky', 'NewResponsiveTable')}>
          <Table className="table">
            <thead>
              <tr>
                <th scope="col"><FormattedMessage {...messages.id} /></th>
                <th scope="col"><FormattedMessage {...messages.locationName} /></th>
                <th scope="col"><FormattedMessage {...messages.category} /></th>
                <th scope="col"><FormattedMessage {...messages.status} /></th>
                <th scope="col"><FormattedMessage {...messages.action} /></th>
                <th scope="col"><FormattedMessage {...messages.deleteAction} /></th>
              </tr>
            </thead>
            <tbody>
              {
                pricingDetails && pricingDetails.getAllPricing && pricingDetails.getAllPricing.results
                && pricingDetails.getAllPricing.count > 0 && pricingDetails.getAllPricing.results.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td data-label={formatMessage(messages.id)}>{item.id}</td>
                      <td data-label={formatMessage(messages.locationName)}>{item.location && item.location.locationName}</td>
                      <td data-label={formatMessage(messages.category)}>{item.category && item.category.categoryName}</td>
                      <td data-label={formatMessage(messages.status)}>
                        <select value={item.isActive} onChange={(e) => { this.handleStatus(e, item.id) }} className={bt.selectInput}>
                          <option value={true}>{formatMessage(messages.active)}</option>
                          <option value={false}>{formatMessage(messages.inactive)}</option>
                        </select>
                      </td>
                      <td data-label={formatMessage(messages.action)}>
                        <Link to={'/siteadmin/pricing/edit/' + item.id} className={cx('editAlign', s.displayFlex)}>
                          <span><img src={EditIcon} className={s.editIcon} /></span>
                          <span className={s.vtrMiddle}>
                            <FormattedMessage {...messages.editAction} />
                          </span>
                        </Link>
                      </td>
                      <td data-label={formatMessage(messages.deleteAction)} >
                   
                          <Button onClick={() => this.handleDelete(item.id)} className={s.iconBtn}>
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
                pricingDetails && pricingDetails.getAllPricing && pricingDetails.getAllPricing.count == 0 && (
                  <tr>
                    <td colspan="12" className={s.noRecords}><FormattedMessage {...messages.noResult} /></td>
                  </tr>
                )
              }
            </tbody>
          </Table>
        </div>
        {
          pricingDetails && pricingDetails.getAllPricing && pricingDetails.getAllPricing.results && pricingDetails.getAllPricing.count > 0
          && <div className={cx(bt.space5, bt.spaceTop5)}>
            <CustomPagination
              total={pricingDetails.getAllPricing.count}
              currentPage={currentPage}
              defaultCurrent={1}
              defaultPageSize={10}
              change={this.paginationData}
              paginationLabel={formatMessage(messages.fares)}
            />
          </div>
        }
      </div>
    );
  }
}
const mapDispatch = {
  updatePricingStatus,
  deletePricing
};
const mapState = (state) => ({});
export default injectIntl(compose(
  withStyles(s, bt),
  connect(mapState, mapDispatch)
)(PricingList))
