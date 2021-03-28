import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

import CategoryType from './CategoryType';
import UserType from './UserType';
import { Category, User, UserProfile } from '../../models';

const VehicleType = new ObjectType({
    name: 'VehicleType',
    fields: {
        id: { type: IntType },
        vehicleName: { type: StringType },
        vehicleName: { type: StringType },
        vehicleNumber: { type: StringType },
        vehicleType: { type: StringType },
        availableSeats: { type: IntType },
        vehicleStatus: { type: StringType },
        vehicleRC: { type: StringType },
        vehicleInsurance: { type: StringType },
        status: { type: IntType },
        errorMessage: { type: StringType },
        vehicleRCName: {
            type: StringType,
            async resolve(vehicle) {
                let name = vehicle.vehicleRC ? 'images/vehicle/' + vehicle.vehicleRC : '';
                return name;
            }
        },
        vehicleInsuranceName: {
            type: StringType,
            async resolve(vehicle) {
                let name = vehicle.vehicleInsurance ? 'images/vehicle/' + vehicle.vehicleInsurance : '';
                return name;
            }
        },
        user: {
            type: UserType,
            async resolve(vehicle) {
                return await User.findOne({
                    where: { id: vehicle.userId },
                    include: [
                        {
                            model: UserProfile,
                            as: 'profile',
                            required: true
                        }
                    ]
                });
            },
        },
        category: {
            type: CategoryType,
            async resolve(vehicle) {
                return await Category.findOne({
                    where: {
                        id: vehicle.vehicleType
                    }
                })
            }
        },
        createdAt: { type: StringType },
    },
});

export default VehicleType;