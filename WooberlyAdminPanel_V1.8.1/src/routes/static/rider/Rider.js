import React from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Rider.css';
import getAllHomePageSettings from './getAllHomePageSettings.graphql'
import Page from '../../../components/Page/Page';
import SafetyGrid from '../../../components/Home/SafetyGrid/SafetyGrid';
import { HomeProvider } from '../../context/homeContext'

class Rider extends React.Component {

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
              <div className={s.riderBlog}>
                <SafetyGrid />
              </div>
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
)(Rider);
