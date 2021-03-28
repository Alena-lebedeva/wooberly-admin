import messages from '../../../locale/messages'

const validate = values => {

  const errors = {}

  if (!values.siteName) {
    errors.siteName = messages.required;
  } else if (values.siteName.trim() == "") {
    errors.siteName = messages.required;
  }

  if (!values.siteTitle) {
    errors.siteTitle = messages.required;
  } else if (values.siteTitle.trim() == "") {
    errors.siteTitle = messages.required
  }

  if (!values.logoHeight) {
    errors.logoHeight = messages.required
  } else if (values.logoHeight.toString().trim() == "") {
    errors.logoHeight = messages.required
  } else if (values.logoHeight) {
    if (isNaN(values.logoHeight)) {
      errors.logoHeight = messages.numericValue;
    }
  }

  if (!values.logoWidth) {
    errors.logoWidth = messages.required
  } else if (values.logoWidth.toString().trim() == "") {
    errors.logoWidth = messages.required
  } else if (values.logoWidth) {
    if (isNaN(values.logoWidth)) {
      errors.logoWidth = messages.numericValue;
    }
  }


  if (!values.metaDescription) {
    errors.metaDescription = messages.required
  } else if (values.metaDescription.trim() == '') {
    errors.metaDescription = messages.required
  } else if (values.metaDescription && values.metaDescription.length > 255) {
    errors.metaDescription = messages.metaDescription
  }

  if (!values.metaKeyword) {
    errors.metaKeyword = messages.required
  } else if (values.metaKeyword.trim() == '') {
    errors.metaKeyword = messages.required
  } else if (values.metaKeyword && values.metaKeyword.length > 255) {
    errors.metaKeyword = messages.metaKeyword
  }

  if (!values.twitterLink) {
    errors.twitterLink = messages.required
  } else if (values.twitterLink.trim() == '') {
    errors.twitterLink = messages.required
  } else if (values.twitterLink) {
    if (!/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i.test(values.twitterLink)) {
      errors.twitterLink = messages.validUrl;
    }
  }

  if (!values.youtubeLink) {
    errors.youtubeLink = messages.required
  } else if (values.youtubeLink.trim() == '') {
    errors.youtubeLink = messages.required
  } else if (values.youtubeLink) {
    if (!/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i.test(values.youtubeLink)) {
      errors.youtubeLink = messages.validUrl;
    }
  }

  if (!values.instagramLink) {
    errors.instagramLink = messages.required
  } else if (values.instagramLink.trim() == '') {
    errors.instagramLink = messages.required
  } else if (values.instagramLink) {
    if (!/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i.test(values.instagramLink)) {
      errors.instagramLink = messages.validUrl;
    }
  }

  if (!values.facebookLink) {
    errors.facebookLink = messages.required
  } else if (values.facebookLink.trim() == '') {
    errors.facebookLink = messages.required
  } else if (values.facebookLink) {
    if (!/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i.test(values.facebookLink)) {
      errors.facebookLink = messages.validUrl;
    }
  }

  if (!values.riderAndroidVersion) {
    errors.riderAndroidVersion = messages.required;
  } else if (values.riderAndroidVersion && values.riderAndroidVersion.toString().trim() === '') {
    errors.riderAndroidVersion = messages.required;
  } else if (values.riderAndroidVersion && !/^\d+(\.\d+){0,2}$/i.test(values.riderAndroidVersion)) {
    errors.riderAndroidVersion = messages.invalidVersionNumber;
  } 

  if (!values.riderIosVersion) {
    errors.riderIosVersion = messages.required
  } else if (values.riderIosVersion.trim() == '') {
    errors.riderIosVersion = messages.required
  }  else if (values.riderIosVersion && !/^\d+(\.\d+){0,2}$/i.test(values.riderIosVersion)) {
    errors.riderIosVersion = messages.invalidVersionNumber;
  } 
  if (!values.driverAndroidVersion) {
    errors.driverAndroidVersion = messages.required
  } else if (values.driverAndroidVersion.trim() == '') {
    errors.driverAndroidVersion = messages.required
  } else if (values.driverAndroidVersion && !/^\d+(\.\d+){0,2}$/i.test(values.driverAndroidVersion)) {
    errors.driverAndroidVersion = messages.invalidVersionNumber;
  } 
  if (!values.driverIosVersion) {
    errors.driverIosVersion = messages.required
  } else if (values.driverIosVersion.trim() == '') {
    errors.driverIosVersion = messages.required
  }else if (values.driverIosVersion && !/^\d+(\.\d+){0,2}$/i.test(values.driverIosVersion)) {
    errors.driverIosVersion = messages.invalidVersionNumber;
  }
  
  

  return errors
}

export default validate;
