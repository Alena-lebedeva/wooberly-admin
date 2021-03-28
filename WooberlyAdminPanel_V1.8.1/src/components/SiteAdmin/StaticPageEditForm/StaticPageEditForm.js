import React, { Component } from 'react';
import s from './StaticPageEditForm.css';
import bt from '../../../components/commonStyle.css';
import { Field, reduxForm, getFormValues, change, formValueSelector } from 'redux-form';
import submit from './submit';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import { FormattedMessage, injectIntl } from 'react-intl';
//Style
import cx from 'classnames';
import {
    Button,
    Form,
    Col,
    Row,
    FormGroup,
    FormControl
} from 'react-bootstrap';
import Link from '../../Link';
import messages from '../../../locale/messages';
import validate from './validate';
import Dropzone from './Dropzone';
import { api, staticpageUploadDir } from '../../../config';

export class StaticPageEditForm extends Component {
    constructor(props) {
        super(props)
        if (typeof window !== 'undefined') {
            this.ReactQuill = require('react-quill')
        }
        this.state = { editorHtml: '' } // You can also pass a Quill Delta here
    }
    renderField = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder }) => {
        return (
            <Form.Group>
                <label className={bt.labelText} >{label}</label>
                <Form.Control {...input} placeholder={placeholder} type={type} className={bt.formControlInput} />
                {touched && error && <span className={bt.errorMessage}>{error.defaultMessage}</span>}
            </Form.Group>
        )
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
    renderQuill = ({ input, label, type, meta: { touched, error }, className }) => {
        const ReactQuill = this.ReactQuill;
        const { formatMessage } = this.props.intl;
        let modules = {
            toolbar: [
                [{ 'header': '1' }, { 'header': '2' }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                { 'indent': '-1' }, { 'indent': '+1' }],
                ['link'],
                // ['link', 'image'],
            ],
            clipboard: {
                matchVisual: false,
            }
        };
        let formats = [
            'header', 'size',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link'
            // 'link', 'image'
        ];
        return (
            <div>
                <ReactQuill
                    {...input}
                    onChange={(newValue, delta, source) => {
                        if (source === 'user') {
                            input.onChange(newValue);
                        }
                    }}
                    onBlur={(range, source, quill) => {
                        if (quill.getHTML() == '<p><br></p>') {
                            input.onBlur('');
                        }
                        else {
                            input.onBlur(quill.getHTML());
                        }
                    }}
                    modules={modules}
                    formats={formats}
                    theme="snow"
                />

                {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
            </div>
        );
    }
    render() {
        const { error, handleSubmit, submitting, pageBanner } = this.props;
        const { formatMessage } = this.props.intl;
        const ReactQuill = this.ReactQuill;
        if (typeof window !== 'undefined' && ReactQuill) {
            return (
                <div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
                    <Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
                        <div className={s.headingPadding}> <h1>{formatMessage(messages.editPageDetails)}</h1></div>
                        <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                                <div>
                                    <Form.Group className={s.formGroup}>
                                        <Field
                                            name="metaTitle"
                                            type="text"
                                            placeholder={formatMessage(messages.metaTitle)}
                                            component={this.renderFormControl}
                                            label={formatMessage(messages.metaTitle)}
                                            labelClass={bt.labelText}
                                            fieldClass={bt.formControlInput}
                                        />
                                    </Form.Group>
                                </div>
                            </Col>
                            <Col lg={12} md={12} sm={12} xs={12}>
                                <div>
                                    <Form.Group className={s.formGroup}>
                                        <Field
                                            name="metaDescription"
                                            type="text"
                                            placeholder={formatMessage(messages.metaDescriptionText)}
                                            component={this.renderFormControlTextArea}
                                            label={formatMessage(messages.metaDescriptionText)}
                                            labelClass={bt.labelText}
                                            fieldClass={bt.formControlInput}
                                            onChange={(event) => {}}
                                        />
                                    </Form.Group>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={4} md={12} sm={12} xs={12} className={bt.space2}>
                                <Form.Group className={s.formGroup}>
                                    <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                        <label className={bt.labelText} >{formatMessage(messages.pageBanner)}</label><br />
                                        {
                                            pageBanner &&
                                            <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + staticpageUploadDir}large_${pageBanner})` }} />
                                        }
                                        <div className={'commonFilepicker'}>
                                            <Dropzone
                                                className={cx(bt.btnSecondary, 'fileNoPadding')}
                                                subTextClass={s.subText}
                                                fieldName={'pageBanner'}
                                                subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                defaultMessage={formatMessage(messages.chooseFile)}
                                            />
                                        </div>
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                                <FormGroup className={s.formGroup}>
                                    <div>
                                        <label className={bt.labelText} ><FormattedMessage {...messages.content} /></label>
                                    </div>
                                    <div xs={12} sm={9} md={9} lg={9}>
                                        <Field name="content" component={this.renderQuill} onChange={(event) => {}} />
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Col lg={12} md={12} sm={12} xs={12} className={cx(bt.textAlignRight, bt.spaceTop3)}>
                            <Form.Group className={s.formGroup}>
                                <Button
                                    type="submit"
                                    className={cx(bt.btnPrimary)}
                                >
                                    {formatMessage(messages.submitButton)}
                                </Button>
                                <Link to={'/siteadmin/staticpage/manage'} className={cx(s.backBtn, bt.btnSecondary)} >{formatMessage(messages.goBack)}</Link>
                            </Form.Group>
                        </Col>
                    </Form>
                </div>
            )
        } else {
            return <textarea />
        }
    }
}
StaticPageEditForm = reduxForm({
    form: 'StaticPageEditForm',
    onSubmit: submit,
    validate
})(StaticPageEditForm);
const selector = formValueSelector('StaticPageEditForm')
const mapState = (state) => ({
    pageBanner: selector(state, 'pageBanner')
})
const mapDispatch = {

}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(StaticPageEditForm)));
