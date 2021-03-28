import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './SignupGrid.css';
import bt from '../../../components/commonStyle.css';
import cx from 'classnames';
import { Container, Row, Col } from 'react-bootstrap';
import HomeContext from '../../../routes/context/homeContext'
import { api, homepageUploadDir } from '../../../config'


class SignupGrid extends React.Component {
  render() {
    const homepage = this.context
    const apiEndpoint = api && api.apiEndpoint
    return (
      <div className={cx(s.safetyContainer, s.gridBottom, s.imgSectionHeight)} id="driver-section">
        <Container className={s.cotainerWith}>
          <Row className={s.displayFlex}>
            <Col xl={6} md={6} sm={6} xs={12}>
              <div className={s.signUp}>
                <img src={api.apiEndpoint + homepageUploadDir + homepage.signupGridImage3} className={s.phoneImg} />
              </div>
            </Col>
            <Col xl={6} md={6} sm={6} xs={12} className={cx(bt.spaceTop6, s.responsiveNoMargin)}>
              <div className={cx(s.signUp, bt.space5)}>
                <h3>
                  {homepage.signupGridTitle1}
                </h3>
                <p>
                  {homepage.signupGridContent1}
                </p>
              </div>
              <div className={cx(bt.paddingTop5, s.responsiveNoPadding)}>
                <div className={cx(s.displayInlineBlock, s.paddingRight)}>
                  <a href={homepage.signupGridLink1} target="_blank" >
                    <img src={api.apiEndpoint + homepageUploadDir + homepage.signupGridImage1} className={s.appImg} />
                  </a>
                </div>
                <div className={cx(s.displayInlineBlock, s.paddingLeft)}>
                  <a href={homepage.signupGridLink2} target="_blank" >
                    <img src={api.apiEndpoint + homepageUploadDir + homepage.signupGridImage2} className={s.appImg} />
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
SignupGrid.contextType = HomeContext
export default withStyles(s, bt)(SignupGrid);
