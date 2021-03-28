import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';
import {
  Form,
  Col,
  Row,
  Image,
  Card
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './AdminLoginForm.css';
import bt from '../../../components/commonStyle.css';
import arrow from './arrow.svg';
import { connect } from 'react-redux';
import Loader from '../../Common/Loader';

class AdminLoginForm extends Component {

  static defaultProps = {
    loading: false,
    siteName: ''
  };

  renderField = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder }) => {
    const { formatMessage } = this.props.intl;
    return (
      <Form.Group>
        <label className={bt.labelText} >{label}</label>
        <Form.Control {...input} placeholder={placeholder} type={type} className={bt.formControlInput} />
        {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
      </Form.Group>
    )
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, loading, siteName } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div>
        <Row className={cx("d-flex align-items-center", s.fullHeight)}>
          <Col md={6} lg={6} sm={6} xs={12} className={"d-none d-sm-block"}>
            <div className={s.welcomeContent}>
              <div>
                <h1>{siteName}</h1>
                <p><FormattedMessage {...messages.login} /></p>
              </div>
              <div className={cx(s.arrowIcon)}><Image src={arrow} /></div>
            </div>
          </Col>
          <Col md={6} lg={6} sm={6} xs={12}>
            <h1 className={cx('d-block d-sm-none', s.mobileText, 'd-block d-md-none')}><FormattedMessage {...messages.Wooberly} /></h1>
            <div className={cx(s.container, 'loginInput')}>
              <Card className={s.card}>

                <Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
                  {error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
                  <Field
                    name="email"
                    type="text"
                    component={this.renderField}
                    label={formatMessage(messages.email)}
                    placeholder={formatMessage(messages.emailaddress)}
                    labelClass={bt.labelText}
                    fieldClass={cx(bt.formControlInput)}
                  />
                  <Field
                    name="password"
                    type="password"
                    component={this.renderField}
                    label={formatMessage(messages.password)}
                    placeholder={formatMessage(messages.password)}
                    labelClass={bt.labelText}
                    fieldClass={cx(bt.formControlInput)}
                  />
                  <Form.Group className={s.loginButton}>
                    <Loader
                      type={"button"}
                      label={formatMessage(messages.login)}
                      show={loading}
                      buttonType={'submit'}
                      className={cx(bt.btnPrimary)}
                      disabled={submitting || loading}
                      isSuffix={true}
                    />
                  </Form.Group>
                </Form>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

AdminLoginForm = reduxForm({
  form: 'AdminLoginForm', // a unique name for this form
  validate,
  onSubmit: submit
})(AdminLoginForm);

const mapState = (state) => ({
  loading: state.loader.AdminLogin,
  siteName: state.siteSettings.data.siteName
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(AdminLoginForm)));

