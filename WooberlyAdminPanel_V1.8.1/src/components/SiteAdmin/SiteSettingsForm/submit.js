import updateSiteSettings from '../../../actions/siteadmin/updateSiteSettings'
import { siteSettings } from '../../../actions/siteadmin/siteSettings'

async function submit(values, dispatch) {
    await dispatch(
        updateSiteSettings(
            values.siteName,
            values.siteTitle,
            values.metaDescription,
            values.facebookLink,
            values.twitterLink,
            values.instagramLink,
            values.logoHeight,
            values.logoWidth,
            values.metaKeyword,
            values.homeLogo,
            values.youtubeLink,
            values.appForceUpdate,
            values.riderAndroidVersion, 
            values.riderIosVersion, 
            values.driverAndroidVersion,
            values.driverIosVersion
        )
    )
    // await dispatch(siteSettings())
}

export default submit;