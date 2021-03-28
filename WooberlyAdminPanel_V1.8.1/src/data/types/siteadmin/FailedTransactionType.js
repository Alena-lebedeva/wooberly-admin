import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLFloat as FloatType
} from 'graphql';

import ProfileType from './ProfileType';
import { UserProfile } from '../../models';

const FailedTransactionType = new ObjectType({
    name: 'FailedTransactionType',
    fields: {
        id: {
            type: IntType
        },
        bookingId:{
            type: IntType
        },
        riderId: {
            type: StringType
        },
        driverId: {
            type: StringType
        },
        amount: {
            type: FloatType
        },
        currency: {
            type: StringType
        },
        reason: {
            type: StringType
        },
        driverDetails: {
            type: ProfileType,
            async resolve(booking) {
                return await UserProfile.findOne({
                    where: { userId: booking.driverId }
                })
            }
        },
    }
});

export default FailedTransactionType;