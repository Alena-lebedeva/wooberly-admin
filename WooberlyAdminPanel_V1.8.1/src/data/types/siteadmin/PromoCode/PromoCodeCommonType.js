import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLList as List
} from 'graphql';

import PromoCodeType from './PromoCodeType';

const PromoCodeCommonType = new ObjectType({
    name: 'PromoCodeCommonType',
    fields: {
        data: {
            type: new List(PromoCodeType)
        },

        count: {
            type: IntType
        },

        status: {
            type: IntType
        },

        errorMessage: {
            type: StringType
        }
    }
});

export default PromoCodeCommonType;
  