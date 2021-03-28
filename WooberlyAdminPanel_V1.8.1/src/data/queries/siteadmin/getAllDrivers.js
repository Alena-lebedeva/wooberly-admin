import UserManagementWholeData from '../../types/siteadmin/UserManagementWholeData';
import { UserProfile, User } from '../../../data/models';

import {
    GraphQLInt as IntType,
    GraphQLString as StringType
} from 'graphql';
import sequelize from '../../sequelize';
  
  const getAllDrivers = {
  
    type: UserManagementWholeData,
   
    args: {
      currentPage: { type: IntType },
      searchList: { type: StringType }
    },
    
    async resolve({ request }, { currentPage, searchList }) {
  
      if(request.user && request.user.admin){
        let limit =10;
        let offset = 0;
        let userData, userCountLength, keywordFilter 
        if(currentPage){
          offset = (currentPage - 1) * limit;
        }
        keywordFilter = [
          {id: {
            or: [
              {in: [sequelize.literal(`SELECT id FROM User WHERE email like '%${searchList}%'`)]},
              {in: [sequelize.literal(`SELECT id FROM User WHERE phoneDialCode like '%${searchList}%'`)]},
              {in: [sequelize.literal(`SELECT id FROM User WHERE phoneNumber like '%${searchList}%'`)]},
              {in: [sequelize.literal(`SELECT id FROM User WHERE createdAt like '%${searchList}%'`)]},
              {in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE profileId like '%${searchList}%'`)]},
              {in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${searchList}%'`)]},
              {in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE lastName like '%${searchList}%'`)]},
              {in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE country like '%${searchList}%'`)]},
            ]
          }},
        ]
        userData = await User.findAll({
          limit,
          offset,
          where : {
              and: keywordFilter,
              userType : 2,
              deletedAt: null
          }, 
          order: [['createdAt', 'DESC']],
          include: [
            {
              model: UserProfile,
              as: 'profile',
              required: true
            }
          ]  
      
        });
        userCountLength = User.count({
          where : {
            and: keywordFilter,
            userType : 2,
            deletedAt: null
        },
        });

        return {
          userData,
          count: userCountLength
        }
      }  
        
      },
  };
  
  export default getAllDrivers;
  
  /*
  
  query getAllDriver($currentPage: Int){
  getAllDrivers(currentPage: $currentPage){
   count
    userData{
      email
        phoneNumber
      	createdAt
          profile{
            profileId
            firstName
            lastName
            country
          }
    }
  }
}
  
  */
  