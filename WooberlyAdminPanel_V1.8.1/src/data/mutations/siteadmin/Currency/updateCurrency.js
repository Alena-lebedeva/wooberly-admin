import CurrenciesType from '../../../types/siteadmin/CurrenciesType';
import { Currencies, UserProfile } from '../../../models';

import {
  GraphQLInt as IntType,
  GraphQLBoolean as BooleanType,
  GraphQLString as StringType
} from 'graphql';

const updateCurrency = {

  type: CurrenciesType,

  args: {
    id: { type: IntType },
    isEnable: { type: BooleanType },
    symbol: { type: StringType }
  },

  async resolve({ request }, { id, isEnable, symbol }) {

    if (request.user && request.user.admin == true) {
      let isCurrencyUpdated = false;

      const userCurrencies = await UserProfile.findAll({
        where: {
          preferredCurrency: symbol
        },
        raw: true
      })

      
        if (userCurrencies.length > 0) {
          const updateCurrencies = await Currencies.update(
            {
              isEnable: !isEnable
            },
            {
              where: {
                id: id
              }
            }
          )
            .then(function (instance) {
              if (instance > 0) {
                isCurrencyUpdated = true;
              }
            });
        }

      if (isCurrencyUpdated) {
        return {
          status: 200
        }
      } else {
        return {
          status: 400
        }
      }
    } else {
      return {
        status: 400
      }
    }
  },
};

export default updateCurrency;