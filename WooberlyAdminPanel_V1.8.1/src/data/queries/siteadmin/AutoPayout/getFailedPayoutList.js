import { FailedTransactionHistory } from '../../../models';

import {
    GraphQLInt as IntType,
    GraphQLString as StringType
} from 'graphql';

import sequelize from '../../../sequelize';

import FailedTransactionListType from '../../../types/siteadmin/FailedTransactionListType';


const getFailedPayoutList = {
    type: FailedTransactionListType,

    args: {
        currentPage: { type: IntType },
        searchList: { type: StringType }
    },

    async resolve({ request }, { currentPage, searchList }) {
       
        if (request.user && request.user.admin) {
            let limit = 10;
            let offset = 0;
            let bookingData, bookingCountLength, keywordFilter;
            if (currentPage) {
                offset = (currentPage - 1) * limit
                keywordFilter = [
                    { id: {
                        or: [
                        {in: [sequelize.literal(`SELECT id FROM FailedTransactionHistory WHERE id like '%${searchList}%'`)]},
                        {in: [sequelize.literal(`SELECT id FROM FailedTransactionHistory WHERE reason like '%${searchList}%'`)]},
                        {in: [sequelize.literal(`SELECT id FROM FailedTransactionHistory WHERE amount like '%${searchList}%'`)]},
                        ]
                    }},
                    { riderId: { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${searchList}%'`)] } }
                ];

                if(searchList && searchList !=''){

                    bookingData = await FailedTransactionHistory.findAll({
                        limit,
                        offset,
                        where: {
                            or: keywordFilter
                            
                        },
                        order: [['id', 'DESC']],
                    });
                    bookingCountLength = await FailedTransactionHistory.count({
                        where: {
                            or: keywordFilter
                        }
                    });

                }else{
                    bookingData = await FailedTransactionHistory.findAll({
                        limit,
                        offset,
                        order: [['id', 'DESC']],
                    });
                    bookingCountLength = await FailedTransactionHistory.count({
                        
                    });

                }

                return {
                    bookingData,
                    count: bookingCountLength
                }
            }

        }
        
    }
}

export default getFailedPayoutList;

//GraphQL

// query{
//     getFailedPayoutList{
//      riderLocation
//       pickUpLocation
//       dropOffLocation
//       tripStatus
//       baseFare
//     }
// }
