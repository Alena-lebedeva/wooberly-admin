import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { FormattedMessage } from 'react-intl';
import s from './Feedback.css';

class Feedback extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <a
            className={s.link}
            href="https://gitter.im/kriasoft/react-starter-kit"
          >
           <FormattedMessage {...messages.askQuestion} />
          </a>
          <span className={s.spacer}>|</span>
          <a
            className={s.link}
            href="https://github.com/kriasoft/react-starter-kit/issues/new"
          >
            <FormattedMessage {...messages.reportIssue} />
          </a>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Feedback);
