import {
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType,
    GraphQLString as StringType,
    GraphQLBoolean as BooleanType
  } from 'graphql';
  
  
  const CancelReasonListType = new ObjectType({
    name: 'CancelReason',
    fields: {
      id: {
        type: StringType
      },
  
      userType: {
        type: IntType
      },
  
      reason: {
        type: StringType
      },

      isActive: {
          type: BooleanType
      },
  
      status: {
        type: StringType
      }
    }
  });
  
  export default CancelReasonListType;
  