import React, { Component } from 'react';
import s from './FooterSettingsForm.css';
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

export class FooterSettingsForm extends Component {
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
        const { handleSubmit, footerLogo1, footerLogo2, footerLogo3, footerLogo4, loading, submitting } = this.props;
        const { formatMessage } = this.props.intl;
        return (
            <div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
                <Row>
                    <Col md={12} lg={12} sm={12} xs={12} className={s.responsiveNoPadding}>
                        <Card className={s.card}>
                            <Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <h1>{formatMessage(messages.footerSectionSettings)}</h1>
                                </Col>
                                {/* <Row>
                                    <Col lg={6} md={12} sm={12} xs={12} className={bt.space2}>
                                        <Form.Group className={s.formGroup}>
                                            <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                                <label className={bt.labelText} >{formatMessage(messages.footerLogo1)}</label><br />
                                                {
                                                    footerLogo1 &&
                                                    <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir + footerLogo1})` }} />
                                                }
                                                <div>
                                                    <Dropzone
                                                        className={bt.btnSecondary}
                                                        subTextClass={s.subText}
                                                        fieldName={'footerLogo1'}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                        inputContainer={'.dzInputContainerFooterImage1'}
                                                        inputContainerClass={'dzInputContainerFooterImage1'}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={12} sm={12} xs={12} className={bt.space2}>
                                        <Form.Group className={s.formGroup}>
                                            <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                                <label className={bt.labelText} >{formatMessage(messages.footerLogo2)}</label><br />
                                                {
                                                    footerLogo2 &&
                                                    <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir + footerLogo2})` }} />
                                                }
                                                <div>
                                                    <Dropzone
                                                        className={bt.btnSecondary}
                                                        subTextClass={s.subText}
                                                        fieldName={'footerLogo2'}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                        inputContainer={'.dzInputContainerFooterImage2'}
                                                        inputContainerClass={'dzInputContainerFooterImage2'}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={12} sm={12} xs={12} className={bt.space2}>
                                        <Form.Group className={s.formGroup}>
                                            <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                                <label className={bt.labelText} >{formatMessage(messages.footerLogo3)}</label><br />
                                                {
                                                    footerLogo3 &&
                                                    <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir + footerLogo3})` }} />
                                                }
                                                <div>
                                                    <Dropzone
                                                        className={bt.btnSecondary}
                                                        subTextClass={s.subText}
                                                        fieldName={'footerLogo3'}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                        inputContainer={'.dzInputContainerFooterImage3'}
                                                        inputContainerClass={'dzInputContainerFooterImage3'}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={12} sm={12} xs={12} className={bt.space2}>
                                        <Form.Group className={s.formGroup}>
                                            <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                                <label className={bt.labelText} >{formatMessage(messages.footerLogo4)}</label><br />
                                                {
                                                    footerLogo4 &&
                                                    <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir + footerLogo4})` }} />
                                                }
                                                <div>
                                                    <Dropzone
                                                        className={bt.btnSecondary}
                                                        subTextClass={s.subText}
                                                        fieldName={'footerLogo4'}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                        inputContainer={'.dzInputContainerFooterImage3'}
                                                        inputContainerClass={'dzInputContainerFooterImage3'}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row> */}

                                <Row>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="footerTitle1" type="text" component={this.renderField} label={formatMessage(messages.footerTitle1)} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="footerContent1" type="text" component={this.renderFormControlTextArea} label={formatMessage(messages.footerContent1)} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="footerLinkTitle" type="text" component={this.renderField} label={formatMessage(messages.footerUrltitle)} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="footerBottom" type="text" component={this.renderField} label={formatMessage(messages.copyRightcontent)} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {/*                   
                                <Row>
                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="footerLinkName1" type="text" component={this.renderField} label={'Footer URL Name #1'} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="footerLink1" type="text" component={this.renderField} label={'Footer URL #1'} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="footerLinkName2" type="text" component={this.renderField} label={'Footer URL Name #2'} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="footerLink2" type="text" component={this.renderField} label={'Footer URL #2'} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="footerLinkName3" type="text" component={this.renderField} label={'Footer URL Name #3'} />
                                            </div>
                                        </Form.Group>
                                    </Col>

                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="footerLink3" type="text" component={this.renderField} label={'Footer URL #3'} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="footerLinkName4" type="text" component={this.renderField} label={'Footer URL Name #4'} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="footerLink4" type="text" component={this.renderField} label={'Footer URL #4'} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row> */}
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
FooterSettingsForm = reduxForm({
    form: 'FooterSettingsForm',
    onSubmit: submit,
    validate
})(FooterSettingsForm);
const selector = formValueSelector('FooterSettingsForm')
const mapState = (state) => ({
    footerLogo1: selector(state, 'footerLogo1'),
    footerLogo2: selector(state, 'footerLogo2'),
    footerLogo3: selector(state, 'footerLogo3'),
    footerLogo4: selector(state, 'footerLogo4'),
    loading: state.loader.SignupSettingsForm
})
const mapDispatch = {

}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(FooterSettingsForm)));
