import {
    GraphQLNonNull as NonNull
} from 'graphql';

import { PromoCode } from '../../../models';

import PromoCodeType from '../../../types/siteadmin/PromoCode/PromoCodeType';

import {
    GraphQLInt as IntType
} from 'graphql';

const deletePromoCode = {
    type: PromoCodeType,

    args: {
        id: { type:  new NonNull(IntType) }
    },

    async resolve({request}, { id }) {
        if (request.user && request.user.admin) {
            const deletedPromoCode = await PromoCode.destroy({
                where: {
                    id
                }
            });

            if (deletedPromoCode) {
                return await {
                    status: 200
                };
            } else {
                return await {
                    status: 400,
                    errorMessage: "Oops! something went wrong. Unable to delete the promo code."
                };
            }
        } else {
            return {
                status: 500,
                errorMessage: "Oops! Please login and continue."
            };
        }  
    }
};

export default deletePromoCode;

/*

mutation( 
    $id: Int!
) {
    deletePromoCode(
        id: $id
    ) {
        status
        errorMessage
    }
}

*/