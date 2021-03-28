import React, { Component } from 'react';
import s from './HomeSettingsForm.css';
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
    FormGroup,
    FormControl
} from 'react-bootstrap';
import messages from '../../../locale/messages';
import validate from './validate';
import Dropzone from './Dropzone.js'
import Loader from '../../Common/Loader';
import { api, homepageUploadDir } from '../../../config';

export class HomeSettingsForm extends Component {
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
        const { handleSubmit, loading, submitting, homeSectionImage1, homeSectionImage2, homeSectionImage3,
            homeSectionImage4, homeSectionImage5, homeSectionImage6, homeSectionImage7, homeSectionImage8 } = this.props;
        const { formatMessage } = this.props.intl;
        return (
            <div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
                <Row>
                    <Col md={12} lg={12} sm={12} xs={12} className={s.responsiveNoPadding}>
                        <Card className={s.card}>
                            <Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <h1>{formatMessage(messages.homepageBanner)}</h1>
                                </Col>
                                <Row>
                                    <Col lg={4} md={12} sm={12} xs={12} className={bt.space2}>
                                        <Form.Group className={s.formGroup}>
                                            <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                                <label className={bt.labelText} >{formatMessage(messages.homeImage1)}</label><br />
                                                {
                                                    homeSectionImage1 &&
                                                    <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir}medium_${homeSectionImage1})` }} />
                                                }
                                                <div className={'commonFilepicker'}>
                                                    <Dropzone
                                                        className={cx(bt.btnSecondary, 'fileNoPadding')}
                                                        subTextClass={s.subText}
                                                        fieldName={'homeSectionImage1'}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                        inputContainer={'.dzInputContainerHomeImage1'}
                                                        inputContainerClass={'dzInputContainerHomeImage1'}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} md={12} sm={12} xs={12} className={bt.space2}>
                                        <Form.Group className={s.formGroup}>
                                            <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                                <label className={bt.labelText} >{formatMessage(messages.homeImage2)}</label><br />
                                                {
                                                    homeSectionImage2 &&
                                                    <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir}medium_${homeSectionImage2})` }} />
                                                }
                                                <div className={'commonFilepicker'}>
                                                    <Dropzone
                                                        className={cx(bt.btnSecondary, 'fileNoPadding')}
                                                        subTextClass={s.subText}
                                                        fieldName={'homeSectionImage2'}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                        inputContainer={'.dzInputContainerHomeImage2'}
                                                        inputContainerClass={'dzInputContainerHomeImage2'}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} md={12} sm={12} xs={12} className={bt.space2}>
                                        <Form.Group className={s.formGroup}>
                                            <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                                <label className={bt.labelText} >{formatMessage(messages.homeImage3)}</label><br />
                                                {
                                                    homeSectionImage3 &&
                                                    <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir}medium_${homeSectionImage3})` }} />
                                                }
                                                <div className={'commonFilepicker'}>
                                                    <Dropzone
                                                        className={cx(bt.btnSecondary, 'fileNoPadding')}
                                                        subTextClass={s.subText}
                                                        fieldName={'homeSectionImage3'}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                        inputContainer={'.dzInputContainerHomeImage3'}
                                                        inputContainerClass={'dzInputContainerHomeImage3'}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} md={12} sm={12} xs={12} className={bt.space2}>
                                        <Form.Group className={s.formGroup}>
                                            <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                                <label className={bt.labelText} >{formatMessage(messages.homeImage4)}</label><br />
                                                {
                                                    homeSectionImage4 &&
                                                    <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir}medium_${homeSectionImage4})` }} />
                                                }
                                                <div className={'commonFilepicker'}>
                                                    <Dropzone
                                                        className={cx(bt.btnSecondary, 'fileNoPadding')}
                                                        subTextClass={s.subText}
                                                        fieldName={'homeSectionImage4'}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                        inputContainer={'.dzInputContainerHomeImage4'}
                                                        inputContainerClass={'dzInputContainerHomeImage4'}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} md={12} sm={12} xs={12} className={bt.space2}>
                                        <Form.Group className={s.formGroup}>
                                            <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                                <label className={bt.labelText} >{formatMessage(messages.homeImage5)}</label><br />
                                                {
                                                    homeSectionImage5 &&
                                                    <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir}medium_${homeSectionImage5})` }} />
                                                }
                                                <div className={'commonFilepicker'}>
                                                    <Dropzone
                                                        className={cx(bt.btnSecondary, 'fileNoPadding')}
                                                        subTextClass={s.subText}
                                                        fieldName={'homeSectionImage5'}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                        inputContainer={'.dzInputContainerHomeImage5'}
                                                        inputContainerClass={'dzInputContainerHomeImage5'}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} md={12} sm={12} xs={12} className={bt.space2}>
                                        <Form.Group className={s.formGroup}>
                                            <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                                <label className={bt.labelText} >{formatMessage(messages.homeImage6)}</label><br />
                                                {
                                                    homeSectionImage6 &&
                                                    <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir}medium_${homeSectionImage6})` }} />
                                                }
                                                <div className={'commonFilepicker'}>
                                                    <Dropzone
                                                        className={cx(bt.btnSecondary, 'fileNoPadding')}
                                                        subTextClass={s.subText}
                                                        fieldName={'homeSectionImage6'}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                        inputContainer={'.dzInputContainerHomeImage6'}
                                                        inputContainerClass={'dzInputContainerHomeImage6'}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={12} sm={12} xs={12} className={bt.space2}>
                                        <Form.Group className={s.formGroup}>
                                            <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                                <label className={bt.labelText} >{formatMessage(messages.homeImage7)}</label><br />
                                                {
                                                    homeSectionImage7 &&
                                                    <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir}medium_${homeSectionImage7})` }} />
                                                }
                                                <div className={'commonFilepicker'}>
                                                    <Dropzone
                                                        className={cx(bt.btnSecondary, 'fileNoPadding')}
                                                        subTextClass={s.subText}
                                                        fieldName={'homeSectionImage7'}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                        inputContainer={'.dzInputContainerHomeImage7'}
                                                        inputContainerClass={'dzInputContainerHomeImage7'}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={12} sm={12} xs={12} className={bt.space2}>
                                        <Form.Group className={s.formGroup}>
                                            <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                                <label className={bt.labelText} >{formatMessage(messages.homeImage8)}</label><br />
                                                {
                                                    homeSectionImage8 &&
                                                    <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + homepageUploadDir}medium_${homeSectionImage8})` }} />
                                                }
                                                <div className={'commonFilepicker'}>
                                                    <Dropzone
                                                        className={cx(bt.btnSecondary, 'fileNoPadding')}
                                                        subTextClass={s.subText}
                                                        fieldName={'homeSectionImage8'}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                        inputContainer={'.dzInputContainerHomeImage8'}
                                                        inputContainerClass={'dzInputContainerHomeImage8'}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={8} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="homeSectionTitle1" type="text" component={this.renderField} label={formatMessage(messages.homeTitle)} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="homeSectionButton1" type="text" component={this.renderField} label={formatMessage(messages.buttonLabel)} />
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
HomeSettingsForm = reduxForm({
    form: 'HomeSettingsForm',
    onSubmit: submit,
    validate
})(HomeSettingsForm);
const selector = formValueSelector('HomeSettingsForm')
const mapState = (state) => ({
    homeSectionImage1: selector(state, 'homeSectionImage1'),
    homeSectionImage2: selector(state, 'homeSectionImage2'),
    homeSectionImage3: selector(state, 'homeSectionImage3'),
    homeSectionImage4: selector(state, 'homeSectionImage4'),
    homeSectionImage5: selector(state, 'homeSectionImage5'),
    homeSectionImage6: selector(state, 'homeSectionImage6'),
    homeSectionImage7: selector(state, 'homeSectionImage7'),
    homeSectionImage8: selector(state, 'homeSectionImage8'),
    loading: state.loader.HomeSettingsForm
})
const mapDispatch = {

}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(HomeSettingsForm)));
