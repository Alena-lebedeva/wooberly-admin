import ContentPageDetails from '../../../models/ContentPageDetails';
import ContentPageDetailsType from '../../../types/siteadmin/ContentPageDetailsType';
import { TempImages } from '../../../models';

import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';

const addContentPageDetails = {

    type: ContentPageDetailsType,

    args: {
        id: { type: IntType },
        metaTitle: { type: StringType },
        metaDescription: { type: StringType },
        pageUrl: { type: StringType },
        pageTitle: { type: StringType },
        content: { type: StringType },
        pageBanner: { type: StringType }
    },
    async resolve({ request }, {
        id,
        metaTitle,
        metaDescription,
        pageUrl,
        pageTitle,
        content,
        pageBanner
    }) {

        if (request.user && request.user.admin == true) {
            const checkUrl = await ContentPageDetails.findOne({
                where: {
                    pageUrl,
                    id: {
                        $ne: id
                    },

                }
            });

            if (checkUrl) {
                return {
                    status: 'URL exist'
                }
            }
            else {
                await TempImages.update({
                    fileName: null
                }, {
                    where: {
                        tableName: 'ContentPage',
                        fieldName: 'pageBanner'
                    }
                });

                const CreatePage = await ContentPageDetails.create({
                    metaTitle,
                    metaDescription,
                    pageUrl,
                    pageTitle,
                    content,
                    pageBanner: pageBanner
                });
                return {
                    status: 'success'
                }
            }
        } else {
            return {
                status: 'failed'
            }
        }
    }
};
export default addContentPageDetails;