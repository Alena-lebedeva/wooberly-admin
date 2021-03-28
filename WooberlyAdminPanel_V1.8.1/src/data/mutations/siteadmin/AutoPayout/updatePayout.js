import { Booking } from '../../../models'
import BookingType from '../../../types/siteadmin/BookingType';

import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType
} from 'graphql';

const updatePayout = {

    type: BookingType,

    args: {
        id: { type: new NonNull(IntType) },
        isBanStatus: { type: new NonNull(BooleanType) },
    },

    async resolve({ request }, { id, isBanStatus}) {
        if (request.user && request.user.admin) {
            let update = await Booking.update({
                isBanStatus
            },
            {
                where: {
                    id
                }
            }
            );

            return {
                status: 200
            }
           
        } else {
            return {
                status: 500,
                errorMessage: 'Please login with your account and continue.'
            }
        }
    }
}

export default updatePayout;