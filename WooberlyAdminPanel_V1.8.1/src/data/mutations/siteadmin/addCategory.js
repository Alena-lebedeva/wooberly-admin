import { Category, TempImages } from '../../models'
import CategoryType from '../../types/siteadmin/CategoryType';

import {
    GraphQLInt as IntType,
    GraphQLString as StringType,
    GraphQLFloat as FloatType,
    GraphQLBoolean as BooleanType
} from 'graphql';

const addCategory = {
    type: CategoryType,

    args: {
        categoryName: { type: StringType },
        capacity: { type: IntType },
        isActive: { type: BooleanType },
        categoryImage: { type: StringType },
        categoryMarkerImage: { type: StringType }
    },

    async resolve({ request }, { categoryName, capacity, isActive, categoryImage, categoryMarkerImage }) {
        if (request.user && request.user.admin) {

            const fieldNameArray = ['categoryImage', 'categoryMarkerImage'];

            fieldNameArray.forEach( async (fieldName) => {
                await TempImages.update({
                    fileName: null
                },
                {
                    where: {
                        tableName: 'Category',
                        fieldName
                    }
                })
            });


            const addCategory = await Category.create({
                categoryName,
                capacity,
                isActive,
                categoryImage,
                categoryMarkerImage
            });

            if (addCategory) {
                return {
                    status: 200
                }
            } else {
                return {
                    status: 400,
                    errorMessage: "Oops, something went wrong. Please try again."
                }
            };
        } else {
            return {
                status: 500,
                errorMessage: 'Please login with your account and continue.'
            }
        };
    }
}

export default addCategory;