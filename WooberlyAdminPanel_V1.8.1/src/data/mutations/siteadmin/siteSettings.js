import SiteSettingsType from '../../types/siteadmin/SiteSettingsType';
import { SiteSettings } from '../../../data/models';

import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';

const addSiteSettings = {

    type: SiteSettingsType,

    args: {},

    async resolve({ request }, {}) {

        // if (request.user && request.user.admin == true) {
            let isSiteSettingsUpdated = true;

            let addSettings =[
                {"name": "siteName","value": "", "title": "Site Name"},
                {"name": "logoHeight","value": "", "title": "Logo Height"},
                {"name": "logoWidth","value": "", "title": "Logo Width"},
                {"name": "siteTitle","value": "", "title": "Site Title"},
                {"name": "metaDescription","value": "", "title": "Meta Description"},
                {"name": "facebookLink","value": "", "title": "Facebook Link"},
                {"name": "twitterLink","value": "", "title": "Twitter Link"},
                {"name": "youtubeLink","value": "", "title": "Youtube Link"},
                {"name": "instagramLink","value": "", "title": "Instagram Link"},
                {"name": "metaKeyword","value": "", "title": "Meta Keyword"},
                {"name": "homeLogo","value": "", "title": "Home Logo"}];
        
            let insert = await SiteSettings.bulkCreate(addSettings);

            if (isSiteSettingsUpdated) {
                return {
                    status: 200
                }
            } else {
                return {
                    status: 400
                }
            }

    },
};

export default addSiteSettings;
/*
mutation siteSettings {
  siteSettings {
    status
  }
}
*/