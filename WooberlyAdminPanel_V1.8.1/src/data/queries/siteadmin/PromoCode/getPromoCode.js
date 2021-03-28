import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';

import { PromoCode } from '../../../models';

import PromoCodeType from '../../../types/siteadmin/PromoCode/PromoCodeType';

const getPromoCode = {

    type: PromoCodeType,

    args: {
        id: { type: new NonNull(IntType) }
    },

    async resolve({ request }, { id }) {
        try {
            if(request.user && request.user.admin) {
                return await PromoCode.findOne({
                    where: {
                        id
                    }
                });
            } else {
                return {
                    status: 500,
                    errorMessage: 'Oops! Something went wrong. Please login and continue.'
                };
            }
        } catch (error) {
            return {
                status: 400,
                errorMessage: 'Oops! Something went wrong.' + error.message
            }
        }
    },
};

export default getPromoCode;

/*
        
query($id: Int!) {
    getPromoCode(id: $id) {
        id
        title
        description
        code
        type
        promoValue
        currency
        expiryDate
        isEnable
        createdAt
        updatedAt
    }
}

*/
