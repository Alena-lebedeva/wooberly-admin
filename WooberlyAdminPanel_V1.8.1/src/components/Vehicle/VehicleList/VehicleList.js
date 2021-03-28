import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Table, FormControl } from 'react-bootstrap';
import s from './VehicleList.css';
import bt from '../../../components/commonStyle.css';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
//local
import messages from '../../../locale/messages';
import moment from 'moment';
import CustomPagination from '../../CustomPagination';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { flowRight as compose } from 'lodash';
import getAllVehicles from './getAllVehicles.graphql';
import PropTypes from 'prop-types';
import Link from '../../Link';
import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirst';
import { editVehicle } from '../../../actions/siteadmin/editVehicle';
//Images
import EditIcon from '../../../../public/Icons/edit.png';
class VehicleList extends React.Component {
  static propTypes = {
    vehicleListDetails: PropTypes.object,
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
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }
  handleSearchClick(searchList) {
    const { vehicleListDetails: { refetch } } = this.props;
    let variables = {
      currentPage: 1,
      searchList: searchList
    };
    this.setState({ currentPage: 1 });
    refetch(variables);
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
    });
  }
  async handleStatusChange(e, id, vehicleName, vehicleType, vehicleNumber, currentPage) {
    const { vehicleListDetails: { refetch }, editVehicle } = this.props
    let variables = { currentPage };
    let vehicleStatus = e.target.value;
    await editVehicle(id, vehicleName, vehicleType, vehicleNumber, vehicleStatus);
    refetch(variables);
  }
  paginationData(currentPage) {
    const { vehicleListDetails: { refetch } } = this.props;
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);
  }
  render() {
    const { vehicleListDetails, vehicleListDetails: { getAllVehicles } } = this.props;
    const { currentPage } = this.state;
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.widthInner, 'whiteDropdown')}>
        <div className={s.searchInput}>
          <FormControl type='text' placeholder={formatMessage(messages.searchOnly)} onChange={(e) => this.handleSearchChange(e)} className={bt.formControlInput} />
        </div>
        <div className={cx(s.tableCss, 'tableCss', 'tableSticky', 'NewResponsiveTable')}>
          <Table className="table">
            <thead>
              <tr>
                <th scope="col">{<FormattedMessage {...messages.id} />}</th>
                <th scope="col"><FormattedMessage {...messages.vehicleName} /></th>
                <th scope="col"><FormattedMessage {...messages.vehicleType} /></th>
                <th scope="col"><FormattedMessage {...messages.vehicleNumber} /></th>
                <th scope="col"><FormattedMessage {...messages.vehicleOwnerName} /></th>
                <th scope="col"><FormattedMessage {...messages.vehicleOwnerEmail} /></th>
                <th scope="col"><FormattedMessage {...messages.createdAt} /></th>
                <th scope="col"><FormattedMessage {...messages.status} /></th>
                <th scope="col"><FormattedMessage {...messages.action} /></th>
              </tr>
            </thead>
            <tbody>
              {
                vehicleListDetails && vehicleListDetails.getAllVehicles && vehicleListDetails.getAllVehicles.vehicleData && vehicleListDetails.getAllVehicles.vehicleData.length > 0 && vehicleListDetails.getAllVehicles.vehicleData.map((item, index) => {

                  return (
                    <tr key={index}>
                      <td data-label={formatMessage(messages.id)}>{item.id}</td>
                      <td data-label={formatMessage(messages.vehicleName)}>{capitalizeFirstLetter(item.vehicleName)}</td>
                      <td data-label={formatMessage(messages.vehicleType)}>{item && item.category && item.category.categoryName}</td>
                      <td data-label={formatMessage(messages.vehicleNumber)}>{item.vehicleNumber}</td>
                      <td data-label={formatMessage(messages.vehicleOwnerName)}>{item && item.user && item.user.profile && capitalizeFirstLetter(item.user.profile.firstName)}</td>
                      <td data-label={formatMessage(messages.vehicleOwnerEmail)}>{item && item.user && item.user.email}</td>

                      <td data-label={formatMessage(messages.createdAt)} >{moment(item.createdAt).format('DD-MM-YYYY HH:mm:ss')}</td>
                      <td data-label={formatMessage(messages.status)}>
                        <select name="vehicleStatus" className={bt.selectInput}
                          onChange={(e) => this.handleStatusChange(e, item.id, item.vehicleName, item.vehicleType, item.vehicleNumber, currentPage)} value={item.vehicleStatus}>
                          <option value="pending">{formatMessage(messages.pending)}</option>
                          <option value="active">{formatMessage(messages.active)}</option>
                          <option value="inactive">{formatMessage(messages.inactive)}</option>
                        </select>
                      </td>
                      <td data-label={formatMessage(messages.action)}>
                        <Link to={'/siteadmin/vehicles/' + item.id} className={cx('editAlign', s.displayFlex)}>
                          <span><img src={EditIcon} className={s.editIcon} /></span>
                          <span className={s.vtrMiddle}>
                            <FormattedMessage {...messages.editAction} />
                          </span>
                        </Link>
                      </td>
                    </tr>
                  )
                })
              }
              {
                vehicleListDetails && vehicleListDetails.getAllVehicles && vehicleListDetails.getAllVehicles.vehicleData.length == 0 && (
                  <tr>
                    <td  colspan="12" className={s.noRecords}><FormattedMessage {...messages.noResult} /></td>
                  </tr>
                )
              }
            </tbody>
          </Table>
        </div>
        {
          vehicleListDetails && vehicleListDetails.getAllVehicles && vehicleListDetails.getAllVehicles.vehicleData && vehicleListDetails.getAllVehicles.vehicleData.length > 0
          && <div className={cx(bt.space5, bt.spaceTop5)}>
            <CustomPagination
              total={vehicleListDetails.getAllVehicles.count}
              currentPage={currentPage}
              defaultCvehicleListDetailsurrent={1}
              defaultPageSize={10}
              change={this.paginationData}
              paginationLabel={formatMessage(messages.vehicles)}

            />
          </div>
        }
      </div>
    );
  }
}
const mapState = (state) => ({});
const mapDispatch = {
  editVehicle
};
export default compose(injectIntl,
  withStyles(s, bt),
  graphql(getAllVehicles, {
    name: 'vehicleListDetails',
    options: {
      variables: {
        currentPage: 1,
        searchList: ''
      },
      fetchPolicy: 'network-only'
    }
  }),
  connect(mapState, mapDispatch)
)(VehicleList);