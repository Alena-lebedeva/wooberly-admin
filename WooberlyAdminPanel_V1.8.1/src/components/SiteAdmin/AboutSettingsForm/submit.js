import updateHomepageSettingsAbout from '../../../actions/siteadmin/updateHomepageSettingsAbout'

async function submit(values, dispatch) {
    await dispatch(updateHomepageSettingsAbout(values))
}

export default submit;