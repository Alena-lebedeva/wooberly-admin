import React from 'react';
import moment from 'moment';

// Redux
import { connect } from 'react-redux';
import { change } from 'redux-form';

// Translation
import { injectIntl } from 'react-intl';

import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

// Style
import withStyles from 'isomorphic-style-loader/withStyles';
import s from '!isomorphic-style-loader!css-loader!sass-loader!react-dates/lib/css/_datepicker.css';
import c from './DatePicker.css';


class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      date: null
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  componentDidMount() {
    const { initialDate } = this.props;
    if (initialDate) {
      this.setState({ date: moment(initialDate) });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps, prevProps) {
    const { initialDate } = nextProps;
    if (initialDate) {
      this.setState({ date: moment(initialDate) });
    }
  }

  onDateChange(date) {
    const { change, formName, fieldName } = this.props;
    
    if (formName && fieldName) {
      change(formName, fieldName, date);
    }

    this.setState({ date });
  }

  onFocusChange({ focused }) {
    this.setState({ focused });
  }

  render() {
    const { placeholder } = this.props;
    const { focused, date } = this.state;
    
    return (
      <div>
        <SingleDatePicker
          onDateChange={this.onDateChange}
          onFocusChange={this.onFocusChange}
          focused={focused}
          date={date}
          placeholder={placeholder}
          readOnly
          id={'DatePickerId'}
          numberOfMonths={1}
          hideKeyboardShortcutsPanel
          readOnly
          noBorder
          showClearDate
        />
      </div>
    );
  }
}

const mapState = state => ({
  
});

const mapDispatch = {
  change
};

export default injectIntl(withStyles(s,c)(connect(mapState, mapDispatch)(DatePicker)));

