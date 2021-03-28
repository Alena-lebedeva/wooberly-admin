import {
    GraphQLObjectType as ObjectType,
    GraphQLFloat as FloatType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';

const BookingPromoCodeType = new ObjectType({
    name: 'BookingPromoCodeType',
    fields: {
        id: {
            type: IntType
        },

        promoId: {
            type: IntType
        },

        bookingId: {
            type: IntType
        },

        title: {
            type: StringType
        },

        code: {
            type: StringType
        },

        type: {
            type: IntType
        },

        promoValue: {
            type: FloatType
        },

        currency: {
            type: StringType
        },

        status: {
            type: IntType
        },

        errorMessage: {
            type: StringType
        }
    }
});

export default BookingPromoCodeType;
  