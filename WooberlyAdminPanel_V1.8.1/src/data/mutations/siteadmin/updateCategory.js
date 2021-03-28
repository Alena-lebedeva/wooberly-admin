import { Category, Pricing } from '../../models'
import CategoryType from '../../types/siteadmin/CategoryType';

import {
    GraphQLInt as IntType,
    GraphQLString as StringType,
    GraphQLID as ID,
    GraphQLFloat as FloatType,
    GraphQLBoolean as BooleanType
} from 'graphql';

const updateCategory = {
    type: CategoryType,

    args: {
        id: { type: IntType },
        categoryName: { type: StringType },
        capacity: { type: IntType },
        isActive: { type: BooleanType },
        categoryImage: { type: StringType },
        categoryMarkerImage: { type: StringType }
    },

    async resolve({ request }, { id, categoryName, capacity, isActive, categoryImage, categoryMarkerImage }) {
        if (request.user && request.user.admin) {
            if (!isActive) {
                const isFareUsed = await Pricing.findOne({
                    attributes: ['id'],
                    where: {
                        isActive: true,
                        categoryId: id
                    }
                });
    
                if (isFareUsed) {
                    return await {
                        status: 400,
                        errorMessage: "Sorry, unable to inactive. The chosen category is used on the manage fare. Please remove the fare and try again."
                    }
                }
            }

            const updateCategory = await Category.update({
                categoryName,
                capacity,
                isActive,
                categoryImage,
                categoryMarkerImage
            },
                {
                    where: {
                        id
                    }
                }
            )

            if (updateCategory) {
                return {
                    status: 200
                }
            } else {
                return {
                    errorMessage: 'Something went wrong'
                }
            }
        } else {
            return {
                errorMessage: 'Please login'
            }
        }
    }
}

export default updateCategory;

// GraphQL 

// mutation updateCategory($id: Int, $basePrice: Float, $minutePrice: Float) {
//     updateCategory(
//       id: $id
//       basePrice: $basePrice
//       minutePrice: $minutePrice
//     ){
//       status
//     }
//   }


// {
//     "id": 2,
//     "basePrice": 35,
//     "minutePrice": 10
// }