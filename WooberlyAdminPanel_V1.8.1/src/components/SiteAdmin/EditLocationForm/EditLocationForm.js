import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { flowRight as compose } from 'lodash'
import Link from '../../Link';
import { connect } from 'react-redux';
import validate from './validate';
// Style
import {
  FormGroup,
  Col,
  FormControl,
  Container,
  Row,
  Form
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './ManageLocation.css';
import bt from '../../../components/commonStyle.css';
import Loader from '../../Common/Loader';
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
import submit from './submit';
import GooglePolygonMap from '../../Common/GooglePolygonMap';

class ManageLocationForm extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    loading: false
  };
  renderFormControl = ({ input, label, type, meta: { touched, error }, className, note }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.formGroup}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} className={bt.noPadding}>
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
  renderTextAreaField = ({ input, label, type, meta: { touched, error }, children, labelClass, fieldClass, placeholder }) => {
    const { formatMessage } = this.props.intl;
    return (
      <Form.Group className={s.formGroup}>
       <label className={bt.labelText} >{label}</label>
        <Form.Control as="textarea" rows="3" {...input} placeholder={placeholder} type={type} className={fieldClass} />
        {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
      </Form.Group>
    )
  }
  render() {
    const { error, handleSubmit, submitting, title, loading, initialValues } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.pagecontentWrapper, 'mapSection')}>
        <Container className={s.containerWith}>
          <div className={s.contentBox}>
            <h1 className={s.headerTitle}>{title}</h1>
            <div className={cx(s.blockcenter, s.passwordSection)}>
              <Form className={s.fullWidth} onSubmit={handleSubmit(submit)} >
                {error && <strong>{error}</strong>}
                {
                  <Field
                    name="locationName"
                    type="text"
                    component={this.renderFormControl}
                    label={formatMessage(messages.nameOnly)}
                    className={bt.formControlInput}
                  />
                }
                {
                  <div className={bt.space3}>
                    <label className={bt.labelText} >{formatMessage(messages.status)}</label><br />
                    <Field name="isActive" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
                      <option value={1}>{formatMessage(messages.active)}</option>
                      <option value={0}>{formatMessage(messages.inactive)}</option>
                    </Field>
                  </div>
                }
                {
                  <Field
                    name="description"
                    type="text"
                    placeholder={formatMessage(messages.description)}
                    component={this.renderTextAreaField}
                    label={formatMessage(messages.description)}
                    labelClass={bt.labelText}
                    fieldClass={bt.formControlInput}
                  />
                }
                <div className={s.relative}>
                  <GooglePolygonMap
                    formName={'ManageLocationForm'}
                    fieldName={'path'}
                    paths={initialValues.path}
                  />
                </div>
                <Col lg={12} md={12} sm={12} xs={12} className={cx(bt.textAlignRight, bt.spaceTop3)}>
                  <Form.Group className={s.formGroup}>
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
                    <Link to={"/siteadmin/location"} className={cx(s.backBtn, bt.btnSecondary)} >{formatMessage(messages.goBack)}</Link>
                  </Form.Group>
                </Col>
              </Form>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
ManageLocationForm = reduxForm({
  form: 'ManageLocationForm',
  onSubmit: submit,
  validate
})(ManageLocationForm);
const mapState = (state) => ({
  loading: state.loader.updateLocation
});
const mapDispatch = {};
export default injectIntl(compose(
  withStyles(s, bt),
  connect(mapState, mapDispatch)
)(ManageLocationForm));
