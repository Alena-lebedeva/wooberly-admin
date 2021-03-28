import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

const CurrenciesType = new ObjectType({
  name: 'CurrenciesType',
  fields: {
    id: { type: IntType },
    symbol: { type: StringType },
    isEnable: { type: BooleanType },
    isPayment: { type: BooleanType },
    isBaseCurrency: { type: BooleanType },
    status: { type: IntType },
    errorMessage: { type: StringType }
  },
});

export default CurrenciesType;
