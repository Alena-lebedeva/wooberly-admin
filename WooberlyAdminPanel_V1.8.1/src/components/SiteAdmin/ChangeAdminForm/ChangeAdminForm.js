import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, reset } from 'redux-form';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import { flowRight as compose } from 'lodash'
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
// Style
import {
  FormGroup,
  Col,
  FormControl,
  Container,
  Row
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './ChangeAdminForm.css';
import bt from '../../../components/commonStyle.css';
import Loader from '../../Common/Loader';
import { setLoaderStart, setLoaderComplete } from '../../../actions/loader/loader';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages'

import validate from './validate';

class ChangeAdminForm extends Component {


  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  static defaultProps = {
    loading: false
  };

  renderFormControl = ({ input, label, type, meta: { touched, error }, className, note }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.formGroup}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <label className={bt.labelText} >{label}</label>

            <FormControl {...input} placeholder={label} type={type} className={bt.formControlInput} />
            {
              note && <p className={s.subtext}>{note}</p>
            }
            {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
          </Col>
        </Row>
      </FormGroup>
    );
  }

  async submitForm(values, dispatch) {

    dispatch(setLoaderStart('changePassword'));

    const { mutate } = this.props;
    const { data } = await mutate({ variables: values });

    if (data && data.changeAdminUser) {
      if (data.changeAdminUser.status == '200') {
        toastr.success("Changed Successfully!", "Admin details changed successfully!");
      } else {
        toastr.error("Oops!", "Your changes to admin details failed!");
      }
    }

    dispatch(setLoaderComplete('changePassword'));
    dispatch(reset('ChangeAdminForm'));

  }

  render() {

    const { error, handleSubmit, submitting, dispatch, title, isSuperAdmin, loading } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.pagecontentWrapper)}>
        <Container className={s.containerWith}>
          <div className={s.contentBox}>
            <h1 className={s.headerTitle}>{title}</h1>
            <div className={cx(s.blockcenter, s.passwordSection)}>
              <form onSubmit={handleSubmit(this.submitForm)}>
                {error && <strong>{error}</strong>}
                {
                  isSuperAdmin &&
                  <Field
                    name="email"
                    type="text"
                    component={this.renderFormControl}
                    label={formatMessage(messages.emailaddress)}
                    note={formatMessage(messages.leaveEmail)}
                    className={bt.formControlInput}
                  />
                }
                <Field name="password" type="password" component={this.renderFormControl} label={formatMessage(messages.password)} className={bt.formControlInput} />
                <Field name="confirmPassword" type="password" component={this.renderFormControl} label={formatMessage(messages.confirmPassword)} className={bt.formControlInput} />
                <FormGroup className={s.formGroup}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className={bt.textAlignRight}>
                      <div className={s.displayInlineBlock}>
                        <Loader
                          type={"button"}
                          label={formatMessage(messages.submitButton)}
                          show={loading}
                          buttonType={'submit'}
                          className={cx(bt.btnPrimary)}
                          disabled={submitting || loading}
                          isSuffix={true}
                        />
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
              </form>
            </div>
          </div>
        </Container>
      </div>
    );
  }

}

ChangeAdminForm = reduxForm({
  form: 'ChangeAdminForm',
  validate
})(ChangeAdminForm);

const mapState = (state) => ({
  isSuperAdmin: state.runtime.isSuperAdmin,
  loading: state.loader.changePassword
});

const mapDispatch = {};

export default injectIntl(compose(
  withStyles(s, bt),
  connect(mapState, mapDispatch),
  graphql(gql`
    mutation changeAdminUser($email: String, $password: String!) {
      changeAdminUser (email: $email, password: $password) {
        status
      }
    }
  `),
)(ChangeAdminForm));
