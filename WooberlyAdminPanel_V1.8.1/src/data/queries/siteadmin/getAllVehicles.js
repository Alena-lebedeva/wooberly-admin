import { Vehicles, Category } from '../../../data/models';

import {
    GraphQLInt as IntType,
    GraphQLString as StringType
} from 'graphql';
import VehicleManagementWholeType from '../../types/siteadmin/VehicleManagementWholeType';
import sequelize from '../../sequelize';
  
  const getAllVehicles = {
  
    type: VehicleManagementWholeType,

    args: {
      currentPage: { type: IntType },
      searchList: { type: StringType }
    },
    
    async resolve({ request }, { currentPage, searchList }) {
      if(request.user && request.user.admin){
        let limit = 10;
        let offset = 0;
        let vehicleData, vehicleCountLength, keywordFilter;
        if(currentPage){
          offset = (currentPage - 1) * limit;
          keywordFilter = [
            {id: {
              or: [
                {in: [sequelize.literal(`SELECT id FROM Vehicles WHERE id like '%${searchList}%'`)]},
                {in: [sequelize.literal(`SELECT id FROM Vehicles WHERE vehicleName like '%${searchList}%'`)]},
                {in: [sequelize.literal(`SELECT id FROM Vehicles WHERE vehicleType like '%${searchList}%'`)]},
                {in: [sequelize.literal(`SELECT id FROM Vehicles WHERE vehicleNumber like '%${searchList}%'`)]},
                {in: [sequelize.literal(`SELECT id FROM Vehicles WHERE vehicleStatus like '%${searchList}%'`)]},
                {in: [sequelize.literal(`SELECT id FROM Vehicles WHERE vehicleType like '%${searchList}%'`)]}
              ]
            }},
            {userId: {
              or: [
                { in: [sequelize.literal(`SELECT id FROM User WHERE email like '%${searchList}%'`)]},
                { in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${searchList}%'`)]}
              ]
            }}, {
              vehicleType: { in:[sequelize.literal(`SELECT id FROM Category WHERE categoryName like '%${searchList}%'`)]}
            }
          ]
          vehicleData = await Vehicles.findAll({
            where: {
              or: keywordFilter
            },
            limit,
            offset,
            order: [['createdAt', 'DESC']],
            include: [
              {
                model: Category,
                as: 'category',
                required: true
              } 
            ] 
          });

          vehicleCountLength = Vehicles.count({
            where: {
              or: keywordFilter
            }
          });
          
          return {
            vehicleData,
            count: vehicleCountLength
          }

        }
      }      
        
    },
  };
  
  export default getAllVehicles;
  
  /*
  
  query getAllVehicles($currentPage: Int){
  getAllVehicles(currentPage: $currentPage){
   count
    vehicleData{
        vehicleType
         vehicleNumber
        vehicleName 
      vehicleStatus
        category{
          categoryName
        }
        user{
          email
          profile{
            firstName
          }
        }
    }
  }
}
  
  */
  