import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Table, ButtonToolbar, Button, FormControl } from 'react-bootstrap';
import s from './DriversList.css';
import bt from '../../../components/commonStyle.css'
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import messages from '../../../locale/messages';
import moment from 'moment';
import CustomPagination from '../../CustomPagination';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import Link from '../../Link'
import deleteUser from '../../../actions/siteadmin/deleteUser';
import PropTypes from 'prop-types';
import getAllDrivers from './getAllDrivers.graphql'
import { editDriver } from '../../../actions/siteadmin/editDriver';

//Images
import TrashIcon from '../../../../public/Icons/bin.svg';
import EditIcon from '../../../../public/Icons/edit.png';
import ExportImage from '../../../../public/Icons/export.png';

//Helpers
import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirst'
import debounce from '../../../helpers/debounce'
class DriverList extends React.Component {
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
    this.handleKeywordSearch = debounce(this.handleKeywordSearch.bind(this), 250);
    this.handleUserStatusChange = this.handleUserStatusChange.bind(this);
    this.handleBanStatusChange = this.handleBanStatusChange.bind(this)
  }

  handleKeywordSearch(searchList) { // Keyword search
    const { driverDetails: { refetch } } = this.props;
    let variables = {
      currentPage: 1,
      searchList
    };
    this.setState(variables)
    refetch(variables);
  }

  async handleDelete(profileId, currentPage, userType) {
    const { deleteUser, driverDetails: { refetch } } = this.props;
    let variables = { currentPage }
    await deleteUser(profileId, currentPage, userType);
    refetch(variables)
  }
  async handleUserStatusChange(e, id, email, phoneDialCode, phoneNumber, isBan, phoneCountryCode, currentPage) {
    const { editDriver, driverDetails: { refetch } } = this.props;
    let data = {};
    data = {
      id: id,
      email: email,
      phoneDialCode: phoneDialCode,
      phoneNumber: phoneNumber,
      userStatus: e.target.value,
      isBan: isBan,
      phoneCountryCode: phoneCountryCode
    }
    let variables = { currentPage }
    await editDriver(data);
    refetch(variables);
  }
  async handleBanStatusChange(e, id, email, phoneDialCode, phoneNumber, userStatus, phoneCountryCode, currentPage) {
    const { editDriver, driverDetails: { refetch } } = this.props;
    let data = {};
    data = {
      id: id,
      email: email,
      phoneDialCode: phoneDialCode,
      phoneNumber: phoneNumber,
      userStatus: userStatus,
      isBan: e.target.value,
      phoneCountryCode: phoneCountryCode
    }
    let variables = { currentPage }
    await editDriver(data);
    refetch(variables);
  }
  paginationData(currentPage) {
    const { driverDetails: { refetch } } = this.props;
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);
  }
  render() {
    const { driverDetails, driverDetails: { getAllDrivers } } = this.props;
    const { currentPage, searchList } = this.state;
    const { formatMessage } = this.props.intl;
    let country;
    return (
      <div className={cx(s.widthInner, 'whiteDropdown')}>
        <div className={s.exportDisplay}>
          <div className={s.searchInput}>
            <FormControl type='text' placeholder={formatMessage(messages.searchOnly)} onChange={(e) => this.handleKeywordSearch(e.target && e.target.value)} className={bt.formControlInput} />
          </div>
          <div className={s.exportTextSection}>
            {
              driverDetails && driverDetails.getAllDrivers && driverDetails.getAllDrivers.userData && driverDetails.getAllDrivers.userData.length > 0 && <a
                href={`/export-admin-data?type=drivers&keyword=${searchList ? searchList : ''}`}
                className={cx('pull-right', s.exportText)}>
                <span className={cx(s.vtrMiddle, s.exportText)}><FormattedMessage {...messages.exportDataIntoCSV} /></span>
                <span className={s.vtrTextBottom}>
                  <img src={ExportImage} className={s.exportImg} />
                </span>
              </a>
            }
          </div></div>
        <div className={cx(s.tableCss, 'tableCss', 'tableSticky', 'NewResponsiveTable')}>
          <Table className="table">
            <thead>
              <tr>
                <th scope="col"><FormattedMessage {...messages.id} /></th>
                <th scope="col"><FormattedMessage {...messages.firstName} /></th>
                <th scope="col"><FormattedMessage {...messages.lastName} /></th>
                <th scope="col"><FormattedMessage {...messages.email} /></th>
                <th scope="col"><FormattedMessage {...messages.country} /></th>
                <th scope="col"><FormattedMessage {...messages.phoneNumber} /></th>
                <th scope="col"><FormattedMessage {...messages.createdAt} /></th>
                <th scope="col"><FormattedMessage {...messages.userStatus} /></th>
                <th scope="col"><FormattedMessage {...messages.banStatus} /></th>
                <th scope="col"><FormattedMessage {...messages.action} /></th>
                <th scope="col"><FormattedMessage {...messages.deleteAction} /></th>
              </tr>
            </thead>
            <tbody>
              {
                driverDetails && driverDetails.getAllDrivers && driverDetails.getAllDrivers.userData && driverDetails.getAllDrivers.userData.length > 0 && driverDetails.getAllDrivers.userData.map((item, index) => {
                  country = item && item.profile && item.profile.country;
                  return (
                    <tr key={index}>
                      <td data-label={formatMessage(messages.id)}>{item && item.profile && item.profile.profileId}</td>
                      <td data-label={formatMessage(messages.firstName)}>{item && item.profile && capitalizeFirstLetter(item.profile.firstName)}</td>
                      <td data-label={formatMessage(messages.lastName)}>{item && item.profile && capitalizeFirstLetter(item.profile.lastName)}</td>
                      <td data-label={formatMessage(messages.email)}>{item.email}</td>
                      <td data-label={formatMessage(messages.country)}>{country}</td>
                      <td data-label={formatMessage(messages.phoneNumber)}>{item && item.phoneDialCode}{item.phoneNumber}</td>
                      <td data-label={formatMessage(messages.createdAt)}>{moment(item.createdAt).format('DD-MM-YYYY HH:mm:ss')}</td>
                      <td data-label={formatMessage(messages.userStatus)}>
                        <select name="userStatus" className={bt.selectInput}
                          onChange={(e) => this.handleUserStatusChange(e, item.id, item.email, item.phoneDialCode, item.phoneNumber, item.isBan, item.profile.country, currentPage)} value={item.userStatus}>
                          <option value="pending">{formatMessage(messages.pending)}</option>
                          <option value="active">{formatMessage(messages.active)}</option>
                          <option value="inactive">{formatMessage(messages.inactive)}</option>
                        </select>
                      </td>
                      <td data-label={formatMessage(messages.banStatus)}>
                        <select name="isBan" className={bt.selectInput}
                          onChange={(e) => this.handleBanStatusChange(e, item.id, item.email, item.phoneDialCode, item.phoneNumber, item.userStatus, item.profile.country, currentPage)} value={item.isBan}>
                          <option value="0">{formatMessage(messages.permit)}</option>
                          <option value="1">{formatMessage(messages.ban)}</option>
                        </select>
                      </td>
                      <td data-label={formatMessage(messages.action)}>
                        <Link to={'/siteadmin/drivers/' + item.profile.profileId} className={cx('editAlign', s.displayFlex)}>
                          <span><img src={EditIcon} className={s.editIcon} /></span>
                          <span className={s.vtrMiddle}>
                            <FormattedMessage {...messages.editAction} />
                          </span>
                        </Link>
                      </td>
                      <td data-label={formatMessage(messages.deleteAction)}>

                        <Button onClick={() => this.handleDelete(item.profile.profileId, currentPage, 2)} className={s.iconBtn}>
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
                ((driverDetails && driverDetails.getAllDrivers && driverDetails.getAllDrivers.userData.length == 0)) && (
                  <tr>
                    <td colspan="12" className={s.noRecords}><FormattedMessage {...messages.noResult} /></td>
                  </tr>
                )
              }
            </tbody>
          </Table>
        </div>
        {
          driverDetails && driverDetails.getAllDrivers && driverDetails.getAllDrivers.userData && driverDetails.getAllDrivers.userData.length > 0
          && <div className={cx(bt.space5, bt.spaceTop5)}>
            <CustomPagination
              total={driverDetails.getAllDrivers.count}
              currentPage={currentPage}
              defaultCurrent={1}
              defaultPageSize={10}
              change={this.paginationData}
              paginationLabel={formatMessage(messages.drivers)}
            />
          </div>
        }
      </div>
    );
  }
}
const mapState = (state) => ({});
const mapDispatch = {
  deleteUser,
  editDriver
};
export default compose(injectIntl,
  withStyles(s, bt),
  graphql(getAllDrivers, {
    name: 'driverDetails',
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
)(DriverList);
