import { Category } from '../../../../data/models';
import CategoryManagementWholeType from '../../../types/siteadmin/CategoryManagementWholeType';

const getOverallCategory = {

  type: CategoryManagementWholeType,

  async resolve({ request }) {
    if (request.user && request.user.admin) {
      let categoryData, categoryCountLength;

      categoryData = await Category.findAll({
        order: [['createdAt', 'DESC']],
      });

      return {
        categoryData,
        count: categoryData && categoryData.length || 0
      }

    }
  },
};

export default getOverallCategory;

/*

query {
  getOverallCategory {
   count
    categoryData{
        categoryName
        categoryImage
        categoryMarkerImage
        basePrice
        riderFeeValue
        driverFeeValue
        isActive
    }
  }
}

*/
