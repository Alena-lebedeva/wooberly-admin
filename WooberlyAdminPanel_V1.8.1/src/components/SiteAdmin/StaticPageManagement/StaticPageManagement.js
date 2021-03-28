import React, { Component } from 'react';
import s from './StaticPageManagement.css';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import { injectIntl, FormattedMessage } from 'react-intl';
//Style
import cx from 'classnames';
import {
    Table
} from 'react-bootstrap';
import Link from '../../Link/Link';
import messages from '../../../locale/messages';
import EditIcon from '../../../../public/Icons/edit.png';

export class StaticPageManagement extends Component {

    render() {
        const { formatMessage } = this.props.intl;
        let data = [{
            id: 1,
            pageName: formatMessage(messages.Support),
            pageUrl: '/support'
        }, {
            id: 2,
            pageName: formatMessage(messages.rider),
            pageUrl: '/rider'
        }, {
            id: 3,
            pageName: formatMessage(messages.driver),
            pageUrl: '/driver'
        }, {
            id: 4,
            pageName: formatMessage(messages.driverPrivacyPolicy),
            pageUrl: '/driver/privacy-policy'
        }];

        return (

            <div className={s.widthInner}>

                <div className={cx(s.tableCss, 'tableCss', 'tableSticky', 'NewResponsiveTable')}>
                    <Table className="table">
                        <thead>
                            <tr>
                                <th scope="col"><FormattedMessage {...messages.id} /></th>
                                <th scope="col"><FormattedMessage {...messages.pageName} /></th>
                                <th scope="col"><FormattedMessage {...messages.preview} /></th>
                                <th scope="col"><FormattedMessage {...messages.editAction} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((o) => {
                                    return (
                                        <tr>
                                            <td data-label={formatMessage(messages.id)}>{o.id}</td>
                                            <td data-label={formatMessage(messages.pageName)}>{o.pageName}</td>
                                            <td data-label={formatMessage(messages.preview)}>
                                                <a href={o.pageUrl} target={'_blank'}><FormattedMessage {...messages.preview} /></a>
                                            </td>
                                            <td data-label={formatMessage(messages.editAction)}>
                                                <Link to={'/siteadmin/staticpage/edit/' + o.id}>
                                                    <span><img src={EditIcon} className={s.editIcon} /></span>
                                                    <span className={s.vtrMiddle}>
                                                        <FormattedMessage {...messages.editAction} />
                                                    </span>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                </div>

            </div >
        )
    }
}

const mapState = (state) => ({});
const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(StaticPageManagement)));