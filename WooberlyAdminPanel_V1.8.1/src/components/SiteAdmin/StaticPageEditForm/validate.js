import messages from '../../../locale/messages'

const validate = values => {

    const errors = {}
    let content = values && values.content && values.content.replace('<p>', '').replace('</p>', '')
    if (!values.content) {
      errors.content = messages.required;
    } else if (content.trim() == "") {
      errors.content = messages.required
    }
  
    if (!values.metaTitle) {
      errors.metaTitle = messages.required;
    } else if (values.metaTitle.trim() == "") {
      errors.metaTitle = messages.required
    }
  
    if (!values.metaDescription) {
      errors.metaDescription = messages.required;
    } else if (values.metaDescription.trim() == "") {
      errors.metaDescription = messages.required
    }
  
    return errors
  }
  
  export default validate
  