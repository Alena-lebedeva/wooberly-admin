import {
    GraphQLInt as IntType,
    GraphQLString as StringType
} from 'graphql';

import { PromoCode } from '../../../models';

import PromoCodeCommonType from '../../../types/siteadmin/PromoCode/PromoCodeCommonType';
import sequelize from '../../../sequelize';

const getPromoCodes = {

    type: PromoCodeCommonType,

    args: {
        currentPage: { type: IntType },
        searchList: { type: StringType }
    },

    async resolve({ request }, { currentPage, searchList }) {
        try {
            if(request.user && request.user.admin) {
                let limit = 10, offset = 0;
                if(currentPage){
                    offset = (currentPage - 1) * limit;
                }
                let keywordFilter = [
                    {id: {
                      or: [
                        {in: [sequelize.literal(`SELECT id FROM PromoCode WHERE id like '%${searchList}%'`)]},
                        {in: [sequelize.literal(`SELECT id FROM PromoCode WHERE code like '%${searchList}%'`)]},
                        {in: [sequelize.literal(`SELECT id FROM PromoCode WHERE title like '%${searchList}%'`)]},
                        {in: [sequelize.literal(`SELECT id FROM PromoCode WHERE promoValue like '%${searchList}%'`)]},

                      ]
                    }},
                  ]

                let data = await PromoCode.findAll({
                    where: {
                        and: keywordFilter
                    },
                    limit,
                    offset,
                    order: [['updatedAt', 'DESC']]
                });

                let count = PromoCode.count({
                    where: {
                        and: keywordFilter
                    }
                });

                return await {
                    status: 200,
                    data,
                    count
                };
            } else {
                return {
                    status: 500,
                    errorMessage: 'Oops! Something went wrong. Please login and continue.'
                };
            }
        } catch (error) {
            return {
                status: 400,
                errorMessage: 'Oops! Something went wrong.' + error.message
            }
        }
    },
};

export default getPromoCodes;

/*
        
query($currentPage: Int) {
    getPromoCodes(currentPage: $currentPage) {
        status
        errorMessage
        count
        data {
          id
          title
          description
          code
          type
          promoValue
          currency
          expiryDate
          isEnable
          createdAt
          updatedAt
        }
    }
}

*/
