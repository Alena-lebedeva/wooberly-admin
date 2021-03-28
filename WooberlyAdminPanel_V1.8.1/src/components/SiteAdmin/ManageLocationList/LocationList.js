import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/withStyles';
import { Table, FormControl, ButtonToolbar, Button } from 'react-bootstrap';
import s from './ManageLocation.css';
import bt from '../../../components/commonStyle.css';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import messages from '../../../locale/messages';
import CustomPagination from '../../CustomPagination';
import { flowRight as compose } from 'lodash';
import PropTypes from 'prop-types';
import Link from '../../Link/Link';
import EditIcon from '../../../../public/Icons/edit.png';
import TrashIcon from '../../../../public/Icons/bin.svg'
import { connect } from 'react-redux';
import { deleteLocation } from '../../../actions/siteadmin/deleteLocation'
import { updateLocation } from '../../../actions/siteadmin/updateLocation';
export class LocationList extends Component {
    static propTypes = {
        locationList: PropTypes.object,
    }
    constructor(props) {
        super(props)

        this.state = {
            currentPage: 1,
        }
        this.paginationData = this.paginationData.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleSearchClick(searchList) {
        const { locationList: { refetch } } = this.props
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
        const { locationList: { refetch }, deleteLocation } = this.props;
        this.setState({ currentPage: 1 });
        let variables = { currentPage: 1 };
        await deleteLocation(id, currentPage);
        refetch(variables);
    }
    async handleChange(e, id, locationName, description, coordinates) {
        const { updateLocation, locationList: { refetch } } = this.props;
        this.setState({ currentPage: 1 });
        let variables = { currentPage: 1 };
        let isActive = e.target.value;
        await updateLocation(locationName, coordinates, id, description, isActive);
        refetch(variables);

    }
    paginationData(currentPage) {
        const { locationList: { refetch } } = this.props;
        let variables = { currentPage };
        this.setState({ currentPage });
        refetch(variables);
    }
    render() {
        const { locationList, locationList: { getLocationList } } = this.props;
        const { currentPage } = this.state;
        const { formatMessage } = this.props.intl;
        return (
            <div className={cx(s.widthInner, 'whiteDropdown')}>
                <div className={s.searchInput}>
                    <FormControl type='text' placeholder={formatMessage(messages.searchOnly)} onChange={(e) => this.handleSearchChange(e)} className={bt.formControlInput} />
                </div>
                <div className={cx(bt.padding2, bt.paddingTop2, s.displayInlineBlock, s.rightSide)}>
                    <Link to={"/siteadmin/manage-location"} className={cx(bt.btnPrimary)} >{formatMessage(messages.addLocation)}</Link>
                </div>
                <div className={cx(s.tableCss, 'tableCss', 'tableSticky', 'NewResponsiveTable')}>
                    <Table className="table">
                        <thead>
                            <tr>
                                <th scope="col"><FormattedMessage {...messages.id} /></th>
                                <th scope="col"><FormattedMessage {...messages.location} /></th>
                                <th scope="col"><FormattedMessage {...messages.description} /></th>
                                <th scope="col"><FormattedMessage {...messages.status} /></th>
                                <th scope="col"><FormattedMessage {...messages.action} /></th>
                                <th scope="col"><FormattedMessage {...messages.deleteAction} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                locationList && locationList.getLocationList && locationList.getLocationList.LocationData && locationList.getLocationList.LocationData.length > 0 && locationList.getLocationList.LocationData.map((item, index) => {
                                    item.isActive = item.isActive == true ? 1 : 0;
                                    return (
                                        <tr key={index}>
                                            <td data-label={formatMessage(messages.id)}>{item.id}</td>
                                            <td data-label={formatMessage(messages.location)}>{item.locationName}</td>
                                            <td data-label={formatMessage(messages.description)}>{item.description}</td>
                                            <td data-label={formatMessage(messages.status)}>
                                                <select name="isActive" onChange={(e) => this.handleChange(e, item.id, item.locationName, item.description, item.coordinates)} className={bt.selectInput} value={item.isActive}>
                                                    <option value={1}>{formatMessage(messages.active)}</option>
                                                    <option value={0}>{formatMessage(messages.inactive)}</option>
                                                </select>
                                            </td>
                                            <td data-label={formatMessage(messages.action)}><Link to={'/siteadmin/edit-location/' + item.id} className={cx('editAlign', s.displayFlex)}><span><img src={EditIcon} className={s.editIcon} /></span>
                                                <span className={s.vtrMiddle}>
                                                    <FormattedMessage {...messages.editAction} />
                                                </span></Link></td>
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
                                locationList && locationList.getLocationList && locationList.getLocationList.LocationData && locationList.getLocationList.LocationData.length == 0 && (
                                    <tr>
                                        <td colspan="12" className={s.noRecords}><FormattedMessage {...messages.noResult} /></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
                {
                    locationList && locationList.getLocationList && locationList.getLocationList.LocationData && locationList.getLocationList.LocationData.length > 0
                    && <div className={cx(bt.space5, bt.spaceTop5)}>
                        <CustomPagination
                            total={locationList.getLocationList.count}
                            currentPage={currentPage}
                            defaultCurrent={1}
                            defaultPageSize={10}
                            change={this.paginationData}
                            paginationLabel={locationList.getLocationList.count == 1 ? formatMessage(messages.locationName) : formatMessage(messages.locations)}
                        />
                    </div>
                }
            </div>
        )
    }
}
const mapState = (state) => ({});
const mapDispatch = {
    deleteLocation,
    updateLocation
};
export default injectIntl(compose(
    withStyles(s, bt),
    connect(mapState, mapDispatch)
)(LocationList));

