import {
    GraphQLFloat as FloatType,
    GraphQLInt as IntType,
    GraphQLString as StringType,
    GraphQLObjectType as ObjectType
} from 'graphql'

import { Booking } from '../../models'
import BookingType from './BookingType'

const getRatings = new ObjectType({
    name: 'GetRatings',
    fields: {
        id: { type: IntType },
        userId: { type: StringType },
        bookingId: { type: StringType },
        authorId: { type: StringType },
        ratings: { type: StringType },
        reviewContent: { type: StringType },
        bookingDetails: {
            type: BookingType,
            async resolve(review) {
                return await Booking.findOne({
                    where: { id: review.bookingId }
                })
            }
        }
    }
})

export default getRatings;