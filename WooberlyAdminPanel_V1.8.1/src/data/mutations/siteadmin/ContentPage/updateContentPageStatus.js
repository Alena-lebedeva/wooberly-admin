import  ContentPageDetails  from '../../../models/ContentPageDetails';
import ContentPageDetailsType from '../../../types/siteadmin/ContentPageDetailsType';

import {
    GraphQLBoolean as BooleanType,
    GraphQLInt as IntType,
} from 'graphql';

const updateContentPageStatus = {
    type: ContentPageDetailsType,
    args: {
        id: { type: IntType },
        isEnable: { type: BooleanType },
    },
    async resolve({ request }, {
        id,
        isEnable,
    }) {

        if (request.user && request.user.admin == true) {
            const Update = await ContentPageDetails.update({
                isEnable: !isEnable,
            }, {
                    where: {
                        id: id
                    }
                });
            return {
                status: 'success'
            }
        } else {
            return {
                status: 'failed'
            }
        }
    },
};
export default updateContentPageStatus;
