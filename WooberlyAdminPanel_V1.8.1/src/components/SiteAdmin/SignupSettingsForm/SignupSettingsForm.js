import React, { Component } from 'react';
import s from './SignupSettingsForm.css';
import bt from '../../../components/commonStyle.css';
import { Field, reduxForm, getFormValues, change, formValueSelector } from 'redux-form';
import submit from './submit';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import { injectIntl } from 'react-intl';
//Style
import cx from 'classnames';
import {
    Form,
    Col,
    Card,
    Row,
    FormControl,
    FormGroup
} from 'react-bootstrap';
import messages from '../../../locale/messages';
import validate from './validate';
import Dropzone from './Dropzone.js'
import Loader from '../../Common/Loader';
import { api, homepageUploadDir } from '../../../config';

export class SignupSettingsForm extends Component {
    renderField = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder }) => {
        const { formatMessage } = this.props.intl
        return (
            <Form.Group>
                <label className={bt.labelText} >{label}</label>
                <Form.Control {...input} placeholder={placeholder} type={type} className={bt.formControlInput} />
                {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
            </Form.Group>
        )
    }
    renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
        const { formatMessage } = this.props.intl
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
    render() {
        const { handleSubmit, signupGridImage1, signupGridImage2, signupGridImage3, loading, submitting } = this.props;
        const { formatMessage } = this.props.intl;
        return (
            <div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
                <Row>
                    <Col md={12} lg={12} sm={12} xs={12} className={s.responsiveNoPadding}>
                        <Card className={s.card}>
                            <Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <h1>{formatMessage(messages.signupSectionSettings)}</h1>
                                </Col>
                                <Row>
                                <Col lg={4} md={12} sm={12} xs={12} className={bt.space2}>
                                        <Form.Group className={s.formGroup}>
                                            <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                                <label className={bt.labelText} >{formatMessage(messages.signupImage3)}</label><br />
                                                {
                                                    signupGridImage3 && 
                                                    <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir + 'medium_' + signupGridImage3})` }} />
                                                }
                                                <div className={'commonFilepicker'}>
                                                    <Dropzone
                                                        className={cx(bt.btnSecondary, 'fileNoPadding')}
                                                        subTextClass={s.subText}
                                                        fieldName={'signupGridImage3'}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                        inputContainer={'.dzInputContainerSignupImage3'}
                                                        inputContainerClass={'dzInputContainerSignupImage3'}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} md={12} sm={12} xs={12} className={bt.space2}>
                                        <Form.Group className={s.formGroup}>
                                            <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                                <label className={bt.labelText} >{formatMessage(messages.signupImage1)}</label><br />
                                                {
                                                    signupGridImage1 && 
                                                    <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir + 'medium_' + signupGridImage1})` }} />
                                                }
                                                <div className={'commonFilepicker'}>
                                                    <Dropzone
                                                        className={cx(bt.btnSecondary, 'fileNoPadding')}
                                                        subTextClass={s.subText}
                                                        fieldName={'signupGridImage1'}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                        inputContainer={'.dzInputContainerSignupImage1'}
                                                        inputContainerClass={'dzInputContainerSignupImage1'}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} md={12} sm={12} xs={12} className={bt.space2}>
                                        <Form.Group className={s.formGroup}>
                                            <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                                <label className={bt.labelText} >{formatMessage(messages.signupImage2)}</label><br />
                                                {
                                                    signupGridImage2 && 
                                                    <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir + signupGridImage2})` }} />
                                                }
                                                <div className={'commonFilepicker'}>
                                                    <Dropzone
                                                        className={cx(bt.btnSecondary, 'fileNoPadding')}
                                                        subTextClass={s.subText}
                                                        fieldName={'signupGridImage2'}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                        inputContainer={'.dzInputContainerSignupImage2'}
                                                        inputContainerClass={'dzInputContainerSignupImage2'}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="signupGridTitle1" type="text" component={this.renderField} label={formatMessage(messages.driverapptitle)} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="signupGridContent1" type="text" component={this.renderFormControlTextArea} label={formatMessage(messages.driverappcntn)} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="signupGridLink1" type="text" component={this.renderField} label={formatMessage(messages.playstorelink)} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="signupGridLink2" type="text" component={this.renderField} label={formatMessage(messages.appstorelink)} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
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
                                    </Form.Group>
                                </Col>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
SignupSettingsForm = reduxForm({
    form: 'SignupSettingsForm',
    onSubmit: submit,
    validate
})(SignupSettingsForm);
const selector = formValueSelector('SignupSettingsForm')
const mapState = (state) => ({
    signupGridImage1: selector(state, 'signupGridImage1'),
    signupGridImage2: selector(state, 'signupGridImage2'),
    signupGridImage3: selector(state, 'signupGridImage3'),
    loading: state.loader.SignupSettingsForm
})
const mapDispatch = {
    
}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(SignupSettingsForm)));
