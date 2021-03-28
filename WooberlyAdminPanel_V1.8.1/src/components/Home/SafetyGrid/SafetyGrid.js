import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './SafetyGrid.css';
import bt from '../../../components/commonStyle.css';
import cx from 'classnames';
import { Container, Row, Col } from 'react-bootstrap';
import HomeContext from '../../../routes/context/homeContext'
import { api, homepageUploadDir } from '../../../config'

class SafetyGrid extends React.Component {
  render() {
    const homepage = this.context
    const apiEndpoint = api && api.apiEndpoint
    return (
      <div className={s.safetyContainer} id="rider-section">
        <Container className={s.cotainerWith}>
          <Row className={s.displayFlex}>
            <Col xl={6} md={6} sm={6} xs={12} className={cx(bt.space4, bt.spaceTop4)}>
              <div className={cx(s.signUp, bt.space5)}>
                <h3>
                  {homepage.safetyGridTitle1}
                </h3>
                <p>
                {homepage.safetyGridContent1}
                </p>
              </div>
              <div className={cx(bt.paddingTop5, s.responsiveNoPadding)}>
                <div className={cx(s.displayInlineBlock, s.paddingRight)}>
                  <a href={homepage.safetyGridLink1} target="_blank" >
                    <img src={api.apiEndpoint + homepageUploadDir + homepage.safetyGridImage1} className={s.appImg} />
                  </a>
                </div>
                <div className={cx(s.displayInlineBlock, s.paddingLeft)}>
                  <a href={homepage.safetyGridLink2} target="_blank" >
                    <img src={api.apiEndpoint + homepageUploadDir + homepage.safetyGridImage2} className={s.appImg} />
                  </a>
                </div>
              </div>
            </Col>
            <Col xl={6} md={6} sm={6} xs={12}>
              <div>
                <img src={api.apiEndpoint + homepageUploadDir + homepage.safetyGridImage3} className={s.phoneImg} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
SafetyGrid.contextType = HomeContext
export default withStyles(s, bt)(SafetyGrid);
