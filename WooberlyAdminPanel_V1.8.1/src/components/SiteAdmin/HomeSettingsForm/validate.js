import messages from '../../../locale/messages';

const validate = values => {
    const errors = {};

    if (!values.homeSectionTitle1) {
        errors.homeSectionTitle1 = messages.required;
    } else if (values.homeSectionTitle1.trim() == "") {
        errors.homeSectionTitle1 = messages.required;
    } else if (values.homeSectionTitle1.length < 2 ) {
        errors.homeSectionTitle1 = messages.required
    } else if (values.homeSectionTitle1.length > 34 ) {
        errors.homeSectionTitle1 = messages.exceedLimit
    }

    if (!values.homeSectionButton1) {
        errors.homeSectionButton1 = messages.required;
    } else if (values.homeSectionButton1.trim() == "") {
        errors.homeSectionButton1 = messages.required;
    } else if (values.homeSectionButton1.length < 2 ) {
        errors.homeSectionButton1 = messages.required
    } else if (values.homeSectionButton1.length > 21 ) {
        errors.homeSectionButton1 = messages.exceedLimit
    }

    

    return errors;
};

export default validate;