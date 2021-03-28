import React, { Component } from 'react'
import s from './EditDriverForm.css'
import bt from '../../../components/commonStyle.css';
import { Field, reduxForm, formValueSelector, initialize } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
//Style
import withStyles from 'isomorphic-style-loader/withStyles';
import cx from 'classnames';
import {
    Form,
    Col,
    Card,
    Row,
    Badge
} from 'react-bootstrap'
import Link from '../../Link'
import messages from '../../../locale/messages';
import CountryList from '../../CountryList';
import Dropzone from './Dropzone';
import LicenceFrontDropzone from './LicenceFrontDropzone'
import LicenceBackDropzone from './LicenceBackDropzone'
import { api, profilePhotouploadDir, licenseuploadDir } from '../../../config';
import Loader from '../../Common/Loader';

export class EditDriverForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            countryCode: 'IN',
            country: '+91'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
    }

    static defaultProps = {
        loading: false
    };

    componentDidMount() {
        const { initialValues, initialize } = this.props;

        if (initialValues && initialValues.country && initialValues.phoneCountryCode) {
            this.setState({
                countryCode: initialValues.phoneCountryCode,
                country: initialValues.country
            });
        }
    }

    renderField = ({ input, label, type, meta: { touched, error }, fieldClass, placeholder, disabled }) => {
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

    render() {
        const { handleSubmit, id, picture, licenceFront, licenceBack, loading, submitting, getDriver } = this.props
        const { formatMessage } = this.props.intl;
        const { countryCode } = this.state;
        return (
            <div className={cx('cardSection', s.widthInner, bt.space5, s.responsiveNoPadding, 'tabLabelText')}>
                <Row>
                    <Col md={12} lg={12} sm={12} xs={12} className={s.responsiveNoPadding}>
                        <Card className={s.card}>
                            <Form className={s.fullWidth} onSubmit={handleSubmit(submit)}>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <h1>
                                        {formatMessage(messages.editDriver)}
                                        <span className={s.userStatusBadge}>
                                            <Badge pill variant={getDriver && getDriver.isActive === 1 ? 'success' : 'danger'}>
                                                {getDriver && getDriver.isActive === 1 ? formatMessage(messages.online) : formatMessage(messages.offline)}
                                            </Badge>
                                            {' '}
                                            <Badge pill variant={getDriver && getDriver.activeStatus === "active" ? 'success' : 'danger'}>
                                                {getDriver && getDriver.activeStatus === "active" ? formatMessage(messages.eligibleForATrip) : formatMessage(messages.notEligibleForATrip)}
                                            </Badge>
                                        </span>
                                    </h1>
                                </Col>
                                <Row>
                                    <Col lg={4} md={12} sm={12} xs={12} className={bt.space2}>
                                        <Form.Group className={s.formGroup}>
                                            <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                                <label className={bt.labelText} >{formatMessage(messages.profilePicture)}</label><br />
                                                {
                                                    picture &&
                                                    <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + profilePhotouploadDir}medium_${picture})` }} />
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
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} md={12} sm={12} xs={12} className={bt.space2}>
                                        <Form.Group className={s.formGroup}>
                                            <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                                <label className={bt.labelText} >{formatMessage(messages.licenceFrontImage)}</label><br />
                                                {
                                                    licenceFront &&
                                                    <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + licenseuploadDir}medium_${licenceFront})` }} />
                                                }
                                                <div className={'commonFilepicker'}>
                                                    <LicenceFrontDropzone
                                                        className={cx(bt.btnSecondary, 'fileNoPadding')}
                                                        subTextClass={s.subText}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                        id={id}
                                                        oldImageFront={licenceFront}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} md={12} sm={12} xs={12} className={bt.space2}>
                                        <Form.Group className={s.formGroup}>
                                            <div className={cx(s.profileImgSection, s.profileImgWidth)}>
                                                <label className={bt.labelText} >{formatMessage(messages.licenceBackImage)}</label><br />
                                                {
                                                    licenceBack &&
                                                    <div className={s.backgroundImg} style={{ backgroundImage: `url(${api.apiEndpoint + licenseuploadDir}medium_${licenceBack})` }} />

                                                }
                                                <div className={'commonFilepicker'}>
                                                    <LicenceBackDropzone
                                                        className={cx(bt.btnSecondary, 'fileNoPadding')}
                                                        subTextClass={s.subText}
                                                        subText={formatMessage(messages.maximumUploadSizeLabel)}
                                                        defaultMessage={formatMessage(messages.chooseFile)}
                                                        id={id}
                                                        oldImageBack={licenceBack}
                                                    />
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
                                                    formName={'EditDriverForm'}
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
                                                    <option value="pending">{formatMessage(messages.pending)}</option>
                                                    <option value="active">{formatMessage(messages.approve)}</option>
                                                    <option value="inactive">{formatMessage(messages.decline)}</option>
                                                </Field>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={3} md={6} sm={6} xs={12}>
                                        <Form.Group className={s.formGroup}>
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
                                                className={cx(s.button, bt.btnPrimary)}
                                                disabled={submitting || loading}
                                                isSuffix={true}
                                            />
                                        </div>
                                        <Link to={"/siteadmin/drivers"} className={cx(s.backBtn, bt.btnSecondary)}>{formatMessage(messages.goBack)}</Link>
                                    </Form.Group>
                                </Col>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div >
        )
    }
}
EditDriverForm = reduxForm({
    form: 'EditDriverForm', // a unique name for this form
    validate,
    onSubmit: submit
})(EditDriverForm)
const selector = formValueSelector('EditDriverForm')
const mapState = state => ({
    id: selector(state, 'id'),
    picture: selector(state, 'picture'),
    licenceFront: selector(state, 'licenceFront'),
    licenceBack: selector(state, 'licenceBack'),
    loading: state.loader.EditDriver
})
const mapDispatch = {
}
export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(EditDriverForm)));
