// General
import React, { Component } from 'react';
// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';
import submit from './submit';
import validate from './validate';
// Translation
import { injectIntl } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';
// Redux
import { connect } from 'react-redux';
// Style
import withStyles from 'isomorphic-style-loader/withStyles';
import cx from 'classnames';
import s from './AdminUserForm.css';
import bt from '../../../components/commonStyle.css';
import {
  Button,
  FormGroup,
  FormControl,
  Row,
  Col,

} from 'react-bootstrap';
import { getAllAdminPrivileges } from '../../../helpers/adminPrivileges';

class AdminUserForm extends Component {
  static defaultProps = {
    roles: []
  };
  constructor(props) {
    super(props);
  }
  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormGroup className={bt.space1}>
          <div>
            <FormControl {...input} placeholder={label} type={type} className={bt.formControlInput} />
            {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
          </div>
        </FormGroup>
      </div>
    );
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl as="select" {...input} className={className} >
          {children}
        </FormControl>
        {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }
  render() {
    const { error, handleSubmit, submitting, id, roles } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx('maxwidthcenter', 'empty')}>
        <form onSubmit={handleSubmit(submit)}>
          {error && <strong>{formatMessage(error)}</strong>}
          <FormGroup className={bt.space3}>
          <label className={bt.labelText} ><FormattedMessage {...messages.emailText} /></label>
            <Field
              name="email"
              type="text"
              component={this.renderFormControl}
              className={cx(bt.formControlInput)}
            />
          </FormGroup>
          <FormGroup className={bt.space3}>
          <label className={bt.labelText} ><FormattedMessage {...messages.password} /></label>
            <Field
              name="password"
              type="password"
              component={this.renderFormControl}
              className={cx(bt.formControlInput)}
            />
            <p className={cx(s.userText, bt.noMargin)}><FormattedMessage {...messages.passwordText} /></p>
          </FormGroup>
          <FormGroup className={bt.space3}>
          <label className={bt.labelText} ><FormattedMessage {...messages.role} /></label>
            <Field
              name="roleId"
              component={this.renderFormControlSelect}
              className={cx(s.adminUserSelect,bt.formControlSelect)}
            >
              <option value={''}>{formatMessage(messages.selectRole)}</option>
              {
                roles && roles.length > 0 && roles.map((item, key) => {
                  return (
                    <option value={item.id} key={key}>{item.name}</option>
                  )
                })
              }
            </Field>
          </FormGroup>
          <FormGroup className={s.formGroup}>
            <div className={cx(bt.textAlignRight)}>
              <Button className={cx(bt.btnPrimary)} bsSize="large" type="submit" disabled={submitting}>
                {id ? formatMessage(messages.update) : formatMessage(messages.add)}
              </Button>
            </div>
          </FormGroup>
        </form>
      </div>
    )
  }
}
AdminUserForm = reduxForm({
  form: "AdminUserForm", // a unique name for this form
  validate,
})(AdminUserForm);
const selector = formValueSelector('AdminUserForm');
const mapState = (state) => ({
  id: selector(state, 'id')
});
const mapDispatch = {};
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(AdminUserForm)));