import { CancelReason } from '../../models';

import CancelReasonType from '../../types/siteadmin/CancelReasonType';

import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';

const updateCancelReason = {

    type: CancelReasonType,

    args: {
        id: { type: IntType },
        userType: { type: IntType },
        reason: { type: StringType },
        isActive: { type: BooleanType }
    },

    async resolve({ request }, { id, userType, reason, isActive }) {
             
        const updateCancelReason = await CancelReason.update({
            userType,
            reason,
            isActive
        }, 
        {
            where: {
                id
            }
        });

        if (updateCancelReason) {
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

export default updateCancelReason;

/*
        
mutation(
    $id: Int, 
    $userType: Int, 
    $reason: String, 
    isActive: Boolean
    ) {
    updateCancelReason(
        id: $id, 
        userType: $userType, 
        reason: $reason, 
        isActive: $isActive
        ) {
        status
    }
}

*/
