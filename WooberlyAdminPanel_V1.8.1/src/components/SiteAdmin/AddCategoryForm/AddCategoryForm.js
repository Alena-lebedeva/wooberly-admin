import React, { Component } from 'react'
import s from './AddCategoryForm.css';
import bt from '../../../components/commonStyle.css';
import { Field, reduxForm, getFormValues, change, formValueSelector, initialize } from 'redux-form';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/withStyles';
import { injectIntl } from 'react-intl';
import cx from 'classnames';
import {
    Form,
    Col,
    Card,
    Row,
    InputGroup
} from 'react-bootstrap';
import Link from '../../Link';
import messages from '../../../locale/messages';
import validate from './validate';
import submit from './submit'
import ImageDropzone from './ImageDropzone';
import MarkerDropzone from './MarkerDropzone'
import { api, categoryUploadDir } from '../../../config';
import Loader from '../../Common/Loader';

export class AddCategoryForm extends Component {
    static defaultProps = {
        currency: 'USD',
        loading: false
    };
    componentWillMount() {
        const { initialize } = this.props;
        initialize({ riderFeeType: 'percentage', driverFeeType: 'percentage' })
    }
    renderField = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder }) => {
        const { formatMessage } = this.props.intl;
        return (
            <Form.Group>
                <label className={bt.labelText} >{label}</label>
                <Form.Control {...input} placeholder={placeholder} type={type} className={bt.formControlInput} />
                {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
            </Form.Group>
        )
    }
    renderFieldDiscount = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder }) => {
        return (
            <div className={'inputFormAddon'}>
                <Form.Group>
                    <label className={bt.labelText} >{label}</label>
                    <InputGroup>
                        <Form.Control {...input} placeholder={placeholder} type={type} className={bt.formControlInput} />
                        <InputGroup.Append>
                            <InputGroup.Text>%</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    {touched && error && <span className={bt.errorMessage}>{error.defaultMessage}</span>}
                </Form.Group>
            </div>
        )
    }
    render() {
        const { handleSubmit, currency, categoryImage, categoryMarkerImage, loading, submitting  } = this.props;
        const { formatMessage } = this.props.intl;
        return (
            <div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
                <Row>
                    <Col md={12} lg={12} sm={12} xs={12} className={s.responsiveNoPadding}>
                        <Card className={s.card}>
                            <Form className={s.fullWidth} onSubmit={handleSubmit(submit)} >
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <h1>{formatMessage(messages.addCategory)}</h1>
                                </Col>
                                <Row>
                                    <Col lg={6} md={12} sm={6} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div className={cx(s.centerFlex, s.profileImgSection, s.profileImgWidth)}>
                                            <label className={bt.labelText} >{formatMessage(messages.categoryIcon)}</label>
                                                {
                                                    categoryImage && <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + categoryUploadDir}medium_${categoryImage})` }} />
                                                }
                                                <div>
                                                    <ImageDropzone
                                                        key={'categoryImage'}
                                                        className={bt.btnSecondary}
                                                        subTextClass={s.subText}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={12} sm={6} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div className={cx(s.centerFlex, s.profileImgSection, s.profileImgWidth)}>
                                            <label className={bt.labelText} >{formatMessage(messages.categoryMapMarker)}</label>
                                                {
                                                    categoryMarkerImage && <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + categoryUploadDir}medium_${categoryMarkerImage})` }} />
                                                }
                                                <div className={'commonFilepicker'}>
                                                    <MarkerDropzone
                                                        key={'categoryMarkerImage'}
                                                        className={cx(bt.btnSecondary, 'fileNoPadding')}
                                                        subTextClass={s.subText}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={4} md={6} sm={6} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field
                                                    name="categoryName"
                                                    type="text"
                                                    placeholder={formatMessage(messages.categoryName)}
                                                    component={this.renderField}
                                                    label={formatMessage(messages.categoryName)}
                                                    labelClass={bt.labelText}
                                                    fieldClass={bt.formControlInput}
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} md={6} sm={6} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field
                                                    name="capacity"
                                                    type="text"
                                                    placeholder={formatMessage(messages.capacity)}
                                                    component={this.renderField}
                                                    label={formatMessage(messages.capacity)}
                                                    labelClass={bt.labelText}
                                                    fieldClass={bt.formControlInput}
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} md={6} sm={6} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                            <label className={bt.labelText} >{formatMessage(messages.status)}</label><br />
                                                <Field name="isActive" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
                                                    <option value={true}>{formatMessage(messages.active)}</option>
                                                    <option value={false}>{formatMessage(messages.inactive)}</option>
                                                </Field>
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
                                        <Link to={"/siteadmin/category"} className={cx(s.backBtn, bt.btnSecondary)} >{formatMessage(messages.goBack)}</Link>
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
AddCategoryForm = reduxForm({
    form: 'AddCategoryForm',
    onSubmit: submit,
    validate
})(AddCategoryForm);
const selector = formValueSelector('AddCategoryForm');
const mapState = (state) => ({
    currency: state.currency,
    categoryImage: selector(state, 'categoryImage'),
    categoryMarkerImage: selector(state, 'categoryMarkerImage'),
    loading: state.loader.AddCategory
})
const mapDispatch = {
    initialize
}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(AddCategoryForm)));
