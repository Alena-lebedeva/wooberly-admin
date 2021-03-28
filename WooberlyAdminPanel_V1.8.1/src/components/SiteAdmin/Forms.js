

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './AdminCommon.css';
import bt from '../../../components/commonStyle.css';
import { injectIntl, FormattedMessage } from 'react-intl';
import cx from 'classnames';
import messages from '../../locale/messages';
import { Field, reduxForm } from 'redux-form';
import {
    Navbar, Row, Col, Table, Form, Button, Select
} from 'react-bootstrap';





class Forms extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
    };


    renderField({ input, placeholder }) {
        return (
            <Form.Group className={s.formGroup}>
                <Form.Control  {...input} componentClass="input" placeholder={placeholder} className={cx(bt.formControlInput)} />
            </Form.Group>
        );
    }

    renderFormControlSelect = ({ children}) => {
        return (
            <div>
                <Form.Group>
                <Form.Control as="select"> 
                    {children}
                </Form.Control>
                </Form.Group>
            </div>
        );
    }
    renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
        return (
            <Form.Group className={s.formGroup}>

                    <Form.Control
                        {...input}
                        as ="textarea"
                        className={className}
                        placeholder={label}
                        componentClass={"textarea"}
                        rows={4}
                    />
               
            </Form.Group>
        )
    }




    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                <Row>
                    <Col lg={6}>
                        <div className={s.cardOne}>
                            <Form>
                                <div>
                                <label className={bt.labelText} ><FormattedMessage {...messages.emailaddress} /></label>
                                    <Field name="name" component={this.renderField} placeholder={formatMessage(messages.emailaddress)} />
                                </div>
                                <div>
                                <label className={bt.labelText} ><FormattedMessage {...messages.select} /></label>
                                    <Field name="select"  component={this.renderFormControlSelect}>
                                        <option value="0">{formatMessage(messages.oneOne)}</option>
                                    </Field>
                                </div>

                                <div>
                                <label className={bt.labelText} > <FormattedMessage {...messages.textarea} /></label>
                                    <Field name="name" component={this.renderFormControlTextArea} />
                                </div>
                                <Form.Group controlId="formBasicChecbox">
                                    <Form.Check type="checkbox" label={formatMessage(messages.checkmeout)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check
                                        label={formatMessage(messages.radioButton)} type="radio" />

                                </Form.Group>
                            </Form>
                            <div className={"d-flex justify-content-end"}>
                                <Button className={s.buttonWidth}>
                                <FormattedMessage {...messages.submitButton} />
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={s.cardOne}>
                            <Form>
                                <div>
                                <label className={bt.labelText} > <FormattedMessage {...messages.emailaddress} /></label>
                                    <Field name="name" component={this.renderField} placeholder={formatMessage(messages.emailaddress)} />
                                </div>
                                <div>
                                <label className={bt.labelText} ><FormattedMessage {...messages.select} /></label>
                                    <Field name="select" component={this.renderFormControlSelect}>
                                        <option value="0">1</option>
                                    </Field>
                                </div>

                                <div>
                                <label className={bt.labelText} > <FormattedMessage {...messages.textarea} /></label>
                                    <Field name="name" component={this.renderFormControlTextArea}  />
                                </div>
                                <Form.Group controlId="formBasicChecbox">
                                    <Form.Check type="checkbox" label={formatMessage(messages.checkmeout)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check
                                        label={formatMessage(messages.radioButton)} type="radio" />

                                </Form.Group>
                            </Form>
                            <div className={"d-flex justify-content-end"}>
                                <Button className={s.buttonWidth}>
                                <FormattedMessage {...messages.submitButton} />
                                </Button>
                            </div>
                        </div>
                    </Col>

                </Row>

            </div>

        );
    }
}
Forms = reduxForm({
    form: 'Forms',
})(Forms);


export default injectIntl(withStyles(s, bt)(Forms));
