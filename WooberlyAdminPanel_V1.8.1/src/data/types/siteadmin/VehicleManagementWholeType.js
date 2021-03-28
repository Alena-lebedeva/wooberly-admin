import {
    GraphQLObjectType as ObjectType,
    GraphQLList as List,
    GraphQLInt as IntType
} from 'graphql'

import VehicleType from './VehicleType';

const VehicleManagementWholeType = new ObjectType({
    name: 'VehicleManagementWholeType',
    fields: {
        vehicleData: {
            type: new List(VehicleType)
        },
        count: {
            type: IntType
        }
    }
});

export default VehicleManagementWholeType;