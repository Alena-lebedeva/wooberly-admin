import {
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql'
import { Vehicles } from '../../models';
import VehicleType from '../../types/siteadmin/VehicleType';

const uploadRcbookImage = {

    type: VehicleType,

    args: {
        id: { type: IntType },
        vehicleRC: { type: StringType }
    },

    async resolve({ request }, { id, vehicleRC }) {

        if (request.user && request.user.admin) {
            let vehicle = await Vehicles.update({
                vehicleRC
            }, {
                where: {
                    id
                }
            })
        
            if (vehicle) {
                return {
                    status: 200
                }
            } else {
                return {
                    status: 400
                }
            }
        } else {
            return {
                status: 403
            }
        }
    }
}

export default uploadRcbookImage;