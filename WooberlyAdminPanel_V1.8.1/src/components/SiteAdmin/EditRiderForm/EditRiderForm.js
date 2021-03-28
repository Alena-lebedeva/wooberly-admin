import React, { Component } from 'react'
import s from './EditRiderForm.css'
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
import CountryList from '../../CountryList';
import Dropzone from './Dropzone'
import { api, profilePhotouploadDir } from '../../../config';
import Loader from '../../Common/Loader';

export class EditRiderForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            countryCode: 'US',
            country: '+1',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
    }
    static defaultProps = {
        loading: false
    };
    renderField = ({ input, label, type, meta: { touched, error }, labelClass, fieldClass, placeholder, disabled }) => {
        const { formatMessage } = this.props.intl;
        return (
            <Form.Group>
                <label className={bt.labelText} >{label}</label>
                <Form.Control {...input} placeholder={placeholder} type={type} className={bt.formControlInput} disabled={disabled} />
                {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
            </Form.Group>
        )
    }
    renderFieldPhoneNumber = ({ input, label, writeOnce, type, meta: { touched, error }, fieldClass, placeholder, disabled }) => {
        const { formatMessage } = this.props.intl;
        return (
            <Form.Group>
                <Form.Control {...input} readOnly={writeOnce} placeholder={placeholder} type={type} className={bt.formControlInput} disabled={disabled} />
                {touched && error && <span className={bt.errorMessage}>{formatMessage(error)}</span>}
            </Form.Group>
        )
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleCountryChange(e, selectedData) {
        this.setState({
            country: selectedData.dialCode,
            countryCode: selectedData.countryCode
        });
    }
    componentDidMount() {
        const { initialValues } = this.props;
        if (initialValues && initialValues.country && initialValues.phoneCountryCode) {
            this.setState({
                countryCode: initialValues.phoneCountryCode,
                country: initialValues.country
            });
        }
    }
    render() {
        const { handleSubmit, id, picture, loading, submitting } = this.props
        const { formatMessage } = this.props.intl;
        const { countryCode } = this.state;
        return (
            <div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding)}>
                <Row >
                    <Col md={12} lg={12} sm={12} xs={12} className={s.responsiveNoPadding}>
                        <Card className={s.card}>
                            <Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <h1>{formatMessage(messages.editRider)}</h1>
                                </Col>
                                <Row>
                                    <Col lg={12} md={12} sm={12} xs={12} className={bt.space3}>
                                        <Form.Group className={s.formGroup} >
                                            <div className={s.profileImgSection}>
                                                <label className={bt.labelText} >{formatMessage(messages.profilePicture)}</label>
                                                <div>
                                                    {
                                                        picture && <div>
                                                            <img src={api.apiEndpoint + profilePhotouploadDir + picture} className={s.profileImg} />
                                                        </div>
                                                    }
                                                    <div className={'commonFilepicker'}>
                                                        <Dropzone
                                                            className={cx(bt.btnSecondary, 'fileNoPadding')}
                                                            subTextClass={s.subText}
                                                            fieldName={'picture'}
                                                            subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                            defaultMessage={formatMessage(messages.chooseFile)}
                                                            id={id}
                                                            oldFileName={picture}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field
                                                    name="firstName"
                                                    type="text"
                                                    placeholder={formatMessage(messages.firstName)}
                                                    component={this.renderField}
                                                    label={formatMessage(messages.firstName)}
                                                    labelClass={bt.labelText}
                                                    fieldClass={bt.formControlInput}
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field
                                                    name="lastName"
                                                    type="text"
                                                    placeholder={formatMessage(messages.lastName)}
                                                    component={this.renderField}
                                                    label={formatMessage(messages.lastName)}
                                                    labelClass={bt.labelText}
                                                    fieldClass={bt.formControlInput}
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field
                                                    name="email"
                                                    type="text"
                                                    component={this.renderField}
                                                    placeholder={formatMessage(messages.email)}
                                                    label={formatMessage(messages.email)}
                                                    labelClass={bt.labelText}
                                                    fieldClass={bt.formControlInput}
                                                    disabled={true}
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} md={12} sm={12} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <Field
                                                    name="password"
                                                    type="text"
                                                    placeholder={formatMessage(messages.password)}
                                                    component={this.renderField}
                                                    label={formatMessage(messages.password)}
                                                    labelClass={bt.labelText}
                                                    fieldClass={bt.formControlInput}
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} md={12} sm={12} xs={12} className={bt.noPadding}>
                                        <Col lg={12} md={12} sm={12} xs={12}>
                                            <label className={bt.labelText} >{formatMessage(messages.phoneNumber)}</label>
                                        </Col>
                                        <Row>
                                            <Col lg={6} md={12} sm={12} xs={12}>
                                                <CountryList
                                                    input={
                                                        {
                                                            name: 'phoneDialCode',
                                                            onChange: this.handleChange,
                                                            value: countryCode,
                                                        }
                                                    }
                                                    className={cx(bt.formControlSelect, bt.formControlInput, bt.space1)}
                                                    dialCode={false}
                                                    getSelected={this.handleCountryChange}
                                                    formName={'EditRiderForm'}
                                                    disabled={true}
                                                />
                                            </Col>
                                            <Col lg={6} md={12} sm={12} xs={12}>
                                                <div className={cx(s.displayInlineBlock, s.countryCode, 'phoneColor')}>
                                                    <Form.Group className={s.formGroup}>
                                                        <div>
                                                            <Field
                                                                name="phoneDialCode"
                                                                type="text"
                                                                placeholder={formatMessage(messages.phoneDialCode)}
                                                                component={this.renderFieldPhoneNumber}
                                                                labelClass={bt.labelText}
                                                                fieldClass={cx(bt.formControlInput, bt.formControlInputCountryCode)}
                                                                writeOnce={true}
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </div>
                                                <div className={cx(s.displayInlineBlock, s.countryPhoneNumber, 'phoneNumber')}>
                                                    <Form.Group className={s.formGroup}>
                                                        <div>
                                                            <Field
                                                                name="phoneNumber"
                                                                type="text"
                                                                placeholder={formatMessage(messages.phoneNumber)}
                                                                component={this.renderFieldPhoneNumber}
                                                                labelClass={bt.labelText}
                                                                fieldClass={cx(bt.formControlInput, bt.formControlInputCountry)}
                                                                disabled={true}
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg={3} md={6} sm={6} xs={12}>
                                        <Form.Group className={s.formGroup}>
                                            <div>
                                                <label className={bt.labelText} >{formatMessage(messages.userStatus)}</label><br />
                                                <Field name="userStatus" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
                                                    {/* <option value="pending">{formatMessage(messages.pending)}</option> */}
                                                    <option value="active">{formatMessage(messages.active)}</option>
                                                    <option value="inactive">{formatMessage(messages.inactive)}</option>
                                                </Field>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={3} md={6} sm={6} xs={12}>
                                        <Form.Group className={s.formGroup} controlId="exampleForm.ControlSelect1">
                                            <div>
                                                <label className={bt.labelText} >{formatMessage(messages.banStatus)}</label><br />
                                                <Field name="isBan" className={cx(bt.formControlSelect, bt.formControlInput)} component="select">
                                                    <option value="0">{formatMessage(messages.permit)}</option>
                                                    <option value="1">{formatMessage(messages.ban)}</option>
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
                                        <Link to={"/siteadmin/riders"} className={cx(s.backBtn, bt.btnSecondary)}>{formatMessage(messages.goBack)}</Link>
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
EditRiderForm = reduxForm({
    form: 'EditRiderForm', // a unique name for this form
    validate,
    onSubmit: submit
})(EditRiderForm)
const selector = formValueSelector('EditRiderForm')
const mapState = state => ({
    id: selector(state, 'id'),
    picture: selector(state, 'picture'),
    loading: state.loader.EditRider
})
const mapDispatch = {
}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(EditRiderForm)));


