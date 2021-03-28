import { Category, Pricing } from '../../models';
import CategoryType from '../../types/siteadmin/CategoryType';
import {
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';

const updateCategoryStatus = {
    type: CategoryType,

    args: {
        id: { type: IntType },
        isActive: { type: BooleanType }
    },

    async resolve({ request }, { id, isActive }) {
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

            const updateCategoryStatus = await Category.update({
                isActive
            },
                {
                    where: {
                        id
                    }
                }
            )
            
            if (updateCategoryStatus) {
                return await {
                    status: 200
                }
            } else {
                return await {
                    status: 400,
                    errorMessage: "Something went wrong! Please try again."
                }
            }

        } else {
            return {
                status: 500
            }
        }
    }
};

export default updateCategoryStatus;