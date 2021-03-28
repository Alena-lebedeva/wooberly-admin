import {
    GraphQLObjectType as ObjectType,
    GraphQLList as List,
    GraphQLInt as IntType
} from 'graphql'

import LocationType from './LocationType';

const LocationListType = new ObjectType({
    name: 'LocationListType',
    fields: {
        LocationData: {
            type: new List(LocationType)
        },
        count: {
            type: IntType
        }
    }
});

export default LocationListType;