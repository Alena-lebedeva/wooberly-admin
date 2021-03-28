import messages from '../../../../locale/messages'

const validate = values => {

    const errors = {}
  
    if (!values.metaTitle) {
      errors.metaTitle = messages.required.defaultMessage;
    } else if (values.metaTitle.trim() == "") {
        errors.metaTitle = messages.required.defaultMessage;
    }
  
    if (!values.metaDescription) {
      errors.metaDescription = messages.required.defaultMessage;
    } else if (values.metaDescription.trim() == "") {
        errors.metaDescription = messages.required.defaultMessage;
    }
  
    if (!values.pageUrl) {
      errors.pageUrl = messages.required.defaultMessage;
    } else if (values.pageUrl.trim() == "") {
        errors.pageUrl = messages.required.defaultMessage;
    }
    else {
      var slashCount = (values.pageUrl.match(/\//g) || []).length;
      var questionCount = (values.pageUrl.match(/\?/g) || []).length;
      var andCount = (values.pageUrl.match(/\&/g) || []).length;
      if (slashCount >= 1 || questionCount >= 1 || andCount >= 1) {
        errors.pageUrl = messages.invalidUrl.defaultMessage;
      }
    }
  
    if (!values.pageTitle) {
      errors.pageTitle = messages.required.defaultMessage;
    } else if (values.pageTitle.trim() == "") {
        errors.pageTitle = messages.required.defaultMessage;
    }
  
    if (!values.content) {
      errors.content = messages.required.defaultMessage;
    } else if (values.content.trim() == "") {
        errors.content = messages.required.defaultMessage;
    }
  
    return errors;
  }
  
  export default validate;
  