import { Pricing } from '../../../models'
import PricingType from '../../../types/siteadmin/Pricing/PricingType';

import {
    GraphQLInt as IntType,
    GraphQLString as StringType,
    GraphQLFloat as FloatType,
    GraphQLBoolean as BooleanType,
    GraphQLNonNull as NonNull
} from 'graphql';

const addUpdatePricing = {
    type: PricingType,

    args: {
        id: { type: IntType },
        categoryId: { type: new NonNull(IntType) },
        locationId: { type: new NonNull(IntType) },
        unitPrice: { type: FloatType },
        minutePrice: { type: FloatType },
        basePrice: { type: FloatType },
        currency: { type: new NonNull(StringType) },
        riderFeeType: { type: StringType },
        riderFeeValue: { type: FloatType },
        driverFeeType: { type: StringType },
        driverFeeValue: { type: FloatType },
        isActive: { type: BooleanType },
        isSurgePrice: { type: BooleanType }
    },

    async resolve({ request }, { 
        id, categoryId, locationId, unitPrice, minutePrice, basePrice, currency, riderFeeType, riderFeeValue, 
        driverFeeType, driverFeeValue, isActive, isSurgePrice }) {
        let status = 200, errorMessage, fareId;

        try {
            if (request.user && request.user.admin) {
                if (id) { // Update a existing fare
                    const findAlreadyExistWithId = await Pricing.findOne({
                        attributes: ['id'],
                        where: {
                            categoryId, 
                            locationId,
                            id: {
                                ne: id
                            }
                        }
                    });
    
                    if (findAlreadyExistWithId) {
                        status = 400;
                        errorMessage = 'Sorry, it looks like the fare is already exist for the chosen location and category.';
                    } else {
                        const updatePricing = await Pricing.update({
                            categoryId, 
                            locationId, 
                            unitPrice, 
                            minutePrice, 
                            basePrice, 
                            currency, 
                            riderFeeType, 
                            riderFeeValue, 
                            driverFeeType, 
                            driverFeeValue, 
                            isActive, 
                            isSurgePrice
                        }, {
                            where: {
                                id
                            }
                        });
    
                        if (updatePricing) {
                            fareId = updatePricing.dataValues && updatePricing.dataValues.id; 
                        } else {
                            status = 400;
                            errorMessage = 'Sorry, unable to create a fare for the chosen location and category.'
                        }
                    }
                } else { // Add a new fare
                    const findAlreadyExist = await Pricing.findOne({
                        attributes: ['id'],
                        where: {
                            categoryId, 
                            locationId
                        }
                    });
    
                    if (findAlreadyExist) {
                        status = 400;
                        errorMessage = 'Sorry, it looks like the fare is already exist for the chosen location and category.';
                    } else {
                        const addPricing = await Pricing.create({
                            categoryId, 
                            locationId, 
                            unitPrice, 
                            minutePrice, 
                            basePrice, 
                            currency, 
                            riderFeeType, 
                            riderFeeValue, 
                            driverFeeType, 
                            driverFeeValue, 
                            isActive, 
                            isSurgePrice
                        });
    
                        if (addPricing) {
                            fareId = addPricing.dataValues && addPricing.dataValues.id; 
                        } else {
                            status = 400;
                            errorMessage = 'Sorry, unable to create a fare for the chosen location and category.'
                        }
                    }   
                }
    
                return await {
                    id: fareId,
                    status,
                    errorMessage
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

export default addUpdatePricing;

/*

mutation($id: Int, $categoryId: Int!, $locationId: Int!, $unitPrice: Float, $minutePrice: Float, $basePrice: Float,
    $currency: String!, $riderFeeType: String, $riderFeeValue: Float, $driverFeeType: String, $driverFeeValue: Float, 
    $isActive: Boolean, $isSurgePrice: Boolean) {
    addUpdatePricing(id: $id, categoryId: $categoryId, locationId: $locationId, unitPrice: $unitPrice,
        minutePrice: $minutePrice, basePrice: $basePrice, currency: $currency, riderFeeType: $riderFeeType,
        riderFeeValue:$riderFeeValue, driverFeeType: $driverFeeType, driverFeeValue: $driverFeeValue, 
        isActive: $isActive, isSurgePrice: $isSurgePrice) {
        id
        status
        errorMessage    
    }
}

{
  "id": 1,  
  "categoryId": 1,
  "locationId": 1,
  "unitPrice": 5,
  "minutePrice": 1,
  "basePrice": 10,
  "currency": "EUR",
  "riderFeeValue": 5,
  "driverFeeValue": 10
}

*/