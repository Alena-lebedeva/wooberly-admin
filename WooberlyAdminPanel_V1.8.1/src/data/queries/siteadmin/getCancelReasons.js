import { Booking } from '../../models';

import {
    GraphQLInt as IntType,
    GraphQLString as StringType
} from 'graphql';

import { BookingCancelReason } from '../../models';

import sequelize from '../../sequelize';

import CancelReasonWholeType from '../../types/siteadmin/CancelReasonWholeType';


const getCancelReasons = {
    type: CancelReasonWholeType,

    args: {
        currentPage: { type: IntType },
        searchList: { type: StringType }
    },

    async resolve({ request }, { currentPage, searchList }) {

        if (request.user && request.user.admin) {
            let limit = 10;
            let offset = 0;
            let reasonData, reasonCountLength, keywordFilter;
            if (currentPage) {
                offset = (currentPage - 1) * limit
                keywordFilter = [
                    {
                        bookingId: {
                            or: [
                                { in: [sequelize.literal(`SELECT id FROM Booking WHERE pickUpLocation like '%${searchList}%'`)] },
                                { in: [sequelize.literal(`SELECT id FROM Booking WHERE dropOffLocation like '%${searchList}%'`)] },
                                { in: [sequelize.literal(`SELECT id FROM Booking WHERE id like '%${searchList}%'`)] },
                                { in: [sequelize.literal(`SELECT id FROM Booking WHERE tripStart like '%${searchList}%'`)] },
                                { in: [sequelize.literal(`SELECT id FROM Booking WHERE vehicleNumber like '%${searchList}%'`)] },
                            ]
                        }
                    },
                    { riderId: { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${searchList}%'`)] } },
                    { driverId: { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${searchList}%'`)] } },
                    { reason: { in: [sequelize.literal(`SELECT reason FROM BookingCancelReason WHERE reason like '%${searchList}%'`)] } },
                    { cancelStatus: { in: [sequelize.literal(`SELECT cancelStatus FROM BookingCancelReason WHERE cancelStatus like '%${searchList}%'`)] } }
                ];

                if (searchList && searchList != '') {

                    reasonData = await BookingCancelReason.findAll({
                        limit,
                        offset,
                        where: {
                            or: keywordFilter
                        },
                        order: [['id', 'DESC']],
                    });
                    reasonCountLength = await BookingCancelReason.count({
                        where: {
                            or: keywordFilter
                        }
                    });

                } else {
                    reasonData = await BookingCancelReason.findAll({
                        limit,
                        offset,
                        order: [['id', 'DESC']],
                    });
                    reasonCountLength = await BookingCancelReason.count({});
                }

                return {
                    reasonData,
                    count: reasonCountLength
                }
            }

        }

    }
}

export default getCancelReasons;

//GraphQL

// query{
//     getCancelledBookings{
//      riderLocation
//       pickUpLocation
//       dropOffLocation
//       tripStatus
//       baseFare
//     }
// }
