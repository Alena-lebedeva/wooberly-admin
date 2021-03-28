import React from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Driver.css';
import getAllHomePageSettings from './getAllHomePageSettings.graphql'
import Page from '../../../components/Page/Page';
import SignupGrid from '../../../components/Home/SignupGrid/SignupGrid';
import { HomeProvider } from '../../context/homeContext'
import { api, staticpageUploadDir } from '../../../config'

class Driver extends React.Component {

  render() {
    const { getAllHomePageSettings: { loading, getAllHomePageSettings }, data: { getEditStaticPage, loading: staticLoading } } = this.props
    let homeSettings = {}
    if (!loading) {
      getAllHomePageSettings && getAllHomePageSettings.homePageData.map((item) => {
        homeSettings[item.name] = item.value
      })
    }

    const pageBanner = getEditStaticPage && getEditStaticPage.pageBanner

    return (
      <div>
        {!loading && !staticLoading &&
          <div>
            <HomeProvider value={homeSettings}>
              <div className={s.homeBanner} />
              <Page
                html={getEditStaticPage && getEditStaticPage.content}
                title={getEditStaticPage && getEditStaticPage.metaTitle}
                pageBanner={pageBanner}
              />

              <SignupGrid />
            </HomeProvider>
          </div>}
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(getAllHomePageSettings, {
    name: 'getAllHomePageSettings',
    options: {
      ssr: true
    }
  })
)(Driver);
