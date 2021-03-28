import { Category, Pricing } from '../../models';
import CategoryType from '../../types/siteadmin/CategoryType';
import {
    GraphQLInt as IntType,
} from 'graphql';

const deleteCategory = {
    type: CategoryType,

    args: {
        id: { type: IntType }
    },

    async resolve({ request }, { id }) {
        if (request.user && request.user.admin) {
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
                    errorMessage: "Sorry, unable to delete. The chosen category is used on the manage fare. Please remove the fare and try again."
                }
            }

            const category = await Category.findOne({
                where: {
                    id
                }
            })

            if (category) {
                const deleteCategory = await Category.destroy({
                    where: {
                        id
                    }
                })

                if (deleteCategory) {
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
                    status: 404
                }
            }
            
            
        } else {
            return {
                status: 500
            }
        }
    }
};

export default deleteCategory;