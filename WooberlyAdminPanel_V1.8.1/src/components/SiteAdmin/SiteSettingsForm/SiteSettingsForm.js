import React, { Component } from 'react'
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/withStyles';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { siteSettings } from '../../../actions/siteadmin/siteSettings'
import {
  Button,
  Row,
  FormGroup,
  Col,
  FormControl,
  Container,
  Form,
  InputGroup
} from 'react-bootstrap';
import cx from 'classnames';
import LogoDropzone from './LogoDropzone'
import s from './SiteSettingsForm.css';
import bt from '../../../components/commonStyle.css';
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages'
import submit from './submit'
import validate from './validate'
import { api, logoUploadDir } from '../../../config'
import Loader from '../../Common/Loader';

export class SiteSettingsForm extends Component {
  static defaultProps = {
    loading: false
  };
  componentDidUpdate() {

  }
  renderFormControl = ({ input, label, type, meta: { touched, error }, className, maxlength }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormGroup className={s.formGroup}>
          <div>
            <label className={bt.labelText} >{label}</label>
          </div>
          <div>
            <FormControl {...input} placeholder={label} type={type} className={bt.formControlInput} maxlength={maxlength} />
            {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
          </div>
        </FormGroup>
      </div>
    );
  }
  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormGroup className={s.formGroup}>
          <div>
            <label className={bt.labelText} >{label}</label>
          </div>
          <div>
            <FormControl
              {...input}
              className={className}
              placeholder={label}
              as="textarea"
              rows="3"
            >
              {children}
            </FormControl>
            {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
          </div>
        </FormGroup>
      </div>
    );
  }
  renderFieldApp = ({ input, label, type, meta: { touched, error }, className, maxlength }) => {
    return (
      <div className={cx('inputFormAddon', 'addonBorder')}>
        <Form.Group>
          <label className={bt.labelText} >{label}</label>
          <InputGroup>
            <InputGroup.Append>
              <InputGroup.Text>
                V
                </InputGroup.Text>
            </InputGroup.Append>
            <FormControl {...input} placeholder={label} type={type} className={bt.formControlInput} maxlength={maxlength} />
          </InputGroup>
          {touched && error && <span className={bt.errorMessage}>{error.defaultMessage}</span>}
        </Form.Group>
      </div>
    )
  }
  render() {
    const { formatMessage } = this.props.intl;
    const { handleSubmit, logo, loading, submitting, appForceUpdate } = this.props;
       return (
      <div>
        <div>
          <Container fluid>
            <form onSubmit={handleSubmit(submit)}>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} className={cx(s.marbtm14, bt.spaceTop2)}>
                  <div className={s.profileImgSection}>
                    <label className={bt.labelText} >{formatMessage(messages.logo)}</label>
                    {logo && <div>
                      <img src={api.apiEndpoint + logoUploadDir + 'medium_' + logo} className={s.profileImg} />
                    </div>}
                    <div className={'commonFilepicker'}>
                      <LogoDropzone
                        className={cx(bt.btnSecondary, 'fileNoPadding')}
                        subTextClass={s.subText}
                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                        defaultMessage={formatMessage(messages.chooseFile)}
                      />
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={4} md={6} lg={6} className={bt.space2}>
                  <Field name="logoWidth" type="text" component={this.renderFormControl} label={formatMessage(messages.logowidth)} />
                </Col>
                <Col xs={12} sm={4} md={6} lg={6} className={bt.space2}>
                  <Field name="logoHeight" type="text" component={this.renderFormControl} label={formatMessage(messages.logoheight)} />
                </Col>
                <Col xs={12} sm={4} md={12} lg={6} className={bt.space2}>
                  <Field name="siteName" type="text" component={this.renderFormControl} label={formatMessage(messages.siteName)} maxlength={15} />
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} className={bt.space2}>
                  <Field name="siteTitle" type="text" component={this.renderFormControl} label={formatMessage(messages.siteTitle)} />
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} className={bt.space2}>
                  <Field name="metaKeyword" type="text" component={this.renderFormControlTextArea} label={formatMessage(messages.metakey)} />
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} className={bt.space2}>
                  <Field name="metaDescription" type="text" component={this.renderFormControlTextArea} label={formatMessage(messages.metaDesc)} />
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} className={bt.space2}>
                  <Field name="facebookLink" type="text" component={this.renderFormControl} label={'Facebook URL'} />
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} className={bt.space2}>
                  <Field name="twitterLink" type="text" component={this.renderFormControl} label={'Twitter URL'} />
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} className={bt.space2}>
                  <Field name="instagramLink" type="text" component={this.renderFormControl} label={'Instagram URL'} />
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} className={bt.space2}>
                  <Field name="youtubeLink" type="text" component={this.renderFormControl} label={'Youtube URL'} />
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={6} xs={12}>
                  <Form.Group className={s.formGroup}>
                    <div>
                      <label className={bt.labelText} >{formatMessage(messages.forceUpdate)}</label><br />
                      <Field name="appForceUpdate" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">{formatMessage(messages.forceUpdate)}
                        <option value="true">{formatMessage(messages.Enable)}</option>
                        <option value="false">{formatMessage(messages.Disable)}</option>
                      </Field>
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              {
               String(appForceUpdate) === 'true' && <Row>
               <Col xs={12} sm={12} md={12} lg={6} className={bt.space2}>
                    <Form.Group className={s.formGroup}>
                      <div>
                        <Field name="riderAndroidVersion" type="text" component={this.renderFieldApp} label={formatMessage(messages.riderAndriodVersion)}
                         maxlength={10} />
                      </div>
                    </Form.Group>
                  </Col>
               
                <Col xs={12} sm={12} md={12} lg={6} className={bt.space2}>
                  <Form.Group className={s.formGroup}>
                    <div>
                      <Field name="riderIosVersion" type="text" component={this.renderFieldApp} label={formatMessage(messages.rideriosVersion)} maxlength={10} />
                    </div>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} className={bt.space2}>
                  <Form.Group className={s.formGroup}>
                    <div>
                      <Field name="driverAndroidVersion" type="text" component={this.renderFieldApp} label={formatMessage(messages.driverAndriodVersion)}
                        maxlength={10} />
                    </div>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} className={bt.space2}>
                  <Form.Group className={s.formGroup}>
                    <div>
                      <Field name="driverIosVersion" type="text" component={this.renderFieldApp} label={formatMessage(messages.driveriosVersion)}  maxlength={10} />
                    </div>
                  </Form.Group>
                </Col>
                </Row>
                 }
              <div className={bt.textAlignRight}>
                  <FormGroup className={s.formGroup}>
                    <div>
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
                  </FormGroup>
                </div>
             
            </form>
          </Container>
        </div>
      </div>
    )
  }
}
const callSiteSettings = async (result, dispatch, props) => {
  const { refetch } = props
  await refetch()
  dispatch(siteSettings())
}
SiteSettingsForm = reduxForm({
  form: 'SiteSettingsForm',
  onSubmit: submit,
  validate,
  onSubmitSuccess: callSiteSettings
})(SiteSettingsForm);

const selector = formValueSelector('SiteSettingsForm')

const mapState = (state) => ({
  logo: selector(state, 'homeLogo'),
  appForceUpdate: selector(state, 'appForceUpdate'),
  loading: state.loader.SiteSettings
})
const mapDispatch = {
  siteSettings
}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(SiteSettingsForm)));
