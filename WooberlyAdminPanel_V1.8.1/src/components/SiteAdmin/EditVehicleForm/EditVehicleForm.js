import React, { Component } from 'react'
import s from './EditVehicleForm.css'
import bt from '../../../components/commonStyle.css';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import { injectIntl } from 'react-intl';
//Style
import cx from 'classnames';
import {
    Form,
    Col,
    Card,
    Row
} from 'react-bootstrap'
import Link from '../../Link'
import messages from '../../../locale/messages'
import RcbookDropzone from './RcbookDropzone'
import InsuranceDropzone from './InsuranceDropzone'
import { api, vehicleUploadDir } from '../../../config';
import Loader from '../../Common/Loader';

export class EditVehicleForm extends Component {
    static defaultProps = {
        loading: false
    };
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
    render() {
        const { handleSubmit, initialValues, getActiveCategories, id, vehicleRC, vehicleInsurance, loading, submitting } = this.props
        const { formatMessage } = this.props.intl;
        return (
            <div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
                <Row >
                    <Col md={12} lg={12} sm={12} xs={12} className={s.responsiveNoPadding}>
                        <Card className={s.card}>
                            <Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <h1>
                                        {formatMessage(messages.editAction)}{' '}
                                        {initialValues && initialValues.firstName}{' '}{initialValues && initialValues.lastName}'s{' '}
                                        {formatMessage(messages.vechicleName)}
                                    </h1>
                                </Col>
                                <Row>
                                    <Col lg={6} md={12} sm={6} xs={12}>
                                        <Form.Group className={s.formGroup} >
                                            <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                                <label className={bt.labelText} >{formatMessage(messages.rcImage)}</label>
                                                {
                                                    vehicleRC && <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + vehicleUploadDir}medium_${vehicleRC})` }} />
                                                }
                                                <div className={'commonFilepicker'}>
                                                    <RcbookDropzone
                                                        className={cx(bt.btnSecondary, 'fileNoPadding')}
                                                        subTextClass={s.subText}
                                                        fieldName={'vehicleRC'}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                        id={id}
                                                        oldFileName={vehicleRC}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={12} sm={6} xs={12}>
                                        <Form.Group className={s.formGroup} >
                                            <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                                <label className={bt.labelText} >{formatMessage(messages.insuranceImage)}</label>
                                                {
                                                    vehicleInsurance && <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + vehicleUploadDir}medium_${vehicleInsurance})` }} />
                                                }
                                                <div className={'commonFilepicker'}>
                                                    <InsuranceDropzone
                                                        className={cx(bt.btnSecondary, 'fileNoPadding')}
                                                        subTextClass={s.subText}
                                                        fieldName={'vehicleInsurance'}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                        id={id}
                                                        oldFileName={vehicleInsurance}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={6} sm={6} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <label className={bt.labelText} >{formatMessage(messages.vehicleType)}</label><br />
                                                <Field name="vehicleType" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
                                                    {
                                                        getActiveCategories && getActiveCategories.result && getActiveCategories.result.map(category => (
                                                            <option key={category.id} value={category.id}>{category.categoryName}</option>
                                                        ))
                                                    }
                                                </Field>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={6} sm={6} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field
                                                    name="vehicleName"
                                                    type="text"
                                                    placeholder={formatMessage(messages.vehicleName)}
                                                    component={this.renderField}
                                                    label={formatMessage(messages.vehicleName)}
                                                    labelClass={bt.labelText}
                                                    fieldClass={bt.formControlInput}
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={6} sm={6} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field
                                                    name="vehicleNumber"
                                                    type="text"
                                                    placeholder={formatMessage(messages.vehicleNumber)}
                                                    component={this.renderField}
                                                    label={formatMessage(messages.vehicleNumber)}
                                                    labelClass={bt.labelText}
                                                    fieldClass={bt.formControlInput}
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={6} sm={6} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <label className={bt.labelText} >{formatMessage(messages.status)}</label><br />
                                                <Field name="vehicleStatus" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
                                                    <option value="pending">{formatMessage(messages.pending)}</option>
                                                    <option value="active">{formatMessage(messages.active)}</option>
                                                    <option value="inactive">{formatMessage(messages.inactive)}</option>
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
                                                label={formatMessage(messages.update)}
                                                show={loading}
                                                buttonType={'submit'}
                                                className={cx(bt.btnPrimary)}
                                                disabled={submitting || loading}
                                                isSuffix={true}
                                            />
                                        </div>
                                        <Link to={"/siteadmin/vehicles"} className={cx(s.backBtn, bt.btnSecondary)} >{formatMessage(messages.goBack)}</Link>
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
EditVehicleForm = reduxForm({
    form: 'EditVehicleForm', // a unique name for this form
    onSubmit: submit,
    validate
})(EditVehicleForm)
const selector = formValueSelector('EditVehicleForm')
const mapState = state => ({
    id: selector(state, 'id'),
    vehicleRC: selector(state, 'vehicleRC'),
    vehicleInsurance: selector(state, 'vehicleInsurance'),
    loading: state.loader.EditVehicle
})
const mapDispatch = {
}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(EditVehicleForm)));

