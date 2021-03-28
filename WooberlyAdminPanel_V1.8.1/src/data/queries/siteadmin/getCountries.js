import CountryType from '../../types/siteadmin/CountryType';
import { Country } from '../../models';

import {
    GraphQLList as List,
} from 'graphql';

const getCountries = {

    type: new List(CountryType),

    async resolve({ request }) {
        return await Country.findAll();
    }
};

export default getCountries;

// GraphQL 

// query getCountries {
//     getCountries{
//       id
//       countryCode
//       countryName
//       dialCode
//     }
//   }