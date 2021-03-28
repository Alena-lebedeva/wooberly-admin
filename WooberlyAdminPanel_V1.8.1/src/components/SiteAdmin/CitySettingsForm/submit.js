import updateHomepageSettingsCity from '../../../actions/siteadmin/updateHomepageSettingsCity'

async function submit(values, dispatch) {
    await dispatch(updateHomepageSettingsCity(values))
}

export default submit;