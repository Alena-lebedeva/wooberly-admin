import {
    GraphQLString as StringType
} from 'graphql';

import { ContentPageDetails } from '../../models';
import ContentPageDetailsType from '../../types/siteadmin/ContentPageDetailsType';

const getContentPage = {
    type: ContentPageDetailsType,

    args: {
        pageUrl: { type: StringType }
    },

    async resolve({ request }, { pageUrl }) {
        const getPage = await ContentPageDetails.find({
            where: {
                pageUrl: pageUrl,
                isEnable: true
            }
        });
        return getPage;
    }
}

export default getContentPage;