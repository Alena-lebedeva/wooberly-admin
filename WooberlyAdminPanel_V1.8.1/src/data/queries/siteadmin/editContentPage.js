import {
   GraphQLInt as IntType,
   GraphQLNonNull as NonNull
} from 'graphql';

import { ContentPageDetails } from '../../models';
import ContentPageDetailsType from '../../types/siteadmin/ContentPageDetailsType';

const getContentPage = {
    type: ContentPageDetailsType,

    args: {
        id: { type: new NonNull(IntType) }
    },

    async resolve({ request }, { id }) {
        const getPage = await ContentPageDetails.find({
            where: {
                id: id
            }
        });
        return getPage;
    }
}

export default getContentPage;