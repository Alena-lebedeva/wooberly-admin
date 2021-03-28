import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  Button
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Loader.css';

// Component
import MDSpinner from 'react-md-spinner';

class ButtonLoader extends Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    handleClick: PropTypes.any,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    spinnerColor: PropTypes.string,
  };

  static defaultProps = {
    label: 'Submit',
    show: false,
    type: 'button',
    spinnerColor: '#fff'
  };

  render() {
    const { label, show, type, handleClick, className, disabled, spinnerColor, isSuffix } = this.props;
    let isDisabled = false;
    if (show || disabled) {
      isDisabled = true;
    }
    return (
      <Button
        className={className}
        disabled={isDisabled}
        type={type}
        onClick={handleClick}
      >
        {
          show && !isSuffix && <MDSpinner
            singleColor={spinnerColor}
            size={18}
          />
        }
        { isSuffix ? (label + ' ') : (' ' + label) }
        {
          show && isSuffix && <MDSpinner
            singleColor={spinnerColor}
            size={18}
          />
        }
      </Button>
    );
  }
}

export default withStyles(s)(ButtonLoader);