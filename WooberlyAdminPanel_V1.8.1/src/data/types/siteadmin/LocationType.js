import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLBoolean as BooleanType
} from 'graphql';


const LocationType = new ObjectType({
  name: 'Location',
  fields: {
    id: { type: IntType },
    locationName: { type: StringType},
    coordinates: { type: StringType },
    description: { type: StringType },
    status: { type: IntType },
    isActive: { type: BooleanType },
    errorMessage: { type: StringType }
  },
});

export default LocationType;
