import React from 'react';
import PropTypes from 'prop-types';
import s from './AddContentPageForm.css';
import bt from '../../../../components/commonStyle.css';
import { Field, reduxForm, getFormValues, change, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import { injectIntl, FormattedMessage } from 'react-intl';
//Style
import cx from 'classnames';
import {
    Button,
    Form,
    Col,
    Row,
    FormGroup,
    FormControl,
    InputGroup,
} from 'react-bootstrap';
import Link from '../../../Link';
import messages from '../../../../locale/messages';
import { siteUrl } from '../../../../config';
import submit from './submit';
import { formatURL } from '../../../../helpers/formatUrl';
import validate from './validate';
import Dropzone from './Dropzone';
import { api, contentPageUploadDir } from '../../../../config';

class AddContentPageForm extends React.Component {
    constructor(props) {
        super(props)
        if (typeof window !== 'undefined') {
            this.ReactQuill = require('react-quill');
        }
        this.state = { editorHtml: '' };
        this.handlePageTitle = this.handlePageTitle.bind(this);
    }
    static propTypes = {
        title: PropTypes.string.isRequired,
        initialValues: PropTypes.object,
    };
    async handlePageTitle(e) {
        const { change } = this.props;
        if (e.target.value) {
            await change('pageUrl', formatURL(e.target.value));
        } else {
            await change('pageUrl', '');
        }
    }
    renderField = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder }) => {
        const { formatMessage } = this.props.intl;
        return (
            <FormGroup>
                <label className={bt.labelText} >{label}</label>
                <Form.Control {...input} placeholder={placeholder} type={type} className={bt.formControlInput} />
                {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
            </FormGroup>
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
    renderFormControlPageUrl = ({ input, label, placeholder, type, meta: { touched, error }, className }) => {
        const { formatMessage } = this.props.intl;
        return (
            <FormGroup className={s.formGroup}>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <label className={bt.labelText} >{label}</label>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <div className={'pageUrlInput'}>
                        <InputGroup>
                            <InputGroup.Text>
                                <InputGroup.Append>
                                    <span>{siteUrl}/page/</span>
                                </InputGroup.Append>
                            </InputGroup.Text>
                            <FormControl {...input} placeholder={placeholder} type={type} className={cx(className, 'pageUrlFormInput')} />
                        </InputGroup>
                        {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
                    </div>
                </Col>
            </FormGroup>
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
    renderQuill = ({ input, meta: { touched, error }, className }) => {
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
        const { handleSubmit } = this.props;
        const { pageBanner } = this.props;
        const ReactQuill = this.ReactQuill;
        const { formatMessage } = this.props.intl;
        if (typeof window !== 'undefined' && ReactQuill) {
            return (
                <div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
                    <Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
                        <Row>
                            <Col lg={12} md={12} sm={12} xs={12} className={s.paddingTop}>
                                <FormGroup className={s.formGroup}>
                                    <div className={cx(s.profileImgSection)}>
                                        <label className={bt.labelText} ><FormattedMessage {...messages.pageImageBanner} /></label><br />
                                        {
                                            pageBanner &&
                                            <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + contentPageUploadDir}large_${pageBanner})` }} />
                                        }
                                        <div className={'commonFilepicker'}>
                                            <Dropzone
                                                className={cx(bt.btnSecondary, 'fileNoPadding')}
                                                subTextClass={s.subText}
                                                fieldName={'pageBanner'}
                                                subText="Maximum upload size"
                                                defaultMessage={formatMessage(messages.chooseFile)}
                                            />
                                        </div>
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} md={12} sm={12} xs={12}>
                                <FormGroup className={s.formGroup}>
                                    <Field
                                        name="metaTitle"
                                        type="text"
                                        placeholder={formatMessage(messages.metaTitle)}
                                        component={this.renderFormControl}
                                        label={formatMessage(messages.metaTitle)}
                                        labelClass={bt.labelText}
                                        fieldClass={bt.formControlInput}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={6} md={12} sm={12} xs={12}>
                                <FormGroup className={s.formGroup}>
                                    <Field
                                        name="metaDescription"
                                        type="text"
                                        placeholder={formatMessage(messages.metaDescriptionText)}
                                        component={this.renderFormControlTextArea}
                                        label={formatMessage(messages.metaDescriptionText)}
                                        labelClass={bt.labelText}
                                        fieldClass={bt.formControlInput}
                                        onChange={(event) => { }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} md={12} sm={12} xs={12}>
                                <FormGroup className={s.formGroup}>
                                    <Field
                                        name="pageTitle"
                                        type="text"
                                        component={this.renderFormControl}
                                        label={formatMessage(messages.pageTitle)}
                                        placeholder={formatMessage(messages.pageTitle)}
                                        onChange={(event) => this.handlePageTitle(event)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={6} md={12} sm={12} xs={12} className={bt.noPadding}>
                                <FormGroup className={s.formGroup}>
                                    <Field
                                        name="pageUrl"
                                        type="text"
                                        component={this.renderFormControlPageUrl}
                                        label={formatMessage(messages.pageUrl)}
                                        placeholder={formatMessage(messages.pageUrl)}
                                        onChange={(event) => { }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                                <FormGroup className={s.formGroup}>
                                    <div>
                                        <label className={bt.labelText} ><FormattedMessage {...messages.content} /></label>
                                    </div>
                                    <div xs={12} sm={9} md={9} lg={9}>
                                        <Field name="content" component={this.renderQuill} onChange={(event) => { }} />
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Col lg={12} md={12} sm={12} xs={12} className={cx(bt.textAlignRight, bt.spaceTop3, s.paddingBottom)}>
                            <Form.Group className={s.formGroup}>
                                <Button
                                    type="submit"
                                    className={cx(bt.btnPrimary)}
                                >
                                    <FormattedMessage {...messages.submitButton} />
                                </Button>
                                <Link to={'/siteadmin/contentpage/manage'} className={cx(s.backBtn, bt.btnSecondary)} ><FormattedMessage {...messages.goBack} /></Link>
                            </Form.Group>
                        </Col>
                    </Form>
                </div>
            )
        } else {
            return <textarea />;
        }
    }
}
AddContentPageForm = reduxForm({
    form: 'ContentPageForm',
    validate,
    onSubmit: submit,
})(AddContentPageForm);
const contentPageFormSelector = formValueSelector('ContentPageForm');
const mapState = (state) => ({
    pageTitle: contentPageFormSelector(state, 'pageTitle'),
    pageBanner: contentPageFormSelector(state, 'pageBanner')
});
const mapDispatch = {
    change
};
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(AddContentPageForm)));



