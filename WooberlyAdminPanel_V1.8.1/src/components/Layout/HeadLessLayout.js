import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Layout.css';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default withStyles(s)(Layout);
