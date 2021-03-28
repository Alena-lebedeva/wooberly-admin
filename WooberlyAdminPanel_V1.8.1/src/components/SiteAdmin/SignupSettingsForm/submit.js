import updateHomepageSettingsSignup from '../../../actions/siteadmin/updateHomepageSettingsSignup'

async function submit(values, dispatch) {
    await dispatch(updateHomepageSettingsSignup(values))
}

export default submit;