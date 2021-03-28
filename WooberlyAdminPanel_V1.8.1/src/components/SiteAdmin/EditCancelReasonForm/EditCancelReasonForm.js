import React, { Component } from 'react';
import s from './EditCancelReasonForm.css';
import bt from '../../../components/commonStyle.css';
import { Field, reduxForm, getFormValues, change, formValueSelector } from 'redux-form';
import submit from './submit';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import { injectIntl } from 'react-intl';
//Style
import cx from 'classnames';
import {
    Button,
    Form,
    Col,
    Card,
    Row,
} from 'react-bootstrap';
import Link from '../../Link';
import messages from '../../../locale/messages';
import validate from './validate';

export class EditCancelReasonForm extends Component {
    renderField = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder }) => {
        return (
            <Form.Group>
                <label className={bt.labelText} >{label}</label>
                <Form.Control {...input} placeholder={placeholder} type={type} className={bt.formControlInput} />
                {touched && error && <span className={bt.errorMessage}>{error.defaultMessage}</span>}
            </Form.Group>
        )
    }
    render() {
        const { handleSubmit } = this.props;
        const { formatMessage } = this.props.intl;
        return (
            <div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
                <Row>
                    <Col md={12} lg={12} sm={12} xs={12} className={s.responsiveNoPadding}>
                        <Card className={s.card}>
                            <Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <h1>{formatMessage(messages.editCategory)}</h1>
                                </Col>
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
                                </Row>
                                <Col lg={12} md={12} sm={12} xs={12} className={cx(bt.textAlignRight, bt.spaceTop3)}>
                                    <Form.Group className={s.formGroup}>
                                        <Button
                                            type="submit"
                                            className={cx(bt.btnPrimary)}
                                        >
                                            {formatMessage(messages.submitButton)}
                                        </Button>
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
EditCancelReasonForm = reduxForm({
    form: 'EditCancelReasonForm',
    // onSubmit: submit,
    // validate
})(EditCancelReasonForm);
const mapState = (state) => ({
    
})
const mapDispatch = {
}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(EditCancelReasonForm)));
