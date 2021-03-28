import CurrenciesType from '../../../types/siteadmin/CurrenciesType';
import { Currencies, CurrencyRates } from '../../../models';
import fetch from 'node-fetch'

import {
  GraphQLInt as IntType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

const setBaseCurrency = {

  type: CurrenciesType,

  args: {
    id: { type: IntType }
  },

  async resolve({ request }, { id }) {

    if (request.user && request.user.admin == true) {

      let isCurrenciesUpdated = false;
      let isCurrencyUpdated = false;

      const currency = await Currencies.findOne({
        where: {
            isBaseCurrency: true
        }
      })

      const updateCurrencies = await Currencies.update(
        {
          isBaseCurrency: false
        },
        {
          where: {
            id: currency.id
          }
        }
      )
        .then(function (instance) {
          if (instance > 0) {
            isCurrenciesUpdated = true;
          }
        });

      if (isCurrenciesUpdated) {
        const updateCurrency = await Currencies.update(
          {
            isBaseCurrency: true,
            isEnable: true
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

        if (isCurrencyUpdated) {
          const getBaseCurrency = await Currencies.findOne({
            where: {
              isBaseCurrency: true
            }
          });

          const symbol = getBaseCurrency.symbol;
          const URL = 'https://api.coinbase.com/v2/exchange-rates?currency=' + symbol;
          const resp = await fetch(URL);
          const { data } = await resp.json();
          const currencyData = data.rates;

          // Prepare data and rates from fixer then store them into currency rates table
          let baseData = {
            currencyCode: symbol,
            rate: 1.00,
            isBase: true
          };
          let ratesData = Object.keys(currencyData).map(function (data) {
            return { "currencyCode": data, rate: currencyData[data] };
          });
          ratesData.push(baseData);

          if (ratesData.length > 0) {
            // Clean the table before store anything
            await CurrencyRates.truncate();
            // Lets do bulk create of currency rates
            const updateRates = await CurrencyRates.bulkCreate(ratesData);
          }

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



    } else {
      return {
        status: 400
      }
    }
  },
};

export default setBaseCurrency;