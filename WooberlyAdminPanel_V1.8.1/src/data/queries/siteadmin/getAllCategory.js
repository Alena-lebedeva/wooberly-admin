import { Category } from '../../../data/models';

import {
    GraphQLInt as IntType,
    GraphQLString as StringType
} from 'graphql';
import CategoryManagementWholeType from '../../types/siteadmin/CategoryManagementWholeType';
import sequelize from '../../sequelize';
  
  const getAllCategory = {
  
    type: CategoryManagementWholeType,
   
    args: {
        currentPage: { type: IntType },
        searchList: { type: StringType }
    },

    async resolve({ request }, { currentPage, searchList }) {
        if(request.user && request.user.admin){
            let limit = 10;
            let offset = 0;
            let categoryData, categoryCountLength, keywordFilter;
            if(currentPage){
              offset = (currentPage - 1) * limit;
            }
            keywordFilter = [
                {id: {
                  or: [
                    {in: [sequelize.literal(`SELECT id FROM Category WHERE categoryName like '%${searchList}%'`)]},
                    {in: [sequelize.literal(`SELECT id FROM Category WHERE basePrice like '%${searchList}%'`)]},
                    {in: [sequelize.literal(`SELECT id FROM Category WHERE minutePrice like '%${searchList}%'`)]},
                    {in: [sequelize.literal(`SELECT id FROM Category WHERE unitPrice like '%${searchList}%'`)]},
                    {in: [sequelize.literal(`SELECT id FROM Category WHERE id like '%${searchList}%'`)]},
                    {in: [sequelize.literal(`SELECT id FROM Category WHERE riderFeeValue like '%${searchList}%'`)]},
                    {in: [sequelize.literal(`SELECT id FROM Category WHERE driverFeeValue like '%${searchList}%'`)]},
                    // {in: [sequelize.literal(`SELECT id FROM Category WHERE createdAt like '%${searchList}%'`)]},
                  ]
                }},
              ];
              
            categoryData = await Category.findAll({
                where: {
                    and: keywordFilter
                },
                limit,
                offset,
                order: [['createdAt', 'DESC']], 
            });

            categoryCountLength = await Category.count({
                where: {
                    and: keywordFilter
                }
            })

            return {
                categoryData,
                count: categoryCountLength
            }
            
        } 
      },
  };
  
  export default getAllCategory;
  
  /*
  
 query getAllCategory($currentPage: Int){
  getAllCategory(currentPage: $currentPage){
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
  