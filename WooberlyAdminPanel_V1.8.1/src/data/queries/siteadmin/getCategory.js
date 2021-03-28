import { Category } from '../../models';
import CategoryType from '../../types/siteadmin/CategoryType';

import {
    GraphQLInt as IntType
} from 'graphql';

const getCategory = {
    type: CategoryType,

    args: {
        id: { type: IntType }
    },

    async resolve({ request }, { id }) {
        if (request.user && request.user.admin) {
            return await Category.findOne({
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

export default getCategory;

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