
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Login.css';
import getSiteSettings from './getSiteSettings.graphql';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import AdminLoginForm from '../../components/SiteAdmin/AdminLoginForm';

class Login extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { getSiteSettings: { getSiteSettings, loading } } = this.props;
    let siteName;

    if(!loading) {
      let siteSettings = getSiteSettings && getSiteSettings.filter((item) => item.name == 'siteName')
      siteName = siteSettings && siteSettings[0].value
    }

    return (
      <div className={s.root}>
       
          {!loading && <AdminLoginForm siteName={siteName} />}
       
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(getSiteSettings, {
    name: 'getSiteSettings',
    options: {
      ssr: true
    }
  })
)(Login);
