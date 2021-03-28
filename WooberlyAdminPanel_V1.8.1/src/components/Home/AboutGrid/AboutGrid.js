import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './AboutGrid.css';
import cx from 'classnames';
import { Container } from 'react-bootstrap';
import HomeContext from '../../../routes/context/homeContext'
import { api, homepageUploadDir } from '../../../config'


class AboutGrid extends React.Component {
  render() {
    const homepage = this.context
    const apiEndpoint = api && api.apiEndpoint
    return (
      <div className={s.aboutContainer}>
        <Container className={s.cotainerWith}>
          <div className={s.aboutGrid}>
            <div className={s.aboutCenter} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir + homepage.aboutGridImage1})` }} />
            <div className={cx(s.mobimleImg, 'd-none d-sm-block')}>
              <img src={api.apiEndpoint + homepageUploadDir + homepage.aboutGridImage2} className={cx(s.responsiveView)} />
            </div>
            <div className={cx(s.contentOne, s.responsiveContentOne, s.noPosition)}>
              <h1>{homepage.aboutGridTitle1}</h1>
              <p>{homepage.aboutGridContent1}</p>
            </div>
            <div className={cx(s.contentOne, s.positionTwo, s.noPosition)}>
              <h1>{homepage.aboutGridTitle2}</h1>
              <p>{homepage.aboutGridContent2}</p>
            </div>
            <div className={cx(s.contentOne, s.positionThree, s.noPosition)}>
              <h1>{homepage.aboutGridTitle3}</h1>
              <p>{homepage.aboutGridContent3}</p>
            </div>
            <div className={cx(s.contentOne, s.positionFour, s.noPosition)}>
              <h1>{homepage.aboutGridTitle4}</h1>
              <p>{homepage.aboutGridContent4}</p>
            </div>
            <div className={cx(s.contentOne, s.positionFive, s.noPosition)}>
              <h1>{homepage.aboutGridTitle5}</h1>
              <p>{homepage.aboutGridContent5}</p>
            </div>
            <div className={cx(s.contentOne, s.positionSix, s.noPosition)}>
              <h1>{homepage.aboutGridTitle6}</h1>
              <p>{homepage.aboutGridContent6}</p>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
AboutGrid.contextType = HomeContext
export default withStyles(s)(AboutGrid);
