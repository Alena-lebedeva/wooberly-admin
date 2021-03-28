import  ContentPageDetails  from '../../../models/ContentPageDetails';
import ContentPageDetailsType from '../../../types/siteadmin/ContentPageDetailsType';

import {
    GraphQLNonNull as NonNull,
    GraphQLInt as IntType,
} from 'graphql';

const deleteContentPage = {

    type: ContentPageDetailsType,

    args: {
        id: { type: new NonNull(IntType) }
    },

    async resolve({ request, response }, {
        id
    }) {
        if (request.user.admin) {
            const contentPage = await ContentPageDetails.findById(id);
            if (!contentPage) {
                return {
                    status: '404'
                }
            }

            const deletePage = await ContentPageDetails.destroy({
                where: {
                    id: id
                }
            });

            if (deletePage) {
                return {
                    status: '200'
                }
            } else {
                return {
                    status: '400'
                }
            }

        } else {
            return {
                status: 'notLoggedIn'
            }
        }
    }
}

export default deleteContentPage;