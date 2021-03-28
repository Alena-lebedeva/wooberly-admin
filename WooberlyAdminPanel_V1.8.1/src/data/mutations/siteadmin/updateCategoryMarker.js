import { Category } from '../../models'
import CategoryType from '../../types/siteadmin/CategoryType';

import {
    GraphQLInt as IntType,
    GraphQLString as StringType,
    GraphQLID as ID,
    GraphQLFloat as FloatType
} from 'graphql';

const updateCategoryMarker = {
    type: CategoryType,

    args: {
        id: { type: IntType },
        fileName: { type: StringType }
    },

    async resolve({ request }, { id, fileName }) {
        
        if (request.user && request.user.admin) {
            
            let updateCategory = await Category.update({
                categoryMarkerImage: fileName
            },
            { where: { id } }
            );
            
            if (updateCategory) {
                return {
                    status: 200
                }
            } else {
                return {
                    status: 400
                }
            }
        } else {
            return {
                status: 403
            }
        } 
    }
}

export default updateCategoryMarker;
