import React, { Component } from 'react';
import s from './PromoCodeForm.css';
import bt from '../../../../components/commonStyle.css';
import { Field, reduxForm, getFormValues, change, formValueSelector, initialize } from 'redux-form';
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
    InputGroup
} from 'react-bootstrap';
import Link from '../../../Link';
import messages from '../../../../locale/messages';
import validate from './validate';
import { normalizePromoCode } from './normalize';
import DatePicker from '../../../Common/DatePicker';
import Loader from '../../../Common/Loader';

export class PromoCodeForm extends Component {
    static defaultProps = {
        currency: 'USD',
        promoId: null,
        promoCurrency: 'USD',
        expiryDate: null
    }
    componentDidMount() {
        const { initialValues, initialize } = this.props
        if (!initialValues) {
            initialize({ 
                type: 1,
                currency: 'USD', 
            })
        }
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
    renderFieldDiscount = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder, promoType, promoCurrency }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div className={cx('inputFormAddon', 'addonBorder')}>
                <Form.Group>
                    <label className={bt.labelText} >{label}</label>
                    <InputGroup>
                        {
                            promoType == 2 && <InputGroup.Append>
                                <InputGroup.Text>
                                    {
                                        promoCurrency
                                    }
                                </InputGroup.Text>
                            </InputGroup.Append>
                        }
                        <Form.Control {...input} placeholder={placeholder} type={type} className={bt.formControlInput} />
                        {
                            promoType != 2 && <InputGroup.Append>
                                <InputGroup.Text>%</InputGroup.Text>
                            </InputGroup.Append>
                        }
                    </InputGroup>
                    {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
                </Form.Group>
            </div>
        )
    }
    renderTextAreaField = ({ input, label, type, meta: { touched, error }, children, labelClass, fieldClass, placeholder }) => {
        const { formatMessage } = this.props.intl;
        return (
            <Form.Group>
               <label className={bt.labelText} >{label}</label>
                <Form.Control as="textarea" rows="3" {...input} placeholder={placeholder} type={type} className={fieldClass} />
                {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
            </Form.Group>
        )
    }
    render() {
        const { handleSubmit, currency, promoId, promoType, promoCurrency, expiryDate, loading, submitting  } = this.props;
        const { formatMessage } = this.props.intl;
        return (
            <div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
                <Row>
                    <Col md={12} lg={12} sm={12} xs={12} className={s.responsiveNoPadding}>
                        <Card className={s.card}>
                            <Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <h1>{promoId ? formatMessage(messages.editPromoCode) : formatMessage(messages.addPromoCode)}</h1>
                                </Col>
                                <Row>
                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field
                                                    name="title"
                                                    type="text"
                                                    placeholder={formatMessage(messages.title)}
                                                    component={this.renderField}
                                                    label={formatMessage(messages.title)}
                                                    labelClass={bt.labelText}
                                                    fieldClass={bt.formControlInput}
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={3} md={6} sm={6} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field
                                                    name="code"
                                                    type="text"
                                                    placeholder={formatMessage(messages.code)}
                                                    component={this.renderField}
                                                    label={formatMessage(messages.code)}
                                                    labelClass={bt.labelText}
                                                    fieldClass={bt.formControlInput}
                                                    normalize={normalizePromoCode}
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={3} md={6} sm={6} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <label className={bt.labelText} >{formatMessage(messages.promoType)}</label>
                                                <Field name="type" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
                                                    <option value={1}>{formatMessage(messages.percentage)}</option>
                                                    <option value={2}>{formatMessage(messages.fixedAmount)}</option>
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
                                                    name="promoValue"
                                                    type="text"
                                                    placeholder={formatMessage(messages.discount)}
                                                    component={this.renderFieldDiscount}
                                                    label={formatMessage(messages.discount)}
                                                    labelClass={bt.labelText}
                                                    fieldClass={bt.formControlInput}
                                                    promoType={promoType}
                                                    promoCurrency={promoCurrency}
                                                />
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
                                    <Col lg={4} md={6} sm={6} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                {/* <Field
                                                    name="expiryDate"
                                                    type="text"
                                                    placeholder={formatMessage(messages.expireDate)}
                                                    component={this.renderField}
                                                    label={formatMessage(messages.expireDate)}
                                                    labelClass={bt.labelText}
                                                    fieldClass={bt.formControlInput}
                                                /> */}
                                                <label className={bt.labelText} >{formatMessage(messages.expireDate)}</label>
                                                <DatePicker
                                                    placeholder={formatMessage(messages.expireDate)}
                                                    formName={'PromoCodeForm'}
                                                    fieldName={'expiryDate'}
                                                    initialDate={expiryDate}
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    {
                                        promoId && <Col lg={4} md={6} sm={6} xs={12}>
                                            <Form.Group className={s.formGroup}>
                                                <div>
                                                    <label className={bt.labelText} >{formatMessage(messages.status)}</label><br />
                                                    <Field name="isEnable" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
                                                        <option value="true">{formatMessage(messages.active)}</option>
                                                        <option value="false">{formatMessage(messages.inactive)}</option>
                                                    </Field>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    }
                                    <Col lg={4} md={6} sm={6} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field
                                                    name="description"
                                                    type="text"
                                                    placeholder={formatMessage(messages.description)}
                                                    component={this.renderTextAreaField}
                                                    label={formatMessage(messages.description)}
                                                    labelClass={bt.labelText}
                                                    fieldClass={bt.formControlInput}
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Col lg={12} md={12} sm={12} xs={12} className={cx(bt.textAlignRight, bt.spaceTop3)}>
                                    <Form.Group className={s.formGroup}>
                                       <div className={s.displayInlineBlock}>
                                       <Loader 
                                        type={"button"}
                                        label={promoId ? formatMessage(messages.update) : formatMessage(messages.submitButton)}
                                        show={loading}
                                        buttonType={'submit'}
                                        className={cx(bt.btnPrimary)}
                                        disabled={submitting || loading}
                                        isSuffix={true}
                                        />
                                       </div>
                                        <Link to={"/siteadmin/promo-code/list"} className={cx(s.backBtn, bt.btnSecondary)} >{formatMessage(messages.goBack)}</Link>
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
PromoCodeForm = reduxForm({
    form: 'PromoCodeForm',
    onSubmit: submit,
    validate
})(PromoCodeForm);
const selector = formValueSelector('PromoCodeForm');
const mapState = state => ({
    currency: state.currency,
    promoId: selector(state, 'id'),
    promoType: selector(state, 'type'),
    promoCurrency: selector(state, 'currency'),
    expiryDate: selector(state, 'expiryDate'),
    loading: state.loader.AddPromoCode
});
const mapDispatch = {};
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(PromoCodeForm)));
