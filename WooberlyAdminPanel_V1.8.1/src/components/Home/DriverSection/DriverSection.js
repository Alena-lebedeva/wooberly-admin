import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { FormattedMessage } from 'react-intl';
import s from './DriverSection.css';
import { Container } from 'react-bootstrap';
import HomeContext from '../../../routes/context/homeContext'

class DriverSection extends React.Component {
  render() {

    return (
      <div>
        
          <Container>
            <div className={s.homeInner}>
              <h1><FormattedMessage {...messages.driver} /></h1>
            </div>
          </Container>
        
      </div>
    );
  }
}

DriverSection.contextType = HomeContext

export default withStyles(s)(DriverSection);
