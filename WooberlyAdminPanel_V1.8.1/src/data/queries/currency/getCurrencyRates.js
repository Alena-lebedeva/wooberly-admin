import { CurrencyRates, Currencies } from '../../../data/models';
import CurrencyRatesType from '../../types/currency/CurrencyRatesType';

const getCurrencyRates = {

  type:  CurrencyRatesType,

  async resolve({ request, response }) {
    var rates, ratesData = {};
    const data = await CurrencyRates.findAll({ raw: true });
    const base = await Currencies.findOne({ where: { isBaseCurrency: true }, raw: true });

    if(data && data.length > 0) {
      data.map((item) => {
        ratesData[item.currencyCode] = item.rate;
      })
    }
    rates = JSON.stringify(ratesData);

    return await {
      base: base.symbol,
      rates
    };
  },
};

export default getCurrencyRates;

/*

{
  getCurrencyRates {
      base
      rates
  }
}

*/