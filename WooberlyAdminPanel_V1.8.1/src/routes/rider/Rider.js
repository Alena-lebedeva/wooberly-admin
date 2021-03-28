import React from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Rider.css';
import getAllHomePageSettings from './getAllHomePageSettings.graphql'

//Components
import RiderSection from '../../components/Home/RiderSection/RiderSection';
import SafetyGrid from '../../components/Home/SafetyGrid/SafetyGrid';
import AboutGrid from '../../components/Home/AboutGrid/AboutGrid';
import { HomeProvider } from '../context/homeContext'

class Rider extends React.Component {

  render() {
    const { getAllHomePageSettings: { loading, getAllHomePageSettings} } = this.props
    let homeSettings = {}
    if(!loading) {
      getAllHomePageSettings && getAllHomePageSettings.homePageData.map((item) => {
      homeSettings[item.name] = item.value
      }) 
    }
    
    return (
      <div>
      { !loading &&
        <div>
          <HomeProvider value={homeSettings}>
          <div className={s.homeBanner} />
          <RiderSection />
          <AboutGrid />
          <SafetyGrid />
          </HomeProvider>
        </div>  }
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
