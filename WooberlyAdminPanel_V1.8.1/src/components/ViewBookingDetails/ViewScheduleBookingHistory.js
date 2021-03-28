import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Collapsible from 'react-collapsible';
import moment from 'moment';

//Intl
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../locale/messages';

// style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/withStyles';
import bt from '../../components/commonStyle.css';
import s from './ViewBookingDetails.css';

class ViewScheduleBookingHistory extends Component {
    static defaultProps = { data: [] }

    constructor(props) {
        super(props);
        this.state = { load: true }
    }

    componentDidUpdate(prevProps) {
        const { locale } = this.props.intl;
        const { locale: prevLocale } = prevProps.intl;
        if (locale != prevLocale) {
            this.setState({ load: false })
            clearTimeout(this.loadSync);
            this.loadSync = null;
            this.loadSync = setTimeout(() => {
                this.setState({
                    load: true
                })
            }, 1);
        }
    }

    render() {
        const { data, intl: { formatMessage } } = this.props;
        const { load } = this.state;
        let tableHeaders = [messages.scheduledFrom, messages.scheduledTo, messages.status, messages.updatedAt];
        let header = formatMessage(messages.scheduleBookingHistory)
        return (
            <div className={s.mobileCollapsible}>
                {load && <Collapsible trigger={header}>
                    <div className={cx('tableSticky', 'NewResponsiveTable', s.setHeightAuto)}>
                        <Table className={cx("table", s.collapsedTable)} size="sm">
                            <thead>
                                <tr>
                                    {
                                        tableHeaders.map((header, index) => {
                                            return (<th scope="col" key={index}>{formatMessage(header)}</th>);
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data.length > 0 && data.map((item, key) => {
                                        return (
                                            <tr>
                                                <td data-label={formatMessage(messages.scheduledFrom)}>{item.scheduleFrom ? moment(item.scheduleFrom).format('DD-MM-YYYY HH:mm:ss') : item.scheduleFrom}</td>
                                                <td data-label={formatMessage(messages.scheduledTo)}>{item.scheduleTo ? moment(item.scheduleTo).format('DD-MM-YYYY HH:mm:ss') : item.scheduleTo}</td>
                                                <td data-label={formatMessage(messages.status)}>{item.tripStatus && messages[item.tripStatus] ? formatMessage(messages[item.tripStatus]) : item.tripStatus}</td>
                                                <td data-label={formatMessage(messages.updatedAt)}>{item.updatedAt ? moment(item.updatedAt).format('DD-MM-YYYY HH:mm:ss') : item.updatedAt}</td>
                                            </tr>
                                        );
                                    })
                                }
                                {
                                    (!data || data && data.length === 0) && <tr className={'text-center'}>
                                        <td colSpan={3}>
                                            {formatMessage(messages.noResult)}
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </Table>
                    </div>
                </Collapsible>}
            </div>
        );
    }
}

export default injectIntl(withStyles(s, bt)(ViewScheduleBookingHistory))