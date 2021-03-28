import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

import { Category, Location } from '../../../models';

// External Types
import CategoryType from '../CategoryType';
import LocationType from '../LocationType';


const PricingType = new ObjectType({
  name: 'PricingType',
  fields: {
    id: { type: IntType },
    categoryId: { type: IntType },
    locationId: { type: IntType },
    unitPrice: { type: FloatType },
    minutePrice: { type: FloatType },
    basePrice: { type: FloatType },
    currency: { type: StringType },
    riderFeeType: { type: StringType },
    riderFeeValue: { type: IntType },
    driverFeeType: { type: StringType },
    driverFeeValue: { type: IntType },
    isActive: { type: BooleanType },
    isSurgePrice: { type: BooleanType },
    category: {
      type: CategoryType,
      async resolve(price) {
        return await Category.findOne({
          attributes: ['id', 'categoryName', 'categoryImage', 'categoryMarkerImage', 'isActive', 'capacity'],
          where: {
            id: price && price.categoryId,
            isActive: true
          }
        });
      }
    },
    location: {
      type: LocationType,
      async resolve(price) {
        return await Location.findOne({
          attributes: ['id', 'locationName', 'coordinates', 'description', 'isActive'],
          where: {
            id: price && price.locationId,
            isActive: true
          }
        });
      }
    },
    status: { type: IntType },
    errorMessage: { type: StringType },
    createdAt: { type: StringType },
    updatedAt: { type: StringType }
  },
});

export default PricingType;
