import { Vehicles, Category, Booking } from '../../models';
import VehicleType from '../../types/siteadmin/VehicleType';

import {
    GraphQLInt as IntType,
    GraphQLString as StringType,

} from 'graphql';

const updateVehicle = {
    type: VehicleType,

    args: {
        id: { type: IntType },
        vehicleName: { type: StringType },
        vehicleType: { type: IntType },
        vehicleNumber: { type: StringType },
        vehicleStatus: { type: StringType }
    },

    async resolve({ request }, { id, vehicleName, vehicleType, vehicleNumber, vehicleStatus }) {
        if (request.user && request.user.admin) {
            let userId = await Vehicles.findOne({
                attributes: ['userId'],
                where: {
                    id,
                },
                raw: true
            });

            const tripStatus = await Booking.findOne({
                attributes: ['tripStatus'],
                where: {
                    driverId: userId.userId
                },
                raw: true
            });

           if (tripStatus && tripStatus.tripStatus === "approved" || tripStatus && tripStatus.tripStatus == "created" || tripStatus && tripStatus.tripStatus == "started") {
                return {
                    status: 400
                }
            }
            const updateVehicle = await Vehicles.update({
                id,
                vehicleName,
                vehicleType,
                vehicleNumber,
                vehicleStatus
            }, {
                where: {
                    id
                }
            }
            )
            if (updateVehicle) {
                return {
                    status: 200
                }
            } else {
                return {
                    errorMessage: 'Something went wrong'
                }
            }

            } else {
                return {
                    errorMessage: 'Please Login'
                }
            }
        }
    }

export default updateVehicle;

// GraphQL 

// mutation updateVehicle($id: Int, $vehicleName: String, $vehicleNumber: String, $vehicleStatus: String) {
//     updateVehicle(
//       id: $id
//       vehicleName: $vehicleName,
//       vehicleNumber: $vehicleNumber,
//       vehicleStatus: $vehicleStatus
//     ){
//       status
//     }
//   }

// {
//     "id": 2,
//     "vehicleName": "Swift",
//     "vehicleNumber": "tn64k0007",
//     "vehicleStatus": "active"
// }
