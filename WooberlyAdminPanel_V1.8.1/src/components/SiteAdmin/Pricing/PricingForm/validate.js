import messages from '../../../../locale/messages';

const validate = values => {
    const errors = {};

    if (!values.locationId) {
        errors.locationId = messages.required;
    }
    
    if (!values.categoryId) {
        errors.categoryId = messages.required;
    }

    if (!values.basePrice && values.basePrice !== 0) {
        errors.basePrice = messages.required;
    } else if (isNaN(values.basePrice)) {
        errors.basePrice = messages.floatError;
    }

    if (!values.unitPrice && values.unitPrice !== 0) {
        errors.unitPrice = messages.required;
    } else if (isNaN(values.unitPrice)) {
        errors.unitPrice = messages.floatError;
    }

    if (!values.minutePrice && values.minutePrice !== 0) {
        errors.minutePrice = messages.required;
    } else if (isNaN(values.minutePrice)) {
        errors.minutePrice = messages.floatError;
    }

    if (!values.riderFeeValue) {
        errors.riderFeeValue = messages.required;
    } else if (!/^[0-9]+$/.test(values.riderFeeValue)) {
        errors.riderFeeValue = messages.intError
    } else if (values.riderFeeValue && (parseInt(values.riderFeeValue, 10) < 0 || parseInt(values.riderFeeValue, 10) > 99)) {
        errors.riderFeeValue = messages.percentError;
    }

    if (!values.driverFeeValue) {
        errors.driverFeeValue = messages.required;
    } else if (!/^[0-9]+$/.test(values.driverFeeValue)) {
        errors.driverFeeValue = messages.intError
    } else if (values.driverFeeValue && (parseInt(values.driverFeeValue, 10) < 0 || parseInt(values.driverFeeValue, 10) > 99)) {
        errors.driverFeeValue = messages.percentError;
    }

    return errors;
};

export default validate