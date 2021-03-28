import messages from '../../../locale/messages';

const validate = values => {
    const errors = {};

    if (!values.footerTitle1) {
        errors.footerTitle1 = messages.required;
    } else if (values.footerTitle1.trim() == "") {
        errors.footerTitle1 = messages.required;
    } else if (values.footerTitle1.length < 2 ) {
        errors.footerTitle1 = messages.required
    } else if (values.footerTitle1.length > 15 ) {
        errors.footerTitle1 = messages.exceedLimit
    }

    if (!values.footerContent1) {
        errors.footerContent1 = messages.required;
    } else if (values.footerContent1.trim() == "") {
        errors.footerContent1 = messages.required;
    } else if (values.footerContent1.length < 2 ) {
        errors.footerContent1 = messages.required
    } else if (values.footerContent1.length > 250 ) {
        errors.footerContent1 = messages.exceedLimit
    }

    if (!values.footerLinkName1) {
        errors.footerLinkName1 = messages.required;
    } else if (values.footerLinkName1.trim() == "") {
        errors.footerLinkName1 = messages.required;
    } else if (values.footerLinkName1.length < 2 ) {
        errors.footerLinkName1 = messages.required
    } else if (values.footerLinkName1.length > 26 ) {
        errors.footerLinkName1 = messages.exceedLimit
    }

    if (!values.footerLinkName2) {
        errors.footerLinkName2 = messages.required;
    } else if (values.footerLinkName2.trim() == "") {
        errors.footerLinkName2 = messages.required;
    } else if (values.footerLinkName2.length < 2 ) {
        errors.footerLinkName2 = messages.required
    } else if (values.footerLinkName2.length > 26 ) {
        errors.footerLinkName2 = messages.exceedLimit
    }

    if (!values.footerLinkName3) {
        errors.footerLinkName3 = messages.required;
    } else if (values.footerLinkName3.trim() == "") {
        errors.footerLinkName3 = messages.required;
    } else if (values.footerLinkName3.length < 2 ) {
        errors.footerLinkName3 = messages.required
    } else if (values.footerLinkName3.length < 2 ) {
        errors.footerLinkName3 = messages.required
    } else if (values.footerLinkName3.length > 26 ) {
        errors.footerLinkName3 = messages.exceedLimit
    }

    if (!values.footerLinkName4) {
        errors.footerLinkName4 = messages.required;
    } else if (values.footerLinkName4.trim() == "") {
        errors.footerLinkName4 = messages.required;
    } else if (values.footerLinkName4.length < 2 ) {
        errors.footerLinkName4 = messages.required
    }  else if (values.footerLinkName4.length > 26 ) {
        errors.footerLinkName4 = messages.exceedLimit
    }

    if (!values.footerLinkTitle) {
        errors.footerLinkTitle = messages.required;
    } else if (values.footerLinkTitle.trim() == "") {
        errors.footerLinkTitle = messages.required;
    } else if (values.footerLinkTitle.length < 2 ) {
        errors.footerLinkTitle = messages.required
    } else if (values.footerLinkTitle.length > 16 ) {
        errors.footerLinkTitle = messages.exceedLimit
    }

    if (!values.footerBottom) {
        errors.footerBottom = messages.required;
    } else if (values.footerBottom.trim() == "") {
        errors.footerBottom = messages.required;
    } else if (values.footerBottom.length < 2 ) {
        errors.footerBottom = messages.required
    }

    if (!values.footerLink1) {
        errors.footerLink1 = messages.required
    } else if (values.footerLink1.trim() == '') {
        errors.footerLink1 = messages.required
    } else if (values.footerLink1) {
        if (!/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i.test(values.footerLink1)) {
            errors.footerLink1 = messages.validUrl;
        }
    }

    if (!values.footerLink2) {
        errors.footerLink2 = messages.required
    } else if (values.footerLink2.trim() == '') {
        errors.footerLink2 = messages.required
    } else if (values.footerLink2) {
        if (!/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i.test(values.footerLink2)) {
            errors.footerLink2 = messages.validUrl;
        }
    }

    if (!values.footerLink3) {
        errors.footerLink3 = messages.required
    } else if (values.footerLink3.trim() == '') {
        errors.footerLink3 = messages.required
    } else if (values.footerLink3) {
        if (!/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i.test(values.footerLink3)) {
            errors.footerLink3 = messages.validUrl;
        }
    }

    if (!values.footerLink4) {
        errors.footerLink4 = messages.required
    } else if (values.footerLink4.trim() == '') {
        errors.footerLink4 = messages.required
    } else if (values.footerLink4) {
        if (!/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i.test(values.footerLink4)) {
            errors.footerLink4 = messages.validUrl;
        }
    }


    return errors;
};

export default validate;