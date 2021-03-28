import messages from '../../../locale/messages';

const validate = values => {
    const errors = {};

    if (!values.firstName) {
        errors.firstName = messages.required;
    } else if (values.firstName.trim() == "") {
        errors.firstName = messages.required;
    }

    if (!values.lastName) {
        errors.lastName = messages.required;
    } else if (values.lastName.trim() == "") {
        errors.lastName = messages.required;
    }

    if (!values.email) {
        errors.email = messages.required;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
        errors.email = messages.emailInvalid;
    }

    if (!values.password) {
        // errors.password = messages.required;
    } else if (values.password.length < 8) {
        errors.password = messages.passwordInvalid;
    }

    if (!values.phoneNumber) {
        errors.phoneNumber = messages.required;
    } else if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(values.phoneNumber)) {
        errors.phoneNumber = messages.phoneError;
    }

    if (!values.phoneDialCode) {
        errors.phoneDialCode = messages.required;
    }

    return errors;
};

export default validate