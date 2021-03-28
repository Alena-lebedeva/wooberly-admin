import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Dashboard.css';
import AdminDashboard from '../../../components/SiteAdmin/AdminDashboard/AdminDashboard'
import { graphql } from 'react-apollo';
import { compose } from 'redux';
import getDashboardCount from './getDashboardCount.graphql';
import getAdminUser from './GetAdminUser.graphql';
import Loader from '../../../components/Common/Loader/Loader';
import { adminLogout } from '../../../actions/siteadmin/logout';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    getDashboardCount: PropTypes.object
  };

  render() {
    const { getDashboardCount: { loading, getDashboardCount: earnings }, getDashboardCount, getAdminUser, title, adminLogout } = this.props;

    if (getAdminUser.getAdminUser === null) {
      adminLogout()
    }
    const todayEarnings = earnings && earnings.todayEarnings.reduce(
        function (a, b) { 
          return a + parseFloat(b.riderServiceFee) + parseFloat(b.driverServiceFee) 
        }, 0
      ).toFixed(2)
    
    const weeklyEarnings = earnings && earnings.weeklyEarnings.reduce(
        function (a, b) { 
          return a + parseFloat(b.riderServiceFee) + parseFloat(b.driverServiceFee) 
        }, 0
      ).toFixed(2)
    
    const monthlyEarnings = earnings && earnings.monthlyEarnings.reduce(
        function (a, b) { 
          return a + parseFloat(b.riderServiceFee) + parseFloat(b.driverServiceFee) 
        }, 0
      ).toFixed(2)

    const totalEarnings = earnings && earnings.totalEarnings.reduce(
        function (a, b) { 
          return a + parseFloat(b.riderServiceFee) + parseFloat(b.driverServiceFee) 
        }, 0
      ).toFixed(2)

    return (
      <Loader type={"page"} show={loading}>
      <div className={s.root}>
        <div className={s.container}>
          <AdminDashboard 
            title={title} 
            count={getDashboardCount} 
            todayEarnings= {todayEarnings}
            weeklyEarnings = {weeklyEarnings}
            monthlyEarnings = {monthlyEarnings}
            totalEarnings = {totalEarnings}
          />
        </div>
      </div>
      </Loader>
    );
  }
}
const mapState = state => ({})

const mapDispatch = {
  adminLogout
}

export default compose(
  withStyles(s),
  (connect(mapState, mapDispatch)),
  graphql(getDashboardCount, {
    name: 'getDashboardCount',
    options: {
      ssr: true,
      fetchPolicy: 'network-only'
    }
  }),
  graphql(getAdminUser,
    {
        name: 'getAdminUser',
        options: {
          ssr: true,
          fetchPolicy: 'network-only'
        }
    }
),
) (Dashboard);
