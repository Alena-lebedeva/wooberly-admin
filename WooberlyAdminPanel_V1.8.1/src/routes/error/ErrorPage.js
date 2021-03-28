
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
// Translation
import { FormattedMessage } from 'react-intl';
import s from './ErrorPage.css';

class ErrorPage extends React.Component {
  static propTypes = {
    error: PropTypes.shape({
      name: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      stack: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    error: null,
  };

  render() {
    if (__DEV__ && this.props.error) {
      return (
        <div>
          <h1>{this.props.error.name}</h1>
          <pre>{this.props.error.stack}</pre>
        </div>
      );
    }

    return (
      <div>
        <h1><FormattedMessage {...messages.errorOnly} /></h1>
        <p><FormattedMessage {...messages.credentialError} /></p>
      </div>
    );
  }
}

export { ErrorPage as ErrorPageWithoutStyle };
export default withStyles(s)(ErrorPage);
