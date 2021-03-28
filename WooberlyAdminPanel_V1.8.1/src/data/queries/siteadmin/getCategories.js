import GetCategoryType from '../../types/siteadmin/GetCategoryType';
import { Category } from '../../../data/models';

const getCategories = {

    type: GetCategoryType,

    async resolve({ request }) {

        try {

            const getCategoryList = await Category.findAll({
                
            });
            if (getCategoryList && getCategoryList.length > 0) {
                return {
                    result: getCategoryList,
                    status: 200
                }

            } else {
                return {
                    result: [],
                    status: 400,
                    errorMessage: "No record found."
                }
            }

        } catch (error) {
            return {
                errorMessage: 'Something went wrong ' + error,
                status: 400
            };
        }

    }
};

export default getCategories;