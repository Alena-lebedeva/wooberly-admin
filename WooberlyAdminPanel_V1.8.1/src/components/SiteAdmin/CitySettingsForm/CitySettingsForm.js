import React, { Component } from 'react';
import s from './CitySettingsForm.css';
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
    FormGroup,
    FormControl
} from 'react-bootstrap';
import messages from '../../../locale/messages';
import validate from './validate';

export class CitySettingsForm extends Component {
    renderField = ({ input, label, type, meta: { touched, error }, placeholder }) => {
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
                            className={bt.formControlInput}
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
        const { handleSubmit } = this.props;
        const { formatMessage } = this.props.intl;
        return (
            <div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
                <Row>
                    <Col md={12} lg={12} sm={12} xs={12} className={s.responsiveNoPadding}>
                        <Card className={s.card}>
                            <Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <h1>{formatMessage(messages.citySectionSettings)}</h1>
                                </Col>
                                <Row>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="citySectionTitle1" type="text" component={this.renderField} label={formatMessage(messages.categoryTitle)} />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field name="citySectionContent1" type="text" component={this.renderFormControlTextArea} label={formatMessage(messages.categoryContent)} />
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
CitySettingsForm = reduxForm({
    form: 'CitySettingsForm',
    onSubmit: submit,
    validate
})(CitySettingsForm);
const mapState = (state) => ({
    
})
const mapDispatch = {
}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(CitySettingsForm)));
