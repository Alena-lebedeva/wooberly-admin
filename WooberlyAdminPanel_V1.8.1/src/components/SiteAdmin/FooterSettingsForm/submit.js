import updateHomepageSettingsFooter from '../../../actions/siteadmin/updateHomepageSettingsFooter'

async function submit(values, dispatch) {
    await dispatch(updateHomepageSettingsFooter(values))
}

export default submit;