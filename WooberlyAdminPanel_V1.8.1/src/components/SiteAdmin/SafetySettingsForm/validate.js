import messages from '../../../locale/messages';

const validate = values => {
    const errors = {};

    if (!values.safetyGridTitle1) {
        errors.safetyGridTitle1 = messages.required;
    } else if (values.safetyGridTitle1.trim() == "") {
        errors.safetyGridTitle1 = messages.required;
    } else if (values.safetyGridTitle1.length < 2 ) {
        errors.safetyGridTitle1 = messages.required
    } else if (values.safetyGridTitle1.length > 22 ) {
        errors.safetyGridTitle1 = messages.exceedLimit
    }

    if (!values.safetyGridContent1) {
        errors.safetyGridContent1 = messages.required;
    } else if (values.safetyGridContent1.trim() == "") {
        errors.safetyGridContent1 = messages.required;
    } else if (values.safetyGridContent1.length < 2 ) {
        errors.safetyGridContent1 = messages.required
    } else if (values.safetyGridContent1.length > 220 ) {
        errors.safetyGridContent1 = messages.exceedLimit
    }

    if (!values.safetyGridLink1) {
        errors.safetyGridLink1 = messages.required
    } else if (values.safetyGridLink1.trim() == '') {
        errors.safetyGridLink1 = messages.required
    } else if (values.safetyGridLink1) {
        if (!/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i.test(values.safetyGridLink1)) {
            errors.safetyGridLink1 = messages.validUrl;
        }
    }

    if (!values.safetyGridLink2) {
        errors.safetyGridLink2 = messages.required
    } else if (values.safetyGridLink2.trim() == '') {
        errors.safetyGridLink2 = messages.required
    } else if (values.safetyGridLink2) {
        if (!/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i.test(values.safetyGridLink2)) {
            errors.safetyGridLink2 = messages.validUrl;
        }
    }
    

    return errors;
};

export default validate;