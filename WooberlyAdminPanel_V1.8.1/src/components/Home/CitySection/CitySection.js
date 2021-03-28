import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './CitySection.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import messages from '../../../locale/messages';
import HomeSlider from '../../Home/HomeSlider/HomeSlider';
import cx from 'classnames';
import HomeContext from '../../../routes/context/homeContext'
import { api, homepageUploadDir } from '../../../config'


class CitySection extends React.Component {
  render() {
    const { data } = this.props
    const homepage = this.context
    return (
      <div className={cx(s.cityBg, s.city)}>
        <Container className={s.cotainerWith}>
          <div className={s.cityText}>
            <h1>{homepage.citySectionTitle1}</h1>
            <p>
              {homepage.citySectionContent1}
            </p>
            <div className={s.cityButton}>
              <Row>
                <Col lg={12} md={12} sm={12} xs={12}>
                  <HomeSlider data={data} />
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
CitySection.contextType = HomeContext
export default withStyles(s)(CitySection);
