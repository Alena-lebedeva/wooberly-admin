import { Location } from '../../../models';

import LocationListType from '../../../types/siteadmin/LocationListType';

const getAllLocation = {
    type: LocationListType,

    async resolve({ request }) {
        if (request.user && request.user.admin) {
            let LocationData, totalCount;

            LocationData = await Location.findAll({
                order: [['id', 'DESC']],
            });

            totalCount = await Location.count();

            return await {
                LocationData,
                count: totalCount
            }
        }
        
    }
}

export default getAllLocation;

// GraphQL

/* 

query {
    getAllLocation {
        count
        LocationData {
            id
            locationName
        }
    }
}

*/
