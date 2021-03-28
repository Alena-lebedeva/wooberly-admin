import { CancelReason } from '../../models';

import CancelReasonType from '../../types/siteadmin/CancelReasonType';

import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';

const addCancelReason = {

    type: CancelReasonType,

    args: {
        userType: { type: IntType },
        reason: { type: StringType },
        isActive: { type: BooleanType }
    },

    async resolve({ request }, { userType, reason, isActive }) {
             
        const addCancelReason = await CancelReason.create({
            userType,
            reason,
            isActive
        });

        return {
            status: 200
        };
        
    },
};

export default addCancelReason;

/*
        
mutation($userType: Int, $reason: String, isActive: Boolean) {
    addCancelReason(userType: $userType, reason: $reason, isActive: $isActive) {
        status
    }
}

*/
