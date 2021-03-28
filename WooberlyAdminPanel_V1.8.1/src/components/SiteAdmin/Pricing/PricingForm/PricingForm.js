import React, { Component } from 'react'
import s from './PricingForm.css';
import bt from '../../../../components/commonStyle.css';
import { Field, reduxForm, formValueSelector, initialize } from 'redux-form';
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
import Link from '../../../Link';
import messages from '../../../../locale/messages';
import validate from './validate';
import submit from './submit';
import Loader from '../../../Common/Loader';

export class PricingForm extends Component {
    static defaultProps = {
        currency: 'USD',
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
    renderSelectField = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder, children }) => {
        const { formatMessage } = this.props.intl;
        return (
            <Form.Group>
                <label className={bt.labelText} >{label}</label>
                <Form.Control as="select" {...input} placeholder={placeholder} className={fieldClass}>
                    {children}
                </Form.Control>    
                {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
            </Form.Group>
        )
    }
    renderFieldDiscount = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder }) => {
        const { formatMessage } = this.props.intl;
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
                    {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
                </Form.Group>
            </div>
        )
    }
    render() {
        const { handleSubmit, currency, loading, submitting, id, locations, categories } = this.props;
        const { formatMessage } = this.props.intl;
        return (
            <div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
                <Row>
                    <Col md={12} lg={12} sm={12} xs={12} className={s.responsiveNoPadding}>
                        <Card className={s.card}>
                            <Form className={s.fullWidth} onSubmit={handleSubmit(submit)} >
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <h1>{ id ? formatMessage(messages.editFare) : formatMessage(messages.addFare)}</h1>
                                </Col>
                                <Row>
                                    <Col lg={4} md={6} sm={6} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field
                                                    name="locationId"
                                                    placeholder={formatMessage(messages.locationName)}
                                                    component={this.renderSelectField}
                                                    label={formatMessage(messages.locationName)}
                                                    labelClass={bt.labelText}
                                                    fieldClass={cx(bt.formControlSelect, bt.formControlInput)}
                                                >
                                                    <option value={""}>{formatMessage(messages.locationName)}</option>
                                                    {
                                                        locations && locations.getAllLocation && locations.getAllLocation.LocationData 
                                                            && locations.getAllLocation.LocationData.map(location => location.isActive && (
                                                            <option key={location.id} value={location.id}>{location.locationName}</option>
                                                        ))
                                                    }
                                                </Field>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} md={6} sm={6} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field
                                                    name="categoryId"
                                                    placeholder={formatMessage(messages.category)}
                                                    component={this.renderSelectField}
                                                    label={formatMessage(messages.category)}
                                                    labelClass={bt.labelText}
                                                    fieldClass={cx(bt.formControlSelect, bt.formControlInput)}
                                                >
                                                    <option value={""}>{formatMessage(messages.category)}</option>
                                                    {
                                                        categories && categories.getOverallCategory && categories.getOverallCategory.categoryData 
                                                            && categories.getOverallCategory.categoryData.map(category => category.isActive && (
                                                            <option key={category.id} value={category.id}>{category.categoryName}</option>
                                                        ))
                                                    }
                                                </Field>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} md={6} sm={6} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <label className={bt.labelText} >{formatMessage(messages.currency)}</label><br />
                                                <Field name="currency" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
                                                    {
                                                        currency && currency.availableCurrencies && currency.availableCurrencies.map(currency => (
                                                            <option key={currency.id} value={currency.symbol}>{currency.symbol}</option>
                                                        ))
                                                    }
                                                </Field>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={4} md={6} sm={6} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field
                                                    name="basePrice"
                                                    type="text"
                                                    placeholder={formatMessage(messages.minBasePrice)}
                                                    component={this.renderField}
                                                    label={formatMessage(messages.minBasePrice)}
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
                                                    name="unitPrice"
                                                    type="text"
                                                    placeholder={formatMessage(messages.unitPrice)}
                                                    component={this.renderField}
                                                    label={formatMessage(messages.unitPrice)}
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
                                                    name="minutePrice"
                                                    type="text"
                                                    placeholder={formatMessage(messages.minutePrice)}
                                                    component={this.renderField}
                                                    label={formatMessage(messages.minutePrice)}
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
                                                    name="riderFeeValue"
                                                    type="text"
                                                    placeholder={formatMessage(messages.riderFeeValue)}
                                                    component={this.renderFieldDiscount}
                                                    label={formatMessage(messages.riderFeeValue)}
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
                                                    name="driverFeeValue"
                                                    type="text"
                                                    placeholder={formatMessage(messages.driverFeeValue)}
                                                    component={this.renderFieldDiscount}
                                                    label={formatMessage(messages.driverFeeValue)}
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
                                        <Link to={"/siteadmin/pricing/list"} className={cx(s.backBtn, bt.btnSecondary)} >{formatMessage(messages.goBack)}</Link>
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
PricingForm = reduxForm({
    form: 'PricingForm',
    onSubmit: submit,
    validate
})(PricingForm);
const selector = formValueSelector('PricingForm');
const mapState = (state) => ({
    currency: state.currency,
    loading: state.loader.PricingForm
})
const mapDispatch = {
    initialize
}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(PricingForm)));
