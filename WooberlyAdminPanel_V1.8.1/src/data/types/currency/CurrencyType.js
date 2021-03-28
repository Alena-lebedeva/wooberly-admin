import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

const CurrencyType = new ObjectType({
  name: 'CurrencyType',
  fields: {
    id: { type: IntType },
    symbol: { type: StringType },
    isEnable: { type: BooleanType },
    isPayment: { type: BooleanType },
    isBaseCurrency: { type: BooleanType },
    status: { type: StringType }
  },
});

export default CurrencyType;
