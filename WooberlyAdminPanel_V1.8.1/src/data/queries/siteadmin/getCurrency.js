import CurrencyListType from '../../types/siteadmin/CurrencyListType';
import { Currencies } from '../../models';

import {
    GraphQLInt as IntType,
    GraphQLString as StringType
} from 'graphql';
import sequelize from '../../sequelize';

const getCurrency = {

    type: CurrencyListType,

    args: {
        currentPage: { type: IntType },
        searchList: { type: StringType }
    },

    async resolve({ request }, { currentPage, searchList }) {
            let limit = 10;
            let offset = 0;
            
            if(currentPage) {
                offset = (currentPage - 1) * limit
            }
            
            let keywordFilter = [
                    {
                        id: {
                            or: [
                                { in: [sequelize.literal(`SELECT id from Currencies where id like '%${searchList}%'`)] },
                                { in: [sequelize.literal(`SELECT id from Currencies where symbol like '%${searchList}%'`)] },
                            ]
                        }
                    }
                ]

            let currencyList = await Currencies.findAll({
                limit,
                offset,
                where: {
                    and: keywordFilter
                },
                order: [
                    ['isBaseCurrency', 'DESC'],
                    ['id', 'ASC']
                ]
            });

            let currencyCount = await Currencies.count({
                where: {
                    and: keywordFilter
                }
            })
            return {
                currencyList,
                count: currencyCount
            }
        }      
    
};

export default getCurrency;

// GraphQL 

// query getCurrency {
//     getCurrency{
//       id
//       countryCode
//       countryName
//       dialCode
//     }
//   }