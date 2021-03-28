import { Booking } from '../../models';

import {
    GraphQLInt as IntType,
    GraphQLString as StringType
} from 'graphql';

import sequelize from '../../sequelize';

import BookingMannagementWholeType from '../../types/siteadmin/BookingManagementWholeType';


const getCompletedBookings = {
    type: BookingMannagementWholeType,

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
                        {in: [sequelize.literal(`SELECT id FROM Booking WHERE id like '%${searchList}%'`)]},
                        {in: [sequelize.literal(`SELECT id FROM Booking WHERE pickUpLocation like '%${searchList}%'`)]},
                        {in: [sequelize.literal(`SELECT id FROM Booking WHERE dropOffLocation like '%${searchList}%'`)]},
                        {in: [sequelize.literal(`SELECT id FROM Booking WHERE vehicleNumber like '%${searchList}%'`)]},
                        {in: [sequelize.literal(`SELECT id FROM Booking WHERE tripStatus like '%${searchList}%'`)]},
                        {in: [sequelize.literal(`SELECT id FROM Booking WHERE totalRideDistance like '%${searchList}%'`)]},
                        {in: [sequelize.literal(`SELECT id FROM Booking WHERE totalDuration like '%${searchList}%'`)]},
                        {in: [sequelize.literal(`SELECT id FROM Booking WHERE totalFare like '%${searchList}%'`)]},
                        {in: [sequelize.literal(`SELECT id FROM Booking WHERE tripStatus like '%${searchList}%'`)]},
                        {in: [sequelize.literal(`SELECT id FROM Booking WHERE tollFee like '%${searchList}%'`)]},
                        ]
                    }},
                    { riderId: { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${searchList}%'`)] } },
                    { driverId: { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${searchList}%'`)] } },
                    { vehicleType: { in: [sequelize.literal(`SELECT id FROM Category WHERE categoryName like '%${searchList}%'`)] } },
                ];

                if(searchList && searchList !=''){

                    bookingData = await Booking.findAll({
                        limit,
                        offset,
                        where: {
                            or: keywordFilter,
                            tripStatus: { eq: 'completed' }
                        },
                        order: [['id', 'DESC']],
                    });
                    bookingCountLength = await Booking.count({
                        where: {
                            or: keywordFilter,
                            tripStatus: { eq: 'completed' }
                        }
                    });

                }else{
                    bookingData = await Booking.findAll({
                        limit,
                        offset,
                        where: {
                            tripStatus: { eq: 'completed' }
                        },
                        order: [['id', 'DESC']],
                    });
                    bookingCountLength = await Booking.count({
                        where: {
                            or: keywordFilter,
                            tripStatus: { eq: 'completed' }
                        }
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

export default getCompletedBookings;

//GraphQL

// query{
//     getCompletedBookings{
//      riderLocation
//       pickUpLocation
//       dropOffLocation
//       tripStatus
//       baseFare
//     }
// }
