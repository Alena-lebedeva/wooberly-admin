import React, { Component } from 'react';
import { api, staticpageUploadDir } from '../../../config';
import Dropzone from './Dropzone';

//Redux
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import submit from './submit';
import validate from './validate';

//Intl
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

//Style
import s from './PrecautionNotificationForm.css';
import bt from '../../../components/commonStyle.css';
import withStyles from 'isomorphic-style-loader/withStyles';
import cx from 'classnames';
import {
    Button,
    Form,
    Col,
    Row,
    FormGroup,
    FormControl
} from 'react-bootstrap';


import { removeStaticBannerImage } from '../../../actions/siteadmin/PrecautionNotification/updatePrecautionNotification';
import { updatePrecautionNotificationImage } from '../../../actions/siteadmin/PrecautionNotification/updatePrecautionNotificationImage';
import { updateTempImages } from '../../../actions/siteadmin/TempImages/updateTempImages';

import deleteIcon from '../../../../public/Icons/delete.svg'
export class PrecautionNotificationForm extends Component {

    constructor(props) {
        super(props)
        if (typeof window !== 'undefined') {
            this.ReactQuill = require('react-quill')
        }
        this.removefile = this.removefile.bind(this);
    }

    async removefile(event) {
        const { change, dispatch, id, title, description, imageName, isEnabled } = this.props;
        let oldImage = imageName;
        await change('imageName', null);
        if (id) dispatch(updatePrecautionNotificationImage({ id, imageName: null }, oldImage))
        else {
            await dispatch(updateTempImages('PrecautionNotification', 'imageName', null));
            await removeStaticBannerImage(oldImage);
        }
    }

    renderFormControl = ({ input, label, type, meta: { touched, error } }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                <FormGroup className={s.formGroup}>
                    <div>
                        <label className={bt.labelText} >{label}</label>
                    </div>
                    <div>
                        <FormControl {...input} placeholder={label} type={type} className={bt.formControlInput} />
                        {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
                    </div>
                </FormGroup>
            </div>
        );
    }

    renderQuill = ({ input, label, type, meta: { touched, error } }) => {
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
        const { handleSubmit, imageName } = this.props;
        const { formatMessage } = this.props.intl;
        const ReactQuill = this.ReactQuill;
        if (typeof window !== 'undefined' && ReactQuill) {
            return (
                <div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
                    <Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
                        <Row>
                            <Col lg={12} md={12} sm={12} xs={12} className={cx(bt.space2, s.paddingTop)}>
                                <FormGroup className={s.formGroup}>
                                    <div className={cx(s.profileImgSection)}>
                                        <label className={bt.labelText} >{formatMessage(messages.image)}</label><br />
                                        {
                                            imageName && <div><div className={cx(s.backgroundImg, s.profileImgSection)} style={{ backgroundImage: `url(${api.apiEndpoint + staticpageUploadDir}large_${imageName})` }}>
                                                <div className={s.rightAlignmentAndPointer} onClick={this.removefile}><img src={deleteIcon} /></div>
                                            </div>

                                            </div>
                                        }
                                        <div className={'commonFilepicker'}>
                                            <Dropzone
                                                className={cx(bt.btnSecondary, 'fileNoPadding')}
                                                subTextClass={s.subText}
                                                fieldName={'imageName'}
                                                subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                defaultMessage={formatMessage(messages.chooseFile)}
                                            />
                                        </div>
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} md={6} sm={12} xs={12}>
                                <div>
                                    <Form.Group className={s.formGroup}>
                                        <Field
                                            name="title"
                                            type="text"
                                            placeholder={formatMessage(messages.title)}
                                            component={this.renderFormControl}
                                            label={formatMessage(messages.title)}
                                            labelClass={bt.labelText}
                                            fieldClass={bt.formControlInput}
                                        />
                                    </Form.Group>
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={12} xs={12}>
                                <Form.Group className={s.formGroup}>
                                    <div>
                                        <label className={bt.labelText} >{formatMessage(messages.status)}</label>
                                        <Field name="isEnabled" className={cx(bt.formControlSelect, bt.formControlInput, s.selectBox)} component="select">
                                            <option value={true}>{formatMessage(messages.Enabled)}</option>
                                            <option value={false}>{formatMessage(messages.Disabled)}</option>
                                        </Field>
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} md={12} sm={12} xs={12}>
                                <FormGroup className={s.formGroup}>
                                    <div>
                                        <label className={bt.labelText} ><FormattedMessage {...messages.description} /></label>
                                    </div>
                                    <div xs={12} sm={9} md={9} lg={9}>
                                        <Field name="description" component={this.renderQuill} onChange={(event) => { }} />
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
                                    {formatMessage(messages.submitButton)}
                                </Button>
                            </Form.Group>
                        </Col>
                    </Form>
                </div>
            );
        } else {
            return <span></span>;
        }
    }
}

PrecautionNotificationForm = reduxForm({
    form: 'PrecautionNotificationForm',
    validate
})(PrecautionNotificationForm);

const selector = formValueSelector('PrecautionNotificationForm')

const mapState = (state) => ({
    id: selector(state, 'id'),
    title: selector(state, 'title'),
    description: selector(state, 'description'),
    isEnabled: selector(state, 'isEnabled'),
    imageName: selector(state, 'imageName')
})

const mapDispatch = {
    change
}

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(PrecautionNotificationForm)));