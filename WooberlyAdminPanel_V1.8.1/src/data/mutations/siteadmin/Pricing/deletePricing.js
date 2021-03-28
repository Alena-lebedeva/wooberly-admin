import { Pricing, Booking } from '../../../models'
import PricingType from '../../../types/siteadmin/Pricing/PricingType';

import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';

const deletePricing = {
    type: PricingType,

    args: {
        id: { type: new NonNull(IntType) }
    },

    async resolve({ request }, { id }) {
        try {
            if (request.user && request.user.admin) {
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

                const deletePricingData = await Pricing.destroy({
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

export default deletePricing;

/*

mutation($id: Int!) {
    deletePricing(id: $id) {
        status
        errorMessage    
    }
}

{
  "id": 1
}

*/