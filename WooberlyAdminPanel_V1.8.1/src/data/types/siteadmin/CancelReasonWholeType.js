import {
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType,
    GraphQLString as StringType,
    GraphQLList as List
  } from 'graphql';
  
  import CancelReasonType from './CancelReasonType';
  
    const CancelReasonListType = new ObjectType({
      name: 'CancelReasonList',
      fields: {
        result: {
          type: new List(CancelReasonType)
        },
        count: { type: StringType },
        status: { type: IntType }
      },
    });
  
    export default CancelReasonListType;
  