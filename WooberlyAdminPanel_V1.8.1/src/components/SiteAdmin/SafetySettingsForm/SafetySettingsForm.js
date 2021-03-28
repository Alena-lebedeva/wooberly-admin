import React, { Component } from 'react';
import s from './SafetySettingsForm.css';
import bt from '../../../components/commonStyle.css';
import { Field, reduxForm, getFormValues, change, formValueSelector } from 'redux-form';
import submit from './submit';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import { injectIntl, formatMessage } from 'react-intl';
//Style
import cx from 'classnames';
import {
    Form,
    Col,
    Card,
    Row,
    FormGroup,
    FormControl
} from 'react-bootstrap';
import messages from '../../../locale/messages';
import validate from './validate';
import Dropzone from './Dropzone.js'
import Loader from '../../Common/Loader';
import { api, homepageUploadDir } from '../../../config';

export class SafetySettingsForm extends Component {
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
        const { handleSubmit, safetyGridImage1, safetyGridImage2, safetyGridImage3, loading, submitting } = this.props;
        const { formatMessage } = this.props.intl;
        return (
            <div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
                <Row>
                    <Col md={12} lg={12} sm={12} xs={12} className={s.responsiveNoPadding}>
                        <Card className={s.card}>
                            <Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <h1>{formatMessage(messages.safetySectionSettings)}</h1>
                                </Col>
                                <Row>
                                <Col lg={4} md={12} sm={12} xs={12} className={bt.space2}>
                                        <Form.Group className={s.formGroup}>
                                            <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                                <label className={bt.labelText} >{formatMessage(messages.safetyImage3)}</label><br />
                                                {
                                                    safetyGridImage3 && 
                                                    <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir}medium_${safetyGridImage3})` }} />
                                                }
                                                <div className={'commonFilepicker'}>
                                                    <Dropzone
                                                        className={cx(bt.btnSecondary, 'fileNoPadding')}
                                                        subTextClass={s.subText}
                                                        fieldName={'safetyGridImage3'}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                        inputContainer={'.dzInputContainerSafetyImage3'}
                                                        inputContainerClass={'dzInputContainerSafetyImage3'}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} md={12} sm={12} xs={12} className={bt.space2}>
                                        <Form.Group className={s.formGroup}>
                                            <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                                <label className={bt.labelText} >{formatMessage(messages.safetyImage1)}</label><br />
                                                {
                                                    safetyGridImage1 && 
                                                    <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir}medium_${safetyGridImage1})` }} />
                                                }
                                                <div className={'commonFilepicker'}>
                                                    <Dropzone
                                                        className={cx(bt.btnSecondary, 'fileNoPadding')}
                                                        subTextClass={s.subText}
                                                        fieldName={'safetyGridImage1'}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                        inputContainer={'.dzInputContainerSafetyImage1'}
                                                        inputContainerClass={'dzInputContainerSafetyImage1'}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} md={12} sm={12} xs={12} className={bt.space2}>
                                        <Form.Group className={s.formGroup}>
                                            <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                                <label className={bt.labelText} >{formatMessage(messages.safetyImage2)}</label><br />
                                                {
                                                    safetyGridImage2 && 
                                                    <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir}medium_${safetyGridImage2})` }} />
                                                }
                                                <div className={'commonFilepicker'}>
                                                    <Dropzone
                                                        className={cx(bt.btnSecondary, 'fileNoPadding')}
                                                        subTextClass={s.subText}
                                                        fieldName={'safetyGridImage2'}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                        inputContainer={'.dzInputContainerSafetyImage2'}
                                                        inputContainerClass={'dzInputContainerSafetyImage2'}
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
                                                <Field name="safetyGridTitle1" type="text" component={this.renderField} label={formatMessage(messages.riderApptitle)} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="safetyGridContent1" type="text" component={this.renderFormControlTextArea} label={formatMessage(messages.riderAppContent)} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="safetyGridLink1" type="text" component={this.renderField} label={formatMessage(messages.playstorelink)} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="safetyGridLink2" type="text" component={this.renderField} label={formatMessage(messages.appstorelink)} />
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
SafetySettingsForm = reduxForm({
    form: 'SafetySettingsForm',
    onSubmit: submit,
    validate
})(SafetySettingsForm);
const selector = formValueSelector('SafetySettingsForm')
const mapState = (state) => ({
    safetyGridImage1: selector(state, 'safetyGridImage1'),
    safetyGridImage2: selector(state, 'safetyGridImage2'),
    safetyGridImage3: selector(state, 'safetyGridImage3'),
    loading: state.loader.SafetySettingsForm
})
const mapDispatch = {
}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(SafetySettingsForm)));
