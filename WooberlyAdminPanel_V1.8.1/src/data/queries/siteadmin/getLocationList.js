import { Location } from '../../models';

import {
    GraphQLInt as IntType,
    GraphQLString as StringType
} from 'graphql';

import sequelize from '../../sequelize';

import LocationListType from '../../types/siteadmin/LocationListType';


const getLocationList = {
    type: LocationListType,

    args: {
        currentPage: { type: IntType },
        searchList: { type: StringType }
    },

    async resolve({ request }, { currentPage, searchList }) {
       
        if (request.user && request.user.admin) {
            let limit = 10;
            let offset = 0;
            let LocationData, keywordFilter, totalCount;
            if (currentPage) {
                offset = (currentPage - 1) * limit
               

                keywordFilter = [
                    { id: {
                        or: [
                        {in: [sequelize.literal(`SELECT id FROM Location WHERE locationName like '%${searchList}%'`)]},
                        {in: [sequelize.literal(`SELECT id FROM Location WHERE description like '%${searchList}%'`)]},
                        {in: [sequelize.literal(`SELECT id FROM Location WHERE isActive like '%${searchList}%'`)]},
                        ]
                    }}
                ]

                if(searchList && searchList !=''){

                    LocationData = await Location.findAll({
                        limit,
                        offset,
                        order: [['id', 'DESC']],
                        where: {
                            or: keywordFilter,
                        },
                        raw: true
                    });
                    totalCount = await Location.count({
                        where: {
                            or: keywordFilter,
                        },
                    });

                }else{

                    LocationData = await Location.findAll({
                        limit,
                        offset,
                        order: [['id', 'DESC']],
                        raw: true
                    });
                    totalCount = await Location.count({
                    });

                }

                return {
                    LocationData,
                    count: totalCount
                }
            }

        }
        
    }
}

export default getLocationList;

//GraphQL

// query{
//     getLocationList{
//      riderLocation
//       pickUpLocation
//       dropOffLocation
//       tripStatus
//       baseFare
//     }
// }
