import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';

import { Pricing } from '../../../models'
import PricingCommonType from '../../../types/siteadmin/Pricing/PricingCommonType';

const getPricing = {

    type: PricingCommonType,

    args: {
        id: { type: new NonNull(IntType) }
    },

    async resolve({ request }, { id }) {
        try {
            if (request.user && request.user.admin) {
                const result = await Pricing.findOne({ 
                    where: { id }
                });

                return await {
                    result,
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

export default getPricing;

/*

query($id: Int!) {
    getPricing(id: $id) {
        status
        errorMessage
        result {
            id
            categoryId
            locationId
            unitPrice
            minutePrice
            basePrice
            currency
            riderFeeType
            riderFeeValue
            driverFeeType
            driverFeeValue
            isActive
            isSurgePrice
            category {
                id
                categoryName
                categoryImage
                categoryMarkerImage
                isActive
                capacity
            }
            location {
                id
                locationName
                coordinates
                description
                isActive
            }
        }
    }
}

*/