import { Pricing, Booking } from '../../../models'
import PricingType from '../../../types/siteadmin/Pricing/PricingType';

import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType
} from 'graphql';

const updatePricingStatus = {
    type: PricingType,

    args: {
        id: { type: new NonNull(IntType) },
        isActive: { type: BooleanType }
    },

    async resolve({ request }, { id, isActive }) {
        try {
            if (request.user && request.user.admin) {

                if(!isActive) {
                    const checkBookingExist = await Booking.findOne({
                        attributes: ['id'],
                        where: {
                            pricingId: id,
                            or: [
                                {
                                    tripStatus: {
                                        in: ['created', 'approved', 'started', 'declined']
                                    }
                                },
                                {
                                    tripStatus: 'declined',
                                    updatedAt: {
                                        gte: `${new Date(Date.now() - 5 * 60000).toISOString().slice(0, 19).replace('T', ' ')}`
                                    }
                                }
                            ]
                        }
                    });

                    if (checkBookingExist) {
                        return {
                            status: 400,
                            errorMessage: 'Sorry, The chosen pricing is having the bookings and unable to disable it.'
                        };
                    }
                }

                const updatePricingData = await Pricing.update({
                    isActive,
                }, {    
                    where: {
                        id
                    }
                });
    
                return await {
                    status: 200
                };
            } else {
                return {
                    status: 500,
                    errorMessage: 'Please login with your account and continue.'
                };
            }
        } catch(error) {
            return {
                status: 400,
                errorMessage: 'Sorry something went wrong, ' + error
            };
        }
    }
}

export default updatePricingStatus;

/*

mutation($id: Int!, $isActive: Boolean) {
    updatePricingStatus(id: $id, isActive: $isActive) {
        status
        errorMessage    
    }
}

{
  "id": 1,
  "isActive": true
}

*/