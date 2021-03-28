import UpdateSiteSettingsType from '../../types/siteadmin/UpdateSiteSettingsType';
import { SiteSettings, TempImages } from '../../../data/models';

import {
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

const updateSiteSettings = {

    type: UpdateSiteSettingsType,

    args: {
        siteName: { type: StringType },
        siteTitle: { type: StringType },
        metaDescription: { type: StringType },
        facebookLink: { type: StringType },
        twitterLink: { type: StringType },
        instagramLink: { type: StringType },
        logoHeight: { type: IntType },
        logoWidth: { type: IntType },
        metaKeyword: { type: StringType },
        homeLogo: { type: StringType },
        youtubeLink: { type: StringType },
        appForceUpdate: { type: StringType },
        riderAndroidVersion: { type: StringType },
        riderIosVersion: { type: StringType },
        driverAndroidVersion: { type: StringType },
        driverIosVersion: { type: StringType }
    },

    async resolve({ request }, {
        siteName,
        siteTitle,
        metaDescription,
        facebookLink,
        twitterLink,
        instagramLink,
        logoHeight,
        logoWidth,
        metaKeyword,
        homeLogo,
        youtubeLink,
        appForceUpdate,
        riderAndroidVersion,
        riderIosVersion,
        driverAndroidVersion,
        driverIosVersion
    }) {
        try {

            if (request.user && request.user.admin == true) {
                let siteSettingsFields = {
                    "siteName": siteName,
                    "siteTitle": siteTitle,
                    "metaDescription": metaDescription,
                    "facebookLink": facebookLink,
                    "twitterLink": twitterLink,
                    "instagramLink": instagramLink,
                    "logoHeight": logoHeight,
                    "logoWidth": logoWidth,
                    "metaKeyword": metaKeyword,
                    "homeLogo": homeLogo,
                    "youtubeLink": youtubeLink,
                    "appForceUpdate": appForceUpdate,
                    "riderAndroidVersion": riderAndroidVersion,
                    "riderIosVersion": riderIosVersion,
                    "driverAndroidVersion": driverAndroidVersion,
                    "driverIosVersion": driverIosVersion
                };

                await Promise.all([
                    Object.keys(siteSettingsFields).map(async (item) => {
                        await SiteSettings.update({ value: siteSettingsFields[item] }, { where: { name: item } })
                    })
                ])


                await TempImages.update({
                    fileName: null
                }, {
                    where: {
                        tableName: 'SiteSettings',
                        fieldName: 'siteLogo'
                    }
                })

                return {
                    status: 200
                }
            } else {
                return {
                    status: 400,
                    errorMessage: "Invalid admin user"
                }
            }

        } catch (err) {
            return {
                status: 400,
                errorMessage: "Something went wrong. Please try again"
            }
        }

    },
};


// mutation updateSiteSettings($siteName: String
// $siteTitle: String
// $metaDescription: String
// $facebookLink: String
// $twitterLink: String
// $instagramLink: String
// $logoHeight: Int
// $logoWidth: Int
// $metaKeyword: String
// $homeLogo: String
// $youtubeLink: String
// $appForceUpdate: String
// $riderAndroidVersion: String
// $riderIosVersion: String
// $driverAndroidVersion: String
// $driverIosVersion: String){
//   updateSiteSettings(
//     siteName:$siteName,
//     siteTitle:$siteTitle,
//     metaDescription:$metaDescription,
//     facebookLink:$facebookLink,
//     twitterLink:$twitterLink,
//     instagramLink:$instagramLink,
//     logoHeight:$logoHeight,
//     logoWidth:$logoWidth,
//     metaKeyword:$metaKeyword,
//     homeLogo:$homeLogo,
//     youtubeLink:$youtubeLink,
//     appForceUpdate:$appForceUpdate,
//     riderAndroidVersion:$riderAndroidVersion,
//     riderIosVersion:$riderIosVersion,
//     driverAndroidVersion:$driverAndroidVersion,
//     driverIosVersion:$driverIosVersion    
//   ){
//     status,
//     errorMessage
//   }
// }

export default updateSiteSettings;
