import {
    GraphQLString as StringType,
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType,
    GraphQLFloat as FloatType,
    GraphQLBoolean as BooleanType,
    GraphQLList as List
} from 'graphql';

import { UserProfile, Category, BookingPromoCode, BookingCancelReason, ScheduleBooking, ScheduleBookingHistory } from '../../models';
import CategoryType from './CategoryType';
import ProfileType from './ProfileType';
import BookingCancelReasonType from './BookingCancelReasonType'
import BookingPromoCodeType from './PromoCode/BookingPromoCodeType';
import ScheduleBookingType from './ScheduleBooking/ScheduleBookingType';
import ScheduleBookingHistoryType from './ScheduleBooking/ScheduleBookingHistoryType';

const BookingType = new ObjectType({
    name: 'BookingType',
    fields: {
        id: { type: IntType },
        bookingType: { type: IntType },
        riderLocation: { type: StringType },
        pickUpLocation: { type: StringType },
        dropOffLocation: { type: StringType },
        riderLocationLat: { type: FloatType },
        riderLocationLng: { type: FloatType },
        pickUpLat: { type: FloatType },
        pickUpLng: { type: FloatType },
        dropOffLat: { type: FloatType },
        dropOffLng: { type: FloatType },
        riderId: { type: StringType },
        driverId: { type: StringType },
        tripStatus: { type: StringType },
        vehicleType: { type: IntType },
        totalRideDistance: { type: FloatType },
        baseFare: { type: FloatType },
        baseUnit: { type: FloatType },
        baseMinute: { type: FloatType },
        riderServiceFee: { type: FloatType },
        driverServiceFee: { type: FloatType },
        estimatedTotalFare: { type: FloatType },
        totalFare: { type: FloatType },
        totalDuration: { type: FloatType },
        totalDuration: { type: FloatType },
        paymentType: { type: FloatType },
        paymentStatus: { type: StringType },
        transactionId: { type: StringType },
        startDate: { type: StringType },
        startTime: { type: StringType },
        endDate: { type: StringType },
        endTime: { type: StringType },
        tripStart: { type: StringType },
        tripEnd: { type: StringType },
        currency: { type: StringType },
        riderTotalFare: { type: FloatType },
        driverTotalFare: { type: FloatType },
        createdAt: { type: StringType },
        updatedAt: { type: StringType },
        notes: { type: StringType },
        vehicleId: { type: IntType },
        vehicleNumber: { type: StringType },
        promoCodeId: { type: IntType },
        isSpecialTrip: { type: BooleanType },
        specialTripPrice: { type: FloatType },
        specialTripTotalFare: { type: FloatType },
        tollFee: { type: FloatType },
        tipsAmount: { type: FloatType },
        isPayoutPaid: { type: BooleanType },
        isBanStatus: { type: BooleanType },
        status: { type: IntType },
        errorMessage: { type: StringType },
        driverDetails: {
            type: ProfileType,
            async resolve(booking) {
                return await UserProfile.findOne({
                    where: { userId: booking.driverId }
                })
            }
        },
        riderDetails: {
            type: ProfileType,
            async resolve(booking) {
                return await UserProfile.findOne({
                    where: { userId: booking.riderId }
                })
            }
        },
        categoryDetails: {
            type: CategoryType,
            async resolve(booking) {
                return await Category.findOne({
                    where: { id: booking.vehicleType }
                })
            }
        },
        promoCode: {
            type: BookingPromoCodeType,
            async resolve(booking) {
                return await BookingPromoCode.findOne({
                    where: { bookingId: booking.id }
                })
            }
        },
        cancelReason: {
            type: BookingCancelReasonType,
            async resolve(booking) {
                return await BookingCancelReason.findOne({
                    where: { bookingId: booking.id }
                })
            }
        },
        scheduleBooking: {
            type: ScheduleBookingType,
            async resolve(booking) {
                return await ScheduleBooking.findOne({
                    where: { bookingId: booking.id }
                })
            }
        },
        scheduleBookingHistory: {
            type: new List(ScheduleBookingHistoryType),
            async resolve(booking) {
                return await ScheduleBookingHistory.findAll({
                    where: { bookingId: booking.id },
                    order: [['createdAt', 'ASC']]
                })
            }
        }
    }
});

export default BookingType;