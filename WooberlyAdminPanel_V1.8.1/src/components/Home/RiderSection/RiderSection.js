import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { FormattedMessage } from 'react-intl';
import s from './RiderSection.css';
import { Container } from 'react-bootstrap';
import HomeContext from '../../../routes/context/homeContext'

class RiderSection extends React.Component {
  render() {

    return (
      <div>
        
          <Container>
            <div className={s.homeInner}>
            <h1><FormattedMessage {...messages.rider} /></h1>
              
            </div>
          </Container>
        
      </div>
    );
  }
}

RiderSection.contextType = HomeContext

export default withStyles(s)(RiderSection);
