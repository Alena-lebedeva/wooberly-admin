import messages from '../../../../locale/messages'

const validate = values => {

    const errors = {}
  
    if (!values.metaTitle) {
      errors.metaTitle = messages.required;
    } else if (values.metaTitle.trim() == "") {
        errors.metaTitle = messages.required;
    }
  
    if (!values.metaDescription) {
      errors.metaDescription = messages.required;
    } else if (values.metaDescription.trim() == "") {
        errors.metaDescription = messages.required;
    }
  
    if (!values.pageUrl) {
      errors.pageUrl = messages.required;
    } else if (values.pageUrl.trim() == "") {
        errors.pageUrl = messages.required;
    }
    else {
      var slashCount = (values.pageUrl.match(/\//g) || []).length;
      var questionCount = (values.pageUrl.match(/\?/g) || []).length;
      var andCount = (values.pageUrl.match(/\&/g) || []).length;
      if (slashCount >= 1 || questionCount >= 1 || andCount >= 1) {
        errors.pageUrl = messages.invalidUrl;
      }
    }
  
    if (!values.pageTitle) {
      errors.pageTitle = messages.required;
    } else if (values.pageTitle.trim() == "") {
        errors.pageTitle = messages.required;
    }
  
    if (!values.content) {
      errors.content = messages.required;
    } else if (values.content.trim() == "") {
        errors.content = messages.required;
    }
  
    return errors;
  }
  
  export default validate;
  