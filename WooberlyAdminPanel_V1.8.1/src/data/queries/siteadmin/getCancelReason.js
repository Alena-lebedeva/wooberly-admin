import { CancelReason } from '../../models';
import CancelReasonWholeType from '../../types/siteadmin/CancelReasonWholeType';

import {
    GraphQLInt as IntType,
    GraphQLString as StringType
} from 'graphql'

const getAllCancelReason = {

    type: CancelReasonWholeType,

    args: {
        id: { type: IntType }
      },

    async resolve({ request }, { id }) {

        if (request.user && request.user.admin) {


            const result = await CancelReason.find({
                where: {
                    id
                },
                raw: true
            })
            
            return {
                result: [result]
            }
        }
        
    }
}

export default getAllCancelReason;

/*
query ($id: Int) {
  getCancelReason(id:$id) {
    result {
      id
      reason
      userType
      isActive
    }
  }
}
*/