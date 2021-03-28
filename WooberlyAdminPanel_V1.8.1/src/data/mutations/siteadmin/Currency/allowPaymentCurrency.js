import CurrenciesType from '../../../types/siteadmin/CurrenciesType';
import { Currencies } from '../../../models';

import {
  GraphQLInt as IntType,
} from 'graphql';

const allowPaymentCurrency = {

  type: CurrenciesType,

  args: {
    id: { type: IntType },
    isPayment: { type: IntType }
  },

  async resolve({ request }, { id ,isPayment}) {

    if (request.user && request.user.admin == true) {
      let isCurrencyUpdated = false;

      const updateCurrencies = await Currencies.update(
        {
          isPayment: !isPayment
        },
        {
          where: {
            id: id
          }
        }
      )
        .then(function (instance) {
          // Check if any rows are affected
          if (instance > 0) {
            isCurrencyUpdated = true;
          }
        });

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

export default allowPaymentCurrency;