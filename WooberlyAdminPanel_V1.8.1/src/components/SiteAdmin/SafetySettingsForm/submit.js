import updateHomepageSettingsSafety from '../../../actions/siteadmin/updateHomepageSettingsSafety'

async function submit(values, dispatch) {
    await dispatch(updateHomepageSettingsSafety(values))
}

export default submit;