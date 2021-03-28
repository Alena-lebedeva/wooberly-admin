import messages from '../../../locale/messages';

const validate = values => {
    const errors = {};

    if (!values.aboutGridTitle1) {
        errors.aboutGridTitle1 = messages.required;
    } else if (values.aboutGridTitle1.trim() == "") {
        errors.aboutGridTitle1 = messages.required;
    } else if (values.aboutGridTitle1.length < 2 ) {
        errors.aboutGridTitle1 = messages.required
    } else if (values.aboutGridTitle1.length > 16 ) {
        errors.aboutGridTitle1 = messages.exceedLimit
    } 

    if (!values.aboutGridContent1) {
        errors.aboutGridContent1 = messages.required;
    } else if (values.aboutGridContent1.trim() == "") {
        errors.aboutGridContent1 = messages.required;
    } else if (values.aboutGridContent1.length < 2 ) {
        errors.aboutGridContent1 = messages.required
    } else if (values.aboutGridContent1.length > 120 ) {
        errors.aboutGridContent1 = messages.exceedLimit
    }

    
    if (!values.aboutGridTitle2) {
        errors.aboutGridTitle2 = messages.required;
    } else if (values.aboutGridTitle2.trim() == "") {
        errors.aboutGridTitle2 = messages.required;
    } else if (values.aboutGridTitle2.length < 2 ) {
        errors.aboutGridTitle2 = messages.required
    } else if (values.aboutGridTitle2.length > 16 ) {
        errors.aboutGridTitle2 = messages.exceedLimit
    }

    if (!values.aboutGridContent2) {
        errors.aboutGridContent2 = messages.required;
    } else if (values.aboutGridContent2.trim() == "") {
        errors.aboutGridContent2 = messages.required;
    } else if (values.aboutGridContent2.length < 2 ) {
        errors.aboutGridContent2 = messages.required
    } else if (values.aboutGridContent2.length > 120 ) {
        errors.aboutGridContent2 = messages.exceedLimit
    }

    
    if (!values.aboutGridTitle3) {
        errors.aboutGridTitle3 = messages.required;
    } else if (values.aboutGridTitle3.trim() == "") {
        errors.aboutGridTitle3 = messages.required;
    } else if (values.aboutGridTitle3.length < 2 ) {
        errors.aboutGridTitle3 = messages.required
    } else if (values.aboutGridTitle3.length > 16 ) {
        errors.aboutGridTitle3 = messages.exceedLimit
    }

    if (!values.aboutGridContent3) {
        errors.aboutGridContent3 = messages.required;
    } else if (values.aboutGridContent3.trim() == "") {
        errors.aboutGridContent3 = messages.required;
    } else if (values.aboutGridContent3.length < 2 ) {
        errors.aboutGridContent3 = messages.required
    } else if (values.aboutGridContent3.length > 120 ) {
        errors.aboutGridContent3 = messages.exceedLimit
    }

    
    if (!values.aboutGridTitle4) {
        errors.aboutGridTitle4 = messages.required;
    } else if (values.aboutGridTitle4.trim() == "") {
        errors.aboutGridTitle4 = messages.required;
    } else if (values.aboutGridTitle4.length < 2 ) {
        errors.aboutGridTitle4 = messages.required
    } else if (values.aboutGridTitle4.length > 16 ) {
        errors.aboutGridTitle4 = messages.exceedLimit
    }

    if (!values.aboutGridContent4) {
        errors.aboutGridContent4 = messages.required;
    } else if (values.aboutGridContent4.trim() == "") {
        errors.aboutGridContent4 = messages.required;
    } else if (values.aboutGridContent4.length < 2 ) {
        errors.aboutGridContent4 = messages.required
    } else if (values.aboutGridContent4.length > 120 ) {
        errors.aboutGridContent4 = messages.exceedLimit
    }

    
    if (!values.aboutGridTitle5) {
        errors.aboutGridTitle5 = messages.required;
    } else if (values.aboutGridTitle5.trim() == "") {
        errors.aboutGridTitle5 = messages.required;
    } else if (values.aboutGridTitle5.length < 2 ) {
        errors.aboutGridTitle5 = messages.required
    } else if (values.aboutGridTitle5.length > 16 ) {
        errors.aboutGridTitle5 = messages.exceedLimit
    }

    if (!values.aboutGridContent5) {
        errors.aboutGridContent5 = messages.required;
    } else if (values.aboutGridContent5.trim() == "") {
        errors.aboutGridContent5 = messages.required;
    } else if (values.aboutGridContent5.length < 2 ) {
        errors.aboutGridContent5 = messages.required
    } else if (values.aboutGridContent5.length > 120 ) {
        errors.aboutGridContent5 = messages.exceedLimit
    }

    
    if (!values.aboutGridTitle6) {
        errors.aboutGridTitle6 = messages.required;
    } else if (values.aboutGridTitle6.trim() == "") {
        errors.aboutGridTitle6 = messages.required;
    } else if (values.aboutGridTitle6.length < 2 ) {
        errors.aboutGridTitle6 = messages.required
    } else if (values.aboutGridTitle6.length > 16 ) {
        errors.aboutGridTitle6 = messages.exceedLimit
    }

    if (!values.aboutGridContent6) {
        errors.aboutGridContent6 = messages.required;
    } else if (values.aboutGridContent6.trim() == "") {
        errors.aboutGridContent6 = messages.required;
    } else if (values.aboutGridContent6.length < 2 ) {
        errors.aboutGridContent6 = messages.required
    } else if (values.aboutGridContent6.length > 120 ) {
        errors.aboutGridContent6 = messages.exceedLimit
    }

    

    return errors;
};

export default validate;