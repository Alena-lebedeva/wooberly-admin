import messages from '../../../locale/messages';

const validate = values => {
    const errors = {};

    if (!values.vehicleName) {
        errors.vehicleName = messages.required;
    } else if (values.vehicleName.trim() == "") {
        errors.vehicleName = messages.required;
    } else if (values.vehicleName.length < 3 || values.vehicleName.length > 15) {
        errors.vehicleName = messages.vehicleNameError3
    }

    if (!values.vehicleNumber) {
        errors.vehicleNumber = messages.required;
    } else if (values.vehicleNumber.trim() == "") {
        errors.vehicleNumber = messages.required;
    }

    return errors;
};

export default validate;