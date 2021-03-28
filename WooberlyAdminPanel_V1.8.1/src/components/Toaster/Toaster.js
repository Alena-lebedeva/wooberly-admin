import React from 'react';

import ReduxToastr from 'react-redux-toastr'

// Style
import withStyles from 'isomorphic-style-loader/withStyles';
import s from '!isomorphic-style-loader!css-loader!sass-loader!react-redux-toastr/src/styles/index.scss';

class Toaster extends React.Component {
  static propTypes = {};

  render() {
    return <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates={true}
      position="top-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
    />;
  }
}

export default withStyles(s)(Toaster);
