import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Table } from 'react-bootstrap';
import s from './CategoryList.css';
import bt from '../../../components/commonStyle.css'
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import moment from 'moment';
//local
import messages from '../../../locale/messages';
import CustomPagination from '../../CustomPagination';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import getAllCategory from './getAllCategory.graphql';
import PropTypes from 'prop-types';
import Link from '../../Link';
import history from '../../../history';
import { Button, FormControl, ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux';
//Images
import EditIcon from '../../../../public/Icons/edit.png';
import TrashIcon from '../../../../public/Icons/bin.svg';
import updateCategoryStatus from '../../../actions/siteadmin/updateCategoryStatus';
import deleteCategory from '../../../actions/siteadmin/deleteCategory';
class CategoryList extends React.Component {
  static propTypes = {
    categoryDetails: PropTypes.object,
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
    this.handleClick = this.handleClick.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSearchClick = this.handleSearchClick.bind(this)
    this.handleStatus = this.handleStatus.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  handleClick() {
    history.push('/add')
  }
  handleSearchClick(searchList) {
    const { categoryDetails: { refetch } } = this.props
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
  async handleDelete(id, currentPage) {
    const { deleteCategory, categoryDetails: { refetch } } = this.props;
    let variables = { currentPage }
    await deleteCategory(id, currentPage);
    refetch(variables)
  }
  paginationData(currentPage) {
    const { categoryDetails: { refetch } } = this.props;
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);
  }
  async handleStatus(e, id, currentPage) {
    const { updateCategoryStatus, categoryDetails: { refetch } } = this.props;
    let status = e.target.value == 'true' ? '1' : '0';

    await updateCategoryStatus(id, status, currentPage);
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);

  }
  render() {
    const { categoryDetails, categoryDetails: { getAllCategory } } = this.props;
    const { formatMessage } = this.props.intl;
    const { currentPage } = this.state;
    return (
      <div className={cx(s.widthInner, 'whiteDropdown')}>
        <div className={s.searchInput}>
          <FormControl type='text' placeholder={formatMessage(messages.searchOnly)} onChange={(e) => this.handleSearchChange(e)} className={bt.formControlInput} />
        </div>
        <div className={cx(bt.padding2, bt.paddingTop2, s.displayInlineBlock, s.rightSide)}>
          <Link to={"/siteadmin/category/add"} className={cx(bt.btnPrimary)} >{formatMessage(messages.addCategory)}</Link>
        </div>
        <div className={cx(s.tableCss, 'tableCss', 'tableSticky', 'NewResponsiveTable')}>
          <Table className="table">
            <thead>
              <tr>
                <th scope="col"><FormattedMessage {...messages.id} /></th>
                <th scope="col"><FormattedMessage {...messages.categoryName} /></th>
                <th scope="col"><FormattedMessage {...messages.capacity} /></th>
                <th scope="col"><FormattedMessage {...messages.status} /></th>
                <th scope="col"><FormattedMessage {...messages.createdAt} /></th>
                <th scope="col"><FormattedMessage {...messages.action} /></th>
                <th scope="col"><FormattedMessage {...messages.deleteAction} /></th>
              </tr>
            </thead>
            <tbody>
              {
                categoryDetails && categoryDetails.getAllCategory && categoryDetails.getAllCategory.categoryData && categoryDetails.getAllCategory.categoryData.length > 0 && categoryDetails.getAllCategory.categoryData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td data-label={formatMessage(messages.id)}>{item.id}</td>
                      <td data-label={formatMessage(messages.categoryName)}>{item.categoryName}</td>
                      <td data-label={formatMessage(messages.capacity)}>{item.capacity}</td>
                      <td data-label={formatMessage(messages.status)}>
                        <select value={item.isActive} onChange={(e) => { this.handleStatus(e, item.id, currentPage) }} className={bt.selectInput}>
                          <option value={true}>{formatMessage(messages.active)}</option>
                          <option value={false}>{formatMessage(messages.inactive)}</option>
                        </select>
                      </td>
                      <td data-label={formatMessage(messages.createdAt)}>{moment(moment(item.createdAt)).format('DD-MM-YYYY HH:mm:ss')}</td>
                      <td data-label={formatMessage(messages.action)}>
                        <Link to={'/siteadmin/category/edit/' + item.id} className={cx('editAlign', s.displayFlex)}>
                          <span><img src={EditIcon} className={s.editIcon} /></span>
                          <span className={s.vtrMiddle}>
                            <FormattedMessage {...messages.editAction} />
                          </span>
                        </Link>
                      </td>
                      <td data-label={formatMessage(messages.deleteAction)}>
                   
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
                categoryDetails && categoryDetails.getAllCategory && categoryDetails.getAllCategory.categoryData.length == 0 && (
                  <tr>
                    <td colspan="12" className={s.noRecords}><FormattedMessage {...messages.noResult} /></td>
                  </tr>
                )
              }
            </tbody>
          </Table>
        </div>
        {
          categoryDetails && categoryDetails.getAllCategory && categoryDetails.getAllCategory.categoryData && categoryDetails.getAllCategory.categoryData.length > 0
          && <div className={cx(bt.space5, bt.spaceTop5)}>
            <CustomPagination
              total={categoryDetails.getAllCategory.count}
              currentPage={currentPage}
              defaultCurrent={1}
              defaultPageSize={10}
              change={this.paginationData}
              paginationLabel={formatMessage(messages.categorieslist)}
            />
          </div>
        }
      </div>
    );
  }
}
const mapDispatch = {
  updateCategoryStatus,
  deleteCategory
};
const mapState = (state) => ({});
export default injectIntl(compose(
  withStyles(s, bt),
  graphql(getAllCategory, {
    name: 'categoryDetails',
    options: {
      variables: {
        currentPage: 1,
        searchList: ''
      },
      fetchPolicy: 'network-only'
    }
  }),
  connect(mapState, mapDispatch)
)(CategoryList))
