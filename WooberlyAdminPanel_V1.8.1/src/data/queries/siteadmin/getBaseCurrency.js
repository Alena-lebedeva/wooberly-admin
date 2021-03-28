import CurrenciesType from '../../types/siteadmin/CurrenciesType';
import { Currencies } from '../../models';

const getBaseCurrency = {

  type: CurrenciesType,

  async resolve({ request }) {

    return await Currencies.find({
      where: {
        isBaseCurrency: true
      }
    });

  },
};

export default getBaseCurrency;
