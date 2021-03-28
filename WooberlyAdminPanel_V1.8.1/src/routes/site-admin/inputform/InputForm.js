import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Row, Col, Form, Button, FormControl } from 'react-bootstrap';
import s from './InputForm.css';
import { FormattedMessage, injectIntl } from 'react-intl';
//local
import messages from '../../../locale/messages';

class InputForm extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  renderField = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder }) => {
    // const { formatMessage } = this.props.intl;
    return (
      <Form.Group>
        <label className={bt.labelText} >{label}</label>
        <Form.Control {...input} placeholder={placeholder} type={type} className={fieldClass} />
        {/* {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>} */}
      </Form.Group>
    )
  }

  renderFieldTextArea = ({ textarea, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder }) => {
    // const { formatMessage } = this.props.intl;
    return (
      <Form.Group>
        <label className={bt.labelText} >{label}</label>
        <Form.Control {...textarea} placeholder={placeholder} type={type} className={fieldClass} />
        {/* {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>} */}
      </Form.Group>
    )
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, fieldClass }) => {
    // const { formatMessage } = this.props.intl;
    return (
      <div>
        <Form.Group>
        <label className={bt.labelText} >{label}</label>
          <FormControl as="select" className={fieldClass} >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </FormControl>
        </Form.Group>
      </div>
    )
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.heading}>
            <FormattedMessage {...messages.form} />
          </div>
          <div className={s.widthInner}>
            <Row>
              <Col lg={6} md={6} sm={6} xs={12}>
                {/* <div className={s.form}>
            <label className={bt.labelText} >FirstName</label>
            </div> */}
                <div className={s.inputField}>
                  <Field
                    name="FirstName"
                    type="text"
                    component={this.renderField}
                    label={formatMessage(messages.firstName)}
                    // placeholder={"Email Address"}
                    labelClass={s.labelText}
                    fieldClass={s.formControlInput}
                  />
                </div>
              </Col>
              <Col lg={6} md={6} sm={6} xs={12}>
                <div className={s.inputField}>
                  <Field
                    name="LastName"
                    type="text"
                    component={this.renderField}
                    label={formatMessage(messages.lastName)}
                    labelClass={s.labelText}
                    fieldClass={s.formControlInput}
                  />
                </div>
              </Col>
              <Col lg={6} md={6} sm={6} xs={12}>
                <div className={s.inputField}>
                  <Field
                    name="Email"
                    type="text"
                    component={this.renderField}
                    label={formatMessage(messages.emailaddress)}
                    labelClass={s.labelText}
                    fieldClass={s.formControlInput}
                  />
                </div>
              </Col>
              <Col lg={6} md={6} sm={6} xs={12}>
                <div className={s.inputField}>
                  <Field
                    name="Phone Number"
                    type="text"
                    component={this.renderField}
                    label={formatMessage(messages.phoneNumber)}
                    labelClass={s.labelText}
                    fieldClass={s.formControlInput}
                  />
                </div>
              </Col>
              <Col lg={6} md={6} sm={6} xs={12}>
                <div className={s.inputField}>
                  <Field
                    name="textarea"
                    type="textarea"
                    component={this.renderFieldTextArea}
                    label={formatMessage(messages.addOnly)}
                    labelClass={s.labelText}
                    fieldClass={s.formControlInput}
                  />
                </div>
              </Col>
              <Col lg={6} md={6} sm={6} xs={12}>
                <div className={s.inputField}>
                  <Field
                    name="State"
                    type="Select"
                    component={this.renderFormControlSelect}
                    label={formatMessage(messages.state)}
                    labelClass={s.labelText}
                    fieldClass={s.formControlInput}
                  />
                </div>
              </Col>
              <Col lg={6} md={6} sm={6} xs={12}>
                <div className={s.inputField}>
                  <Form.Check type="radio" aria-label="radio 1" label={formatMessage(messages.checkmein)} />
                </div>
              </Col>
              <Col lg={6} md={6} sm={6} xs={12}>
                <div className={s.inputField}>
                  <Form.Check aria-label="option 1" label={formatMessage(messages.checkmeout)} />
                </div>
              </Col>
            </Row>
            <div className={s.buttonCss}>
              <Button>
                <FormattedMessage {...messages.submitButton} />
              </Button>
              <a href="javascript:void(0);"><FormattedMessage {...messages.cancelButton} /></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

InputForm = reduxForm({
  form: 'InputForm', // a unique name for this form

})(InputForm);

export default injectIntl(withStyles(s)(InputForm));
