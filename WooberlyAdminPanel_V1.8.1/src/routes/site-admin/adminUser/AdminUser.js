import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './AdminUser.css';
import adminUserQuery from './adminUserQuery.graphql';
import adminRolesQuery from './adminRolesQuery.graphql';
import AdminUserManagement from '../../../components/SiteAdmin/AdminUserManagement';
import Loader from '../../../components/Common/Loader/Loader';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages'

class AdminUser extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getAllAdminRoles: PropTypes.array,
    })
  };

  static defaultProps = {
    data: {
      loading: true
    },
    adminRoles: {
      getAllAdminRoles: []
    }
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { data: { loading, getAllAdminUsers } } = this.props;
    const { adminRoles: { getAllAdminRoles } } = this.props;

    // if(loading){
    //   return <Loader type={"text"} />;
    // } else {

    return (<div className={s.root}>
      <div className={s.container}>
        <div className={s.heading}>
          {formatMessage(messages.manageAdminUsers)}
        </div>
        <div className={s.paddingRoutesSection}>
          <AdminUserManagement data={getAllAdminUsers} roles={getAllAdminRoles} />
        </div>
      </div>
    </div>)

    // }
  }

}

export default compose(
  injectIntl,
  withStyles(s),
  graphql(adminUserQuery, {
    options: {
      fetchPolicy: 'network-only'
    }
  }),
  graphql(adminRolesQuery, {
    name: 'adminRoles',
    options: {
      fetchPolicy: 'network-only',
      ssr: true
    }
  })
)(AdminUser);