import messages from '../../../locale/messages';

const validate = values => {

    const errors = {}

    if (!values.locationName) {
        errors.locationName = messages.required;
    } else if (values.locationName.trim() == "") {
        errors.locationName = messages.required;
    } else if (values.locationName.length > 22) {
        errors.locationName = messages.exceedLimit;
    }

    if (!values.description) {
        errors.description = messages.required;
    } else if (values.description.trim() == "") {
        errors.description = messages.required;
    } else if (values.description.length > 250) {
        errors.description = messages.exceedLimit;
    }

    return errors
}

export default validate;