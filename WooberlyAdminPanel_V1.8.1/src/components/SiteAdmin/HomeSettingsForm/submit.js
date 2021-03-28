import updateHomepageSettingsHome from '../../../actions/siteadmin/updateHomepageSettingsHome'

async function submit(values, dispatch) {
    await dispatch(updateHomepageSettingsHome(values))
}

export default submit;