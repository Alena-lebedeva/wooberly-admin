import { CancelReason } from '../../models';

import CancelReasonType from '../../types/siteadmin/CancelReasonType';

import {
    GraphQLInt as IntType
} from 'graphql';

const removeCancelReason = {

    type: CancelReasonType,

    args: {
        id: { type: IntType }
    },

    async resolve({ request }, { id }) {
             
        const removeCancelReason = await CancelReason.destroy({
            where: {
                id
            }
        });

        if (removeCancelReason == '1') {
            return {
                status: 200
            };
        } else {
            return {
                status: 400
            }
        }
        
        
    },
};

export default removeCancelReason;

/*
        
mutation($id: Int) {
    removeCancelReason(id: $id) {
        status
    }
}

*/
