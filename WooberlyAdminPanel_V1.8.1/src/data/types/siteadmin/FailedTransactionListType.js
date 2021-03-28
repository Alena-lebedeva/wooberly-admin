import {
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType,
    GraphQLList as List,
} from 'graphql';

import FailedTransactionType from './FailedTransactionType';

const FailedTransactionListType = new ObjectType({
    name: 'FailedTransactionListType',
    fields: {
        bookingData: {
            type: new List(FailedTransactionType)
        },
        count: {
            type: IntType
        }
    }
});

export default FailedTransactionListType;