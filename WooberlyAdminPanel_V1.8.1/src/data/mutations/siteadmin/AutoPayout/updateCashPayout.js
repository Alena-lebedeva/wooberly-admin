import { Booking, TransactionHistory } from '../../../models'
import BookingType from '../../../types/siteadmin/BookingType';

import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType
} from 'graphql';

const updateCashPayout = {

    type: BookingType,

    args: {
        id: { type: IntType },
        payoutStatus: { type: BooleanType },
    },

    async resolve({ request }, { id, payoutStatus }) {
        if (request.user && request.user.admin) {
            let bookingData = await Booking.findOne({
                where: {
                    id
                }
            });

            let updatePayout = await Booking.update({
                isPayoutPaid: payoutStatus
            },
            {
                where: {
                    id
                }
            });

            let driverTotalFare;

            if (bookingData.isTipGiven) {
                driverTotalFare = bookingData && bookingData.tipsDriverTotalFare

            } else {
                driverTotalFare = bookingData && bookingData.driverTotalFare

            }

            if (updatePayout) {

                let transaction = await TransactionHistory.create({
                    bookingId: bookingData.id,
                    driverId: bookingData.driverId,
                    riderId: bookingData.riderId,
                    amount: driverTotalFare,
                    currency: bookingData.currency,
                    transactionId: bookingData.id
                });

                return {
                    status: 200
                }
                
            } else {
                return {
                    status: 400
                }
            };

        } else {
            return {
                status: 500,
                errorMessage: 'Please login with your account and continue.'
            }
        }
    }
}

export default updateCashPayout;