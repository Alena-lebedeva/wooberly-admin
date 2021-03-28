import messages from '../../../locale/messages';

const validate = values => {
    const errors = {};

    if (!values.categoryName) {
        errors.categoryName = messages.required;
    } else if (values.categoryName.trim() == "") {
        errors.categoryName = messages.required;
    }

    if (!values.capacity && values.capacity !== 0) {
        errors.capacity = messages.required;
    } else if (!/^[0-9]+$/.test(values.capacity)) {
        errors.capacity = messages.intError;
    }

    return errors;
};

export default validate