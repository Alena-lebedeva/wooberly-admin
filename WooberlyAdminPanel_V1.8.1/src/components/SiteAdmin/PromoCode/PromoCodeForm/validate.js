import messages from '../../../../locale/messages';

const validate = values => {
    const errors = {};

    if (!values.title) {
        errors.title = messages.required;
    } else if (values.categoryName && values.categoryName.toString().trim() == '') {
        errors.title = messages.required;
    }

    if (!values.code) {
        errors.code = messages.required;
    } else if (values.code && values.code.toString().trim() == '') {
        errors.code = messages.required;
    }

    if (!values.promoValue) {
        errors.promoValue = messages.required;
    } else if (values.promoValue && values.promoValue.toString().trim() == '') {
        errors.promoValue = messages.required;
    } else if (values.promoValue) {
        if (values.type == 2) { // Fixed
            if (isNaN(values.promoValue) || (!/^[0-9\.]+$/.test(values.promoValue)) || (parseFloat(values.promoValue, 10) < 0)) {
                errors.promoValue = messages.floatError;
            }
        } else { // % 
            if (isNaN(values.promoValue) || !/^[0-9]+$/.test(values.promoValue)) {
                errors.promoValue = messages.intError;
            } else if (parseInt(values.promoValue, 10) < 0 || parseInt(values.promoValue, 10) > 99) {
                errors.promoValue = messages.percentError;
            }
        }
    }

    if (!values.description) {
        errors.description = messages.required;
    } else if (values.description && values.description.toString().trim() == '') {
        errors.description = messages.required;
    }

    return errors;
};

export default validate