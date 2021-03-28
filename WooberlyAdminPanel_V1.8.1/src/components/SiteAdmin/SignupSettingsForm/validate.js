import messages from '../../../locale/messages';

const validate = values => {
    const errors = {};

    if (!values.signupGridTitle1) {
        errors.signupGridTitle1 = messages.required;
    } else if (values.signupGridTitle1.trim() == "") {
        errors.signupGridTitle1 = messages.required;
    } else if (values.signupGridTitle1.length < 2 ) {
        errors.signupGridTitle1 = messages.required
    } else if (values.signupGridTitle1.length > 23 ) {
        errors.signupGridTitle1 = messages.exceedLimit
    }

    if (!values.signupGridContent1) {
        errors.signupGridContent1 = messages.required;
    } else if (values.signupGridContent1.trim() == "") {
        errors.signupGridContent1 = messages.required;
    } else if (values.signupGridContent1.length < 2 ) {
        errors.signupGridContent1 = messages.required
    } else if (values.signupGridContent1.length > 220 ) {
        errors.signupGridContent1 = messages.exceedLimit
    }

    if (!values.signupGridLink1) {
        errors.signupGridLink1 = messages.required
    } else if (values.signupGridLink1.trim() == '') {
        errors.signupGridLink1 = messages.required
    } else if (values.signupGridLink1) {
        if (!/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i.test(values.signupGridLink1)) {
            errors.signupGridLink1 = messages.validUrl;
        }
    }

    if (!values.signupGridLink2) {
        errors.signupGridLink2 = messages.required
    } else if (values.signupGridLink2.trim() == '') {
        errors.signupGridLink2 = messages.required
    } else if (values.signupGridLink2) {
        if (!/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i.test(values.signupGridLink2)) {
            errors.signupGridLink2 = messages.validUrl;
        }
    }
    

    return errors;
};

export default validate;