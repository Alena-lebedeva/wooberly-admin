import {
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType,
    GraphQLList as List,
} from 'graphql';

import BookingType from './BookingType';

const BookingManagementWholeType = new ObjectType({
    name: 'BookingManagementWholeType',
    fields: {
        bookingData: {
            type: new List(BookingType)
        },
        count: {
            type: IntType
        }
    }
});

export default BookingManagementWholeType;