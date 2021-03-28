import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLList as List
} from 'graphql';

// External Types
import PricingType from './PricingType';


const PricingCommonType = new ObjectType({
  name: 'PricingCommonType',
  fields: {
    result: { type: PricingType },
    results: { type: new List(PricingType) },
    count: { type: IntType },
    status: { type: IntType },
    errorMessage: { type: StringType }
  },
});

export default PricingCommonType;
