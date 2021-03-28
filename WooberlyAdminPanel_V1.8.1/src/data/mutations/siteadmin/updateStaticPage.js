import StaticPageType from '../../types/siteadmin/StaticPageType';
import { StaticPage, TempImages } from '../../models';

import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
} from 'graphql';

const updateStaticPage = {

    type: StaticPageType,

    args: {
        id: { type: IntType },
        content: { type: StringType },
        metaTitle: { type: StringType },
        metaDescription: { type: StringType },
        pageBanner: { type: StringType }
    },

    async resolve({ request }, {
        id,
        content,
        metaTitle,
        metaDescription,
        pageBanner
    }) {
        if (request.user && request.user.admin == true) {

            await TempImages.update({
                fileName: null
            }, {
                where: {
                    tableName: 'StaticPage',
                    fieldName: 'staticPage'
                }
            });

            const update = await StaticPage.update({
                content,
                metaTitle,
                metaDescription,
                pageBanner
            }, {
                where: {
                    id: id
                }
            });

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

export default updateStaticPage;
