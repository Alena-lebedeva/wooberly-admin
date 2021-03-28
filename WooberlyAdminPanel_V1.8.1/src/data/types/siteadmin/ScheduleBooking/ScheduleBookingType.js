import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

const ScheduleBookingType = new ObjectType({
    name: 'ScheduleBookingType',
    fields: {
        id: {
            type: IntType
        },

        riderId: {
            type: StringType
        },

        bookingId: {
            type: IntType
        },

        tripStatus: {
            type: StringType
        },

        scheduleFrom: {
            type: StringType
        },

        scheduleTo: {
            type: StringType
        }
    }
});

export default ScheduleBookingType;