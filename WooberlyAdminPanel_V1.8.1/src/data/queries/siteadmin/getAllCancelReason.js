import { CancelReason } from '../../models';
import CancelReasonWholeType from '../../types/siteadmin/CancelReasonWholeType';

import {
    GraphQLInt as IntType,
    GraphQLString as StringType
} from 'graphql'

import sequelize from '../../sequelize';

const getAllCancelReason = {

    type: CancelReasonWholeType,

    args: {
        currentPage: { type: IntType },
        searchList: { type: StringType }
      },

    async resolve({ request }, { currentPage, searchList }) {

        if (request.user && request.user.admin) {

            let limit = 10;
            let offset = 0;
            let keywordFilter;
            
            if(currentPage) {
                offset = (currentPage - 1) * limit;
            }

            keywordFilter = [{
                id: {
                    or: [
                        { in: [sequelize.literal(`SELECT id FROM CancelReason where id like '%${searchList}%'`)] },
                        { in: [sequelize.literal(`SELECT id FROM CancelReason where reason like '%${searchList}%'`)] },
                    ]
                }
            }]

            const result = await CancelReason.findAll({
                limit,
                offset,
                where: {
                    and: keywordFilter
                },
                order: [['createdAt', 'DESC']]
            })

            const count = await CancelReason.count({
                where: {
                    and: keywordFilter
                }
            })
            
            return {
                result,
                count
            }
        }
        
    }
}

export default getAllCancelReason;

/*
query getAllCancelReason ($searchList: String $currentPage: Int) {
  getAllCancelReason(searchList: $searchList currentPage: $currentPage) {
    count
    result{
      id
    }
    status
  }
}
*/