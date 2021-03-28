import { Vehicles, Category } from '../../models';
import VehicleType from '../../types/siteadmin/VehicleType';

import {
    GraphQLInt as IntType
} from 'graphql'

const getVehicle = {
    type: VehicleType,

    args: {
        id: { type: IntType }
    },

    async resolve({ request }, { id }) {
        if (request.user && request.user.admin) {
            return await Vehicles.findOne({
                where: {
                    id
                },
                include: [
                    {
                        model: Category,
                        as: 'category',
                        required: true
                    }
                ]
            })
        } else {
            return {
                errorMessage: 'Please Login'
            }
        }
    }
}

export default getVehicle;

// GraphQL

// query getVehicle($id: Int!){
//     getVehicle( id: $id){
//       id
//       vehicleName
//       vehicleType
//       vehicleStatus
//       vehicleNumber
//     }
//   }