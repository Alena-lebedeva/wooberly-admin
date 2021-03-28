import { Currencies } from '../../../data/models';
import CurrencyType from '../../types/currency/CurrencyType';


import {
  GraphQLList as List
} from 'graphql';

const getCurrencies = {

  type: new List(CurrencyType),

  async resolve({ request }) {

    return await Currencies.findAll({
      order: [
        ['isBaseCurrency', 'DESC'],
      ]
    });

  },
};

export default getCurrencies;

/*

{
  getCurrencies {
    id
    symbol
    isEnable
    isPayment
    isBaseCurrency
    status
  }
}

*/
