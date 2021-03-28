// General
import React, { Component } from 'react';
// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';
import submit from './submit';
import validate from './validate';
// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
// Redux
import { connect } from 'react-redux';
// Style
import withStyles from 'isomorphic-style-loader/withStyles';
import cx from 'classnames';
import s from './AdminRolesForm.css';
import bt from '../../../components/commonStyle.css';
import {
  Button,
  FormGroup,
  FormControl,
  Col,
  Row,
} from 'react-bootstrap';
import { getAllAdminPrivileges } from '../../../helpers/adminPrivileges';
// Internal Components
import CustomCheckbox from '../../Common/CustomCheckbox';

class AdminRolesForm extends Component {
  constructor(props) {
    super(props);
  }
  renderFormControl = ({ input, label, type, meta: { touched, error } }) => {
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
  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup>
        <FormControl
          {...input}
          className={className}
          as="textarea"
          rows="3"
          placeholder={label}
        >
          {children}
        </FormControl>
        {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    );
  }
  renderCheckbox = ({ input, label, meta: { touched, error }, options, className }) => {
    const { formatMessage } = this.props.intl;
    let currentValue = input.value || [];
    return (
      <div>
        {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
        <Row>
          {
            options && options.length > 0 && options.map((option, index) => {
              return (
                <Col xl={6} lg={6} md={12} sm={12} xs={12} key={index} className={cx(className, bt.noPadding)}>

                  <div className={s.table}>
                    <div className={s.tableRow}>
                      <div className={cx(s.tableCell, s.checkBoxWidth)}>
                        <CustomCheckbox
                          {...input}
                          className={'icheckbox_square-green'}
                          value={option.id}
                          name={`${input.name}[${index}]`}
                          checked={currentValue.indexOf(option.id) !== -1}
                          onChange={(event) => {
                            const newValue = [...currentValue] || [];
                            if (event === true) {
                              newValue.push(option.id);
                            } else {
                              newValue.splice(newValue.indexOf(option.id), 1);
                            }
                            return input.onChange(newValue);
                          }}
                        />
                      </div>
                      <div className={cx(s.tableCell, s.textWidth)}>
                        {' ' + option.privilege}
                      </div>
                    </div>
                  </div>
                </Col>
              )
            })
          }
        </Row>
      </div>
    );
  }
  render() {
    const { error, handleSubmit, submitting, id } = this.props;
    const { formatMessage } = this.props.intl;
    let privileges = getAllAdminPrivileges();
    return (
      <div className={cx('maxwidthcenter', 'empty')}>
        <form onSubmit={handleSubmit(submit)}>
          {error && <strong>{formatMessage(error)}</strong>}
          <FormGroup className={bt.space3}>
            <label className={bt.labelText} ><FormattedMessage {...messages.roleName} /></label>
            <Field
              name="name"
              type="text"
              component={this.renderFormControl}
              className={cx(bt.formControlInput)}
            />
          </FormGroup>
          <FormGroup className={bt.space3}>
            <label className={bt.labelText} ><FormattedMessage {...messages.description} /></label>
            <Field
              name="description"
              component={this.renderFormControlTextArea}
            />
          </FormGroup>
          <FormGroup className={bt.space3}>
            <label className={bt.labelText} ><FormattedMessage {...messages.privileges} /></label>
            <Field
              name="privileges"
              component={this.renderCheckbox}
              options={privileges}
              className={cx(bt.space3)}
            />
          </FormGroup>
          <FormGroup className={bt.space3}>
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
AdminRolesForm = reduxForm({
  form: "AdminRolesForm", // a unique name for this form
  validate,
})(AdminRolesForm);
const selector = formValueSelector('AdminRolesForm');
const mapState = (state) => ({
  id: selector(state, 'id')
});
const mapDispatch = {};
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(AdminRolesForm)));