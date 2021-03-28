import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

const ScheduleBookingHistoryType = new ObjectType({
    name: 'ScheduleBookingHistoryType',
    fields: {
        id: {
            type: IntType
        },

        scheduleId: {
            type: IntType
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
        },

        updatedAt: {
            type: StringType
        }
    }
});

export default ScheduleBookingHistoryType;