import messages from '../../../locale/messages'

const validate = values => {

  const errors = {}

  if (!values.reason) {
    errors.reason = messages.reasonRequired;
  } else if (values.reason.trim() == "") {
    errors.reason = messages.reasonRequired
  } else if (values.reason.length > 100) {
      errors.reason = messages.exceedLimit100 
  }

  return errors
}

export default validate
