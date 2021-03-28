import React, { Component } from 'react';
import s from './AboutSettingsForm.css';
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
import { api, homepageUploadDir } from '../../../config';
import Dropzone from './Dropzone.js'
import Loader from '../../Common/Loader';

export class AboutSettingsForm extends Component {
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
        const { handleSubmit, aboutGridImage1, aboutGridImage2, loading, submitting } = this.props;
        const { formatMessage } = this.props.intl;
        return (
            <div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
                <Row>
                    <Col md={12} lg={12} sm={12} xs={12} className={s.responsiveNoPadding}>
                        <Card className={s.card}>
                            <Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <h1>{formatMessage(messages.aboutSectionSettings)}</h1>
                                </Col>
                                <Row>
                                    <Col lg={6} md={12} sm={12} xs={12} className={bt.space2}>
                                        <Form.Group className={s.formGroup}>
                                            <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                            <label className={bt.labelText} >{formatMessage(messages.aboutImage1)}</label><br />
                                                {
                                                    aboutGridImage1 &&
                                                    <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir + 'medium_' + aboutGridImage1})` }} />
                                                }
                                                <div className={'commonFilepicker'}>
                                                    <Dropzone
                                                        className={cx(bt.btnSecondary, 'fileNoPadding')}
                                                        subTextClass={s.subText}
                                                        fieldName={'aboutGridImage1'}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                        inputContainer={'.dzInputContainerAboutImage1'}
                                                        inputContainerClass={'dzInputContainerAboutImage1'}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={12} sm={12} xs={12} className={bt.space2}>
                                        <Form.Group className={s.formGroup}>
                                            <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                            <label className={bt.labelText} >{formatMessage(messages.aboutImage2)}</label><br />
                                                {
                                                    aboutGridImage2 &&
                                                    <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir + 'medium_' + aboutGridImage2})` }} />
                                                }
                                                <div className={'commonFilepicker'}>
                                                    <Dropzone
                                                        className={cx(bt.btnSecondary, 'fileNoPadding')}
                                                        subTextClass={s.subText}
                                                        fieldName={'aboutGridImage2'}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                        inputContainer={'.dzInputContainerAboutImage2'}
                                                        inputContainerClass={'dzInputContainerAboutImage2'}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="aboutGridTitle1" type="text" component={this.renderField} label={formatMessage(messages.featureTitle1)} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="aboutGridContent1" type="text" component={this.renderFormControlTextArea} label={formatMessage(messages.featureDesc1)} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="aboutGridTitle2" type="text" component={this.renderField} label={formatMessage(messages.featureTitle2)} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="aboutGridContent2" type="text" component={this.renderFormControlTextArea} label={formatMessage(messages.featureDesc2)} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="aboutGridTitle3" type="text" component={this.renderField} label={formatMessage(messages.featureTitle3)} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="aboutGridContent3" type="text" component={this.renderFormControlTextArea} label={formatMessage(messages.featureDesc3)} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="aboutGridTitle4" type="text" component={this.renderField} label={formatMessage(messages.featureTitle4)} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="aboutGridContent4" type="text" component={this.renderFormControlTextArea} label={formatMessage(messages.featureDesc4)} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="aboutGridTitle5" type="text" component={this.renderField} label={formatMessage(messages.featureTitle5)} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="aboutGridContent5" type="text" component={this.renderFormControlTextArea} label={formatMessage(messages.featureDesc5)} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="aboutGridTitle6" type="text" component={this.renderField} label={formatMessage(messages.featureTitle6)}/>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="aboutGridContent6" type="text" component={this.renderFormControlTextArea} label={formatMessage(messages.featureDesc6)} />
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
AboutSettingsForm = reduxForm({
    form: 'AboutSettingsForm',
    onSubmit: submit,
    validate
})(AboutSettingsForm);
const selector = formValueSelector('AboutSettingsForm')
const mapState = (state) => ({
    aboutGridImage1: selector(state, 'aboutGridImage1'),
    aboutGridImage2: selector(state, 'aboutGridImage2'),
    loading: state.loader.AboutSettingsForm
})
const mapDispatch = {
}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(AboutSettingsForm)));
