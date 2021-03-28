import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Table, ButtonToolbar, Button, FormControl } from 'react-bootstrap';
import s from './PromoCodeList.css';
import bt from '../../../../components/commonStyle.css';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import messages from '../../../../locale/messages';
import { connect } from 'react-redux';
import { flowRight as compose } from 'lodash';
import { graphql } from 'react-apollo';
import Link from '../../../Link'
//import deleteUser from '../../../../actions/siteadmin/deleteUser';
import PropTypes from 'prop-types';
// Components
import CustomPagination from '../../../CustomPagination';
import CurrencyConverter from '../../../CurrencyConverter';
//Images
import TrashIcon from '../../../../../public/Icons/bin.svg';
import EditIcon from '../../../../../public/Icons/edit.png';
import { deletePromoCode } from '../../../../actions/siteadmin/PromoCode/deletePromoCode';
import { addPromoCode } from '../../../../actions/siteadmin/PromoCode/addPromoCode';
import getAllPromoCode from './getAllPromoCode.graphql'

class PromoCodeList extends React.Component {
  static propTypes = {
    deleteDriver: PropTypes.any
  };
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      searchList: '',
      typing: false,
      typingTimeout: 0
    }
    this.paginationData = this.paginationData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSearchClick(searchList) {
    const { promoCodes: { refetch } } = this.props
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
  async handleChange(e, id, title, description, code, type, promoValue) {
    const { addPromoCode, promoCodes: { refetch } } = this.props;
    let data = {};
    data = {
      id: id,
      title: title,
      description: description,
      code: code,
      type: type,
      promoValue: promoValue,
      isEnable: e.target.value
    }
    this.setState({ currentPage: 1 });
    let variables = { currentPage: 1 };
    await addPromoCode(data);
    refetch(variables);
  }
  async handleDelete(id, currentPage) {
    const { deletePromoCode, promoCodes: { refetch } } = this.props;
    this.setState({ currentPage: 1 });
    let variables = { currentPage: 1 };
    await deletePromoCode(id);
    refetch(variables);
  }
  paginationData(currentPage) {
    const { promoCodes: { refetch } } = this.props;
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);
  }
  render() {
    const { promoCodes, promoCodes: { getPromoCodes } } = this.props;
    const { currentPage } = this.state;
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.widthInner, 'whiteDropdown')}>
        <div className={s.searchInput}>
          <FormControl type='text' placeholder={formatMessage(messages.searchOnly)} onChange={(e) => this.handleSearchChange(e)} className={bt.formControlInput} />
        </div>
        <div className={cx(bt.padding2, bt.paddingTop2, s.displayInlineBlock, s.rightSide)}>
          <Link
            to={'/siteadmin/promo-code/add'}
            className={cx(bt.btnPrimary)}
          >
            <FormattedMessage {...messages.addPromoCode} />
          </Link>
        </div>
        <div className={cx(s.tableCss, 'tableCss', 'tableSticky', 'NewResponsiveTable')}>
          <Table className="table">
            <thead>
              <tr>
                <th scope="col"><FormattedMessage {...messages.id} /></th>
                <th scope="col"><FormattedMessage {...messages.code} /></th>
                <th scope="col"><FormattedMessage {...messages.title} /></th>
                <th scope="col"><FormattedMessage {...messages.discount} /></th>
                <th scope="col"><FormattedMessage {...messages.status} /></th>
                <th scope="col"><FormattedMessage {...messages.action} /></th>
                <th scope="col"><FormattedMessage {...messages.deleteAction} /></th>
              </tr>
            </thead>
            <tbody>
              {
                promoCodes && promoCodes.getPromoCodes && promoCodes.getPromoCodes.data && promoCodes.getPromoCodes.data.length > 0 && promoCodes.getPromoCodes.data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td data-label={formatMessage(messages.id)}>{item && item.id}</td>
                      <td data-label={formatMessage(messages.code)}>{item && item.code}</td>
                      <td data-label={formatMessage(messages.title)}>{item && item.title}</td>
                      <td data-label={formatMessage(messages.discount)}>
                        {
                          item && item.type === 1 && <span>
                            {item.promoValue + '%'}
                          </span>
                        }
                        {
                          item && item.type !== 1 && <CurrencyConverter
                            amount={item.promoValue}
                            from={item.currency}
                          />
                        }
                      </td>
                      <td data-label={formatMessage(messages.status)}>
                        <select name="isEnable" onChange={(e) => this.handleChange(e, item.id, item.title, item.description, item.code, item.type, item.promoValue)} className={bt.selectInput} value={item.isEnable}>
                          <option value="active">{formatMessage(messages.active)}</option>
                          <option value="inactive">{formatMessage(messages.inactive)}</option>s
                        </select>
                      </td>
                      <td data-label={formatMessage(messages.action)}>
                        <Link to={'/siteadmin/promo-code/edit/' + item.id} className={cx('editAlign', s.displayFlex)}>
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
                promoCodes && promoCodes.getPromoCodes && promoCodes.getPromoCodes.data && promoCodes.getPromoCodes.data.length == 0 && (
                  <tr>
                    <td colspan="12" className={s.noRecords}><FormattedMessage {...messages.noResult} /></td>
                  </tr>
                )
              }
            </tbody>
          </Table>
        </div>
        {
          promoCodes && promoCodes.getPromoCodes && promoCodes.getPromoCodes.count > 0
          && <div className={cx(bt.space5, bt.spaceTop5)}>
            <CustomPagination
              total={promoCodes.getPromoCodes.count}
              currentPage={currentPage}
              defaultCurrent={1}
              defaultPageSize={10}
              change={this.paginationData}
              paginationLabel={formatMessage(messages.promoCodeId)}
            />
          </div>
        }
      </div>
    );
  }
}
const mapState = (state) => ({});
const mapDispatch = {
  deletePromoCode,
  addPromoCode
};
export default compose( injectIntl,
  withStyles(s, bt),
  graphql(getAllPromoCode, {
    name: 'promoCodes',
    options: {
      variables: {
        currentPage: 1,
        searchList: ''
      },
      ssr: true,
      fetchPolicy: 'network-only'
    }
  }),
  connect(mapState, mapDispatch)
)(PromoCodeList);
