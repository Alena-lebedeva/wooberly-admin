import { Location } from '../../models';
import LocationType from '../../types/siteadmin/LocationType';

import {
    GraphQLInt as IntType
} from 'graphql';

const getLocation = {
    type: LocationType,

    args: {
        id: { type: IntType }
    },

    async resolve({ request }, { id }) {
        if (request.user && request.user.admin) {
            return await Location.findOne({
                where: {
                    id
                }
            })
        } else {
            return {
                errorMessage: 'Please login'
            }
        }
    }
}

export default getLocation;

// GraphQL

// query getCategory($id: Int!){
//     getCategory( id: $id){
//       id
//       categoryName
//       unitPrice
//       basePrice
//       minutePrice
//       riderFeeValue
//       driverFeeValue
//       categoryImage
//       categoryMarkerImage
//         capacity
//     }
//   }