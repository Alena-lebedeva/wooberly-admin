import SiteSettingsType from '../../types/siteadmin/SiteSettingsType';
import { SiteSettings } from '../../models';
import {
    GraphQLList as List
} from 'graphql'

const getSiteSettings = {

    type: new List(SiteSettingsType),

    async resolve({ request }) {
        let SiteSettingsData = await SiteSettings.findAll({
            attributes: [
                'id',
                'title',
                'name',
                'value',
                'type'
            ]
        })
        
        return SiteSettingsData
    }
};

export default getSiteSettings;