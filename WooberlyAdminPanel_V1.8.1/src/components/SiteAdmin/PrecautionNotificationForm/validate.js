import messages from '../../../locale/messages'

const validate = values => {

  let errors = {};

  let description = values && values.description && values.description.replace('<p>', '').replace('</p>', '')

  if (!values.description || description.trim() === "" || values.description === '<p><br></p>') {
    errors.description = messages.required;
  }

  if (!values.title || values.title.trim() === "") {
    errors.title = messages.required;
  }

  if (!values.isEnabled) {
    errors.isEnabled = messages.required;
  }

  return errors
}

export default validate;